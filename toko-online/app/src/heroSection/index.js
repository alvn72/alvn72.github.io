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
    <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden border-b border-[#2a2a2a] bg-[#0a0a0a]">

      {/* Layer Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        {/* Background gradient fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]" />

        {/* Video Background (Di-scale down ~80% agar tampak lebih jauh/tidak terlalu zoom) */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain sm:object-cover scale-90 sm:scale-80 transform transition-transform duration-500 opacity-80"
        />

        {/* Overlay gelap agar teks di atas video tetap terbaca jelas */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* Layer Konten Teks */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Selamat Datang di Toko Kami
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Produk kebutuhan harian dengan kualitas terbaik, harga bersahabat, dan pelayanan cepat.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onShopNowClick}
            className="
              w-full sm:w-auto px-6 py-3
              bg-white text-black font-semibold text-sm
              rounded hover:bg-gray-200 transition cursor-pointer
            "
          >
            Lihat Produk
          </button>
          <button
            onClick={onInfoClick}
            className="
              w-full sm:w-auto px-6 py-3
              border border-[#444] text-gray-300 font-medium text-sm
              rounded hover:bg-[#1a1a1a] hover:text-white transition cursor-pointer
            "
          >
            Tentang Kami
          </button>
        </div>
      </div>
    </section>
  );
}
