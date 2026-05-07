'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Instagram } from 'lucide-react'
import { teamMembers } from '@/lib/data/team'

export function TeamGrid() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary-200"
          onMouseEnter={() => setHovered(member.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Foto */}
          <div className="relative h-64 overflow-hidden bg-neutral-100">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay com Instagram */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-graphite/50 transition-opacity duration-300"
              style={{ opacity: hovered === member.id ? 1 : 0 }}
            >
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-600 shadow-md transition-transform duration-200 hover:scale-110 hover:bg-primary-500 hover:text-white"
                aria-label={`Instagram de ${member.name}`}
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="px-5 py-4">
            <h3 className="font-display text-lg font-semibold text-graphite">
              {member.name}
            </h3>
            <p className="mt-0.5 text-sm text-primary-600 font-medium">
              {member.role}
            </p>
          </div>

          {/* Barra decorativa */}
          <div className="h-1 w-0 bg-primary-500 transition-all duration-500 group-hover:w-full" />
        </div>
      ))}
    </div>
  )
}
