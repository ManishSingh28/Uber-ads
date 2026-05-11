// components/BrandLogin.tsx
"use client";
import React from 'react';
import { Globe, MapPin } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon, InstagramIcon, XIcon } from '@/components/SocialIcons'; 

export default function BrandLogin({ setActivePage }: any) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans animate-in fade-in duration-500">
      
      {/* HEADER */}
      <header className="px-8 py-5 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-8">
            <div className="text-2xl font-black tracking-tight">Uber</div>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 hidden md:block">Visit Help Center</a>
        </div>
      </header>

      {/* MAIN LOGIN SECTION */}
      <main className="flex-1 flex items-center justify-center pb-12 pt-4">
        {/* Updated Grid: Changed to 2:1 ratio (2fr for image, 1fr for form) */}
        <div className="max-w-[1400px] w-full mx-auto px-8 grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Illustration (Updated to 2:1 Aspect Ratio) */}
          <div className="relative w-full aspect-[2/1] bg-[#f6f6f6] rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
                {/* Changed to object-contain to ensure the complete image is visible */}
                <img 
                    src="/login-art.png" 
                    alt="Uber Cityscape" 
                    className="absolute inset-0 w-full h-full object-contain bg-[#f6f6f6]" 
                />
          </div>

          {/* RIGHT: Login Form */}
          <div className="w-full max-w-[420px] mx-auto lg:mx-0 bg-white lg:py-6">
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-black mb-3">
              Log in to see your account details
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              View past campaigns, tailored suggestions, support resources, and more.
            </p>
            
            {/* Form Inputs */}
            <div className="space-y-4 mb-2">
                <input 
                    type="text" 
                    placeholder="Username or Email" 
                    className="w-full p-3.5 bg-[#f6f6f6] border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:outline-none transition-colors font-medium text-sm"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full p-3.5 bg-[#f6f6f6] border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:outline-none transition-colors font-medium text-sm"
                />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-8">
                <button type="button" className="text-[13px] font-bold text-gray-600 hover:text-black transition-colors">
                    Forgot password?
                </button>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-6">
              <button 
                type="button"
                onClick={() => setActivePage('brand-portal')}
                className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md"
              >
                Log in to your account
              </button>
              <button type="button" className="text-black text-sm font-medium hover:text-gray-600 transition-colors underline decoration-gray-300 underline-offset-4">
                Create an account
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* UBER FOOTER */}
      <footer className="bg-black text-white pt-12 pb-8 px-8">
        <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight mb-2">Uber</h2>
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Visit Help Center</a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-sm">
                <div>
                    <h3 className="font-medium mb-4 text-[15px]">Company</h3>
                    <ul className="space-y-3 text-gray-400 text-xs font-medium">
                        <li><a href="#" className="hover:text-white">About us</a></li>
                        <li><a href="#" className="hover:text-white">Our offerings</a></li>
                        <li><a href="#" className="hover:text-white">Newsroom</a></li>
                        <li><a href="#" className="hover:text-white">Investors</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium mb-4 text-[15px]">Products</h3>
                    <ul className="space-y-3 text-gray-400 text-xs font-medium">
                        <li><a href="#" className="hover:text-white">Ride</a></li>
                        <li><a href="#" className="hover:text-white">Drive</a></li>
                        <li><a href="#" className="hover:text-white">Eat</a></li>
                        <li><a href="#" className="hover:text-white">Uber for Business</a></li>
                        <li><a href="#" className="hover:text-white">Uber Advertising</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium mb-4 text-[15px]">Global citizenship</h3>
                    <ul className="space-y-3 text-gray-400 text-xs font-medium">
                        <li><a href="#" className="hover:text-white">Safety</a></li>
                        <li><a href="#" className="hover:text-white">Sustainability</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium mb-4 text-[15px]">Travel</h3>
                    <ul className="space-y-3 text-gray-400 text-xs font-medium">
                        <li><a href="#" className="hover:text-white">Reserve</a></li>
                        <li><a href="#" className="hover:text-white">Airports</a></li>
                        <li><a href="#" className="hover:text-white">Cities</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom Row */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-800">
                <div className="flex items-center gap-6 mb-4 md:mb-0 text-gray-400">
                    <a href="#" className="hover:text-white transition-colors"><LinkedinIcon /></a>
                    <a href="#" className="hover:text-white transition-colors"><YoutubeIcon /></a>
                    <a href="#" className="hover:text-white transition-colors"><InstagramIcon /></a>
                    <a href="#" className="hover:text-white transition-colors"><XIcon /></a>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
                    <button className="flex items-center gap-2 hover:text-white transition-colors text-xs font-bold">
                        <Globe size={14} /> English
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors text-xs font-bold">
                        <MapPin size={14} /> Bangalore
                    </button>
                    <div className="flex items-center gap-3 ml-2">
                        <div className="border border-gray-700 rounded flex items-center px-2 py-1 hover:border-gray-500 cursor-pointer transition-colors bg-black">
                           <div className="text-left ml-1">
                               <div className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">GET IT ON</div>
                               <div className="text-xs font-medium leading-tight text-white">Google Play</div>
                           </div>
                        </div>
                        <div className="border border-gray-700 rounded flex items-center px-2 py-1 hover:border-gray-500 cursor-pointer transition-colors bg-black">
                           <div className="text-left ml-1">
                               <div className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">Download on the</div>
                               <div className="text-xs font-medium leading-tight text-white">App Store</div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </footer>
    </div>
  );
}