'use client';

import React from 'react';
import About from '../about';
import HistoryCompany from '../historyCompany';
import Contact from '../contact';
import Testimony from '../testimony';

export default function InfoPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* 1. About */}
      <About />

      {/* 2. History Company */}
      <HistoryCompany />

      {/* 3. Contact */}
      <Contact />

      {/* 4. Testimony */}
      <Testimony />
    </div>
  );
}
