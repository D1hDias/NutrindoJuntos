'use client'

import Image from 'next/image'

export function SlidingTextSection() {
  return (
    <section className="relative block overflow-hidden bg-primary-500 py-3">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Primeiro conjunto */}
          <div className="flex items-center">
            {[...Array(6)].map((_, i) => (
              <div key={`first-${i}`} className="flex items-center px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">DEPOIMENTOS</h2>
                <span className="mx-8 text-2xl md:text-3xl font-bold text-white">✦</span>
              </div>
            ))}
          </div>

          {/* Segundo conjunto (duplicado para loop infinito perfeito) */}
          <div className="flex items-center">
            {[...Array(6)].map((_, i) => (
              <div key={`second-${i}`} className="flex items-center px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">DEPOIMENTOS</h2>
                <span className="mx-8 text-2xl md:text-3xl font-bold text-white">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
