'use client';

import React, { useRef, useEffect } from 'react';

export default function HeroSection({ onShopNowClick, onInfoClick }) {
  const videoRef = useRef(null);

  const videoSrc = '/videoAja/heroSecToko.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay info:', err);
        });
      }
    }
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-5.5rem)] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-[#2a2a2a] bg-[#0a0a0a]">

      {/* Layer Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background gradient fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]" />

        {/* Video Background Full Layar */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gelap agar teks di atas video tetap terbaca jelas */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Layer Konten Teks */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Selamat Datang di Toko Kami
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Produk kebutuhan harian dengan kualitas terbaik, harga bersahabat, dan pelayanan cepat.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onShopNowClick}
            className="
              w-full sm:w-auto px-7 py-3.5
              bg-white text-black font-semibold text-sm
              rounded hover:bg-gray-200 transition cursor-pointer shadow-lg
            "
          >
            Lihat Produk
          </button>
          <button
            onClick={onInfoClick}
            className="
              w-full sm:w-auto px-7 py-3.5
              border border-[#444] text-gray-300 font-medium text-sm
              rounded hover:bg-[#1a1a1a] hover:text-white transition cursor-pointer
            "
          >
            Tentang Kami
          </button>
        </div>
      </div>

      {/* Indikator scroll ke bawah */}
      <button
        onClick={onShopNowClick}
        aria-label="Scroll ke produk"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-400 hover:text-white transition cursor-pointer animate-bounce flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}
