'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Refined intro animation component
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => onComplete(), 2600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ambient light effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: phase >= 1 ? 0.15 : 0,
            scale: phase >= 1 ? 1 : 0.8
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2BA84A]/30 blur-[120px]"
        />
      </div>

      {/* Logo and text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: phase >= 1 ? 1 : 0.9, 
            opacity: phase >= 1 ? 1 : 0 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo78-jfpuDJgxyeQ2YTcXCbJ1AZG7dKQWzo.png"
            alt="MSC Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        
        {/* Text reveal */}
        <div className="text-center overflow-hidden">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ 
              y: phase >= 2 ? 0 : 60, 
              opacity: phase >= 2 ? 1 : 0 
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-1"
          >
            <span className="font-[family-name:var(--font-anton)] text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
              LET THE GAME
            </span>
          </motion.div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ 
              y: phase >= 2 ? 0 : 60, 
              opacity: phase >= 2 ? 1 : 0 
            }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-[family-name:var(--font-anton)] text-3xl sm:text-4xl md:text-5xl text-[#2BA84A] tracking-wide">
              BEGIN
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -60])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95])

  // Slow down video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [videoError])

  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <section 
        ref={containerRef}
        className="relative min-h-[120vh] bg-[#030303]"
      >
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background video */}
          <div className="absolute inset-0">
            {!videoError && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoError(true)}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget
                  video.playbackRate = 0.7
                }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(1.05)' }}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0525%281%29-9Qu71geXiEU5fynbgHJFRlQ1zPCi8p.mp4" type="video/mp4" />
              </video>
            )}
            {/* Fallback background when video fails */}
            {videoError && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0f] via-[#030303] to-[#0a0f1a]" />
            )}
            {/* Gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/70 via-[#030303]/50 to-[#030303]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/40 via-transparent to-[#030303]/40" />
          </div>
          
          {/* Subtle ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2BA84A]/5 rounded-full blur-[100px]" />
          </div>

          {/* Content */}
          <motion.div 
            className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6"
            style={{ opacity, y, scale }}
          >
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 30 : 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-[family-name:var(--font-anton)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-white leading-[0.9]">
                MAQBOOL
              </h1>
              <h2 className="font-[family-name:var(--font-anton)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#2BA84A] leading-[0.9] mt-1 sm:mt-2">
                SPORTS COMPLEX
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 font-light tracking-wide text-center max-w-xl px-4"
            >
              Community-centric premier sports hub offering facilities for football, cricket, and more.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-sm sm:text-base text-white/50 max-w-md text-center"
            >
              Baramulla&apos;s first elite 10,000+ sq. ft. synthetic turf facility
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <Link
                href="/book-now"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#2BA84A] text-white font-semibold rounded-lg hover:bg-[#239B40] transition-all duration-300 text-center shadow-lg shadow-[#2BA84A]/20 hover:shadow-[#2BA84A]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Your Slot
              </Link>
              <Link
                href="/facilities"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play size={16} className="fill-current" />
                Explore Arena
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showIntro ? 0 : 0.6 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1.5 text-white/50"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
              <ChevronDown size={18} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
