import { useEffect, useRef } from 'react';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect } from 'postprocessing';
import * as THREE from 'three';
import './GridScan.css';

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
    float minT = 1e20;
    float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);
    float hitIsY = 1.0;

    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

        bool use = t > 0.0 && t < minT;
        gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
        minT = use ? t : minT;
        hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

    float fx = fract(gridUV.x);
    float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx);
    float ay = min(fy, 1.0 - fy);
    float wx = fwidth(gridUV.x);
    float wy = fwidth(gridUV.y);
    float halfPx = max(0.0, uLineThickness) * 0.5;

    float tx = halfPx * wx;
    float ty = halfPx * wy;
    float aax = wx;
    float aay = wy;

    float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
    float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
    float lineMask = max(lineX, lineY);

    float fade = exp(-dist * fadeStrength);

    float dur = max(0.05, uScanDuration);
    float del = max(0.0, uScanDelay);
    float scanZMax = 2.0;
    float widthScale = max(0.1, uScanGlow);
    float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);

    float cycle = dur + del;
    float tCycle = mod(iTime, cycle);
    float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
    float phase = scanPhase;
    
    // Pingpong
    float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
    phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
    
    float scanZ = phase * scanZMax;
    float dz = abs(hit.z - scanZ);
    float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
    
    float combinedPulse = lineBand * clamp(uScanOpacity, 0.0, 1.0);

    float lineVis = lineMask;
    vec3 gridCol = uLinesColor * lineVis * fade;
    vec3 scanCol = uScanColor * combinedPulse;

    color = gridCol + scanCol;

    float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
    color += (n - 0.5) * uNoise;
    color = clamp(color, 0.0, 1.0);
    
    float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
    fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export const GridScan = ({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = '#392e4e',
    scanColor = '#FF9FFC',
    scanOpacity = 0.4,
    gridScale = 0.1,
    enablePost = true,
    bloomIntensity = 0.6,
    chromaticAberration = 0.002,
    noiseIntensity = 0.01,
    scanGlow = 0.5,
    scanSoftness = 2,
    scanDuration = 2.0,
    scanDelay = 2.0,
    className,
    style
}) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const materialRef = useRef(null);
    const composerRef = useRef(null);
    const rafRef = useRef(null);

    const lookTarget = useRef(new THREE.Vector2(0, 0));
    const lookCurrent = useRef(new THREE.Vector2(0, 0));
    const lookVel = useRef(new THREE.Vector2(0, 0));

    const s = THREE.MathUtils.clamp(sensitivity, 0, 1);
    const skewScale = THREE.MathUtils.lerp(0.06, 0.2, s);
    const smoothTime = THREE.MathUtils.lerp(0.45, 0.12, s);
    const maxSpeed = Infinity;

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMove = e => {
            const rect = el.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            lookTarget.current.set(nx, ny);
        };

        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const uniforms = {
            iResolution: {
                value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio())
            },
            iTime: { value: 0 },
            uSkew: { value: new THREE.Vector2(0, 0) },
            uTilt: { value: 0 },
            uYaw: { value: 0 },
            uLineThickness: { value: lineThickness },
            uLinesColor: { value: srgbColor(linesColor) },
            uScanColor: { value: srgbColor(scanColor) },
            uGridScale: { value: gridScale },
            uScanOpacity: { value: scanOpacity },
            uNoise: { value: noiseIntensity },
            uBloomOpacity: { value: bloomIntensity },
            uScanGlow: { value: scanGlow },
            uScanSoftness: { value: scanSoftness },
            uScanDuration: { value: scanDuration },
            uScanDelay: { value: scanDelay }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            depthWrite: false,
            depthTest: false
        });
        materialRef.current = material;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        let composer = null;
        if (enablePost) {
            composer = new EffectComposer(renderer);
            composerRef.current = composer;
            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);

            const bloom = new BloomEffect({
                intensity: 1.0,
                luminanceThreshold: 0,
                luminanceSmoothing: 0
            });
            bloom.blendMode.opacity.value = Math.max(0, bloomIntensity);

            const chroma = new ChromaticAberrationEffect({
                offset: new THREE.Vector2(chromaticAberration, chromaticAberration),
                radialModulation: true,
                modulationOffset: 0.0
            });

            const effectPass = new EffectPass(camera, bloom, chroma);
            effectPass.renderToScreen = true;
            composer.addPass(effectPass);
        }

        const onResize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
            if (composerRef.current) composerRef.current.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        let last = performance.now();
        const tick = () => {
            const now = performance.now();
            const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
            last = now;

            lookCurrent.current.copy(
                smoothDampVec2(lookCurrent.current, lookTarget.current, lookVel.current, smoothTime, maxSpeed, dt)
            );

            const skew = new THREE.Vector2(lookCurrent.current.x * skewScale, -lookCurrent.current.y * skewScale);
            material.uniforms.uSkew.value.set(skew.x, skew.y);
            material.uniforms.iTime.value = now / 1000;

            renderer.clear(true, true, true);
            if (composerRef.current) {
                composerRef.current.render(dt);
            } else {
                renderer.render(scene, camera);
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            material.dispose();
            quad.geometry.dispose();
            if (composerRef.current) composerRef.current.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, [
        sensitivity,
        lineThickness,
        linesColor,
        scanColor,
        scanOpacity,
        gridScale,
        enablePost,
        noiseIntensity,
        bloomIntensity,
        scanGlow,
        scanSoftness,
        scanDuration,
        scanDelay,
        chromaticAberration,
        smoothTime,
        maxSpeed,
        skewScale
    ]);

    return (
        <div ref={containerRef} className={`gridscan${className ? ` ${className}` : ''}`} style={style}>
            {/* Centered Text Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    textAlign: 'center'
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        fontWeight: '300',
                        letterSpacing: '0.3em',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        margin: 0,
                        textShadow: '0 0 20px rgba(255, 159, 252, 0.8), 0 0 40px rgba(255, 159, 252, 0.4)',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                >
                    Underground Comedy Collective
                </h2>
            </div>
        </div>
    );
};

function srgbColor(hex) {
    const c = new THREE.Color(hex);
    return c.convertSRGBToLinear();
}

function smoothDampVec2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
    const out = current.clone();
    smoothTime = Math.max(0.0001, smoothTime);
    const omega = 2 / smoothTime;
    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change = current.clone().sub(target);
    const maxChange = maxSpeed * smoothTime;
    if (change.length() > maxChange) change.setLength(maxChange);

    target = current.clone().sub(change);
    const temp = currentVelocity.clone().addScaledVector(change, omega).multiplyScalar(deltaTime);
    currentVelocity.sub(temp.clone().multiplyScalar(omega));
    currentVelocity.multiplyScalar(exp);

    out.copy(target.clone().add(change.add(temp).multiplyScalar(exp)));
    return out;
}

export default GridScan;
