import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Linkedin, Instagram, Globe } from 'lucide-react'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  expertise?: string[]
  image?: string | null
  social?: {
    email?: string
    linkedin?: string
    instagram?: string
    website?: string
  }
}

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="team-one__single">
      <div className="team-one__img-box">
        <div className="team-one__img relative overflow-hidden rounded-t-2xl">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={500}
              className="h-[500px] w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="flex h-[500px] w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50">
              <div className="text-8xl font-bold text-green-300">{initials}</div>
            </div>
          )}
        </div>

        <div className="team-one__content relative -mt-20 rounded-b-2xl bg-white p-8 shadow-lg">
          {/* Background Shape */}
          <div className="team-one__single-bg-shape absolute inset-0 opacity-5">
            <Image
              src="/images/shapes/team-one-single-bg-shape.webp"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative Shapes */}
          <div className="team-one__content-shape-1 absolute -right-4 -top-4 h-16 w-16">
            <Image
              src="/images/shapes/team-one-content-shape-1.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="team-one__content-shape-2 absolute -left-4 bottom-4 h-12 w-12">
            <Image
              src="/images/shapes/team-one-content-shape-2.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10">
            {/* Name and Role */}
            <div className="mb-4 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-lg font-medium text-green-600">{member.role}</p>
            </div>

            {/* Bio */}
            <p className="mb-4 text-center text-sm text-gray-600">{member.bio}</p>

            {/* Expertise Badges */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 text-center text-xs font-semibold uppercase text-gray-500">
                  Especialidades
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {member.social && (
              <div className="flex justify-center gap-4 border-t border-gray-100 pt-4">
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white"
                    aria-label={`LinkedIn ${member.name}`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white"
                    aria-label={`Instagram ${member.name}`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {member.social.website && (
                  <a
                    href={member.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white"
                    aria-label={`Website ${member.name}`}
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
