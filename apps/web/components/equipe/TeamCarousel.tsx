'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import { ArrowUpRight, MoveUpLeft } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { TeamCard, TeamMember } from './TeamCard'

interface TeamCarouselProps {
  members: TeamMember[]
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className="team-carousel-wrapper relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={members.length > 4}
        speed={500}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="team-swiper pb-12"
      >
        {members.map((member) => (
          <SwiperSlide key={member.id}>
            <TeamCard member={member} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="team-carousel-prev group flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-600 bg-white text-green-600 transition-all hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-label="Anterior"
        >
          <MoveUpLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="team-carousel-next group flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-600 bg-white text-green-600 transition-all hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-label="Próximo"
        >
          <ArrowUpRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
