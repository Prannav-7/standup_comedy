import React from 'react';
import IntroAnimation from './components/IntroAnimation';

export default function TestIntro() {
    const handleComplete = () => {
        console.log('Test intro completed!');
    };

    return (
        <div>
            <h1 style={{ color: 'white', position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
                Test Page - Intro Should Show Below
            </h1>
            <IntroAnimation onComplete={handleComplete} />
        </div>
    );
}
