import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
                <h2 className="text-[10vw] leading-none font-black tracking-tighter uppercase">
                    Punchline
                </h2>
                <p className="text-xl font-mono mt-4 max-w-md">
                    We are an unstructured collective of comedians, artists, and troublemakers.
                </p>
            </div>

            <div className="flex flex-col gap-4 font-mono text-lg">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">YouTube</a>
                <a href="#" className="hover:underline">Email Us</a>
            </div>
        </div>
        
        <div className="w-full h-[1px] bg-black mt-12 mb-6" />
        
        <div className="container mx-auto flex justify-between font-mono text-sm text-gray-500">
            <span>© 2025 Punchline Comedy</span>
            <span>Made with Chaos</span>
        </div>
    </footer>
  );
}
