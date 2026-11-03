'use client';

import React, { Suspense, lazy } from 'react';

// Lazy load komponen anak di InfoPage agar bundle awal tetap ringan
const About = lazy(() => import('../about'));
const HistoryCompany = lazy(() => import('../historyCompany'));
const Contact = lazy(() => import('../contact'));
const Testimony = lazy(() => import('../testimony'));

export default function InfoPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      <Suspense
        fallback={
          <div className="py-20 text-center text-gray-500 text-sm">
            Memuat informasi toko...
          </div>
        }
      >
        {/* 1. About */}
        <About />

        {/* 2. History Company */}
        <HistoryCompany />

        {/* 3. Contact */}
        <Contact />

        {/* 4. Testimony */}
        <Testimony />
      </Suspense>
    </div>
  );
}
