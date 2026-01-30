'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ContactFormDialog } from '@/components/contact-form-dialog'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-gray-900">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
              style={{ color: '#2D4A3E' }}
            >
              Frontier Atomics
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                { href: '#about', label: 'About' },
                { href: '#partnership', label: 'Partnership' },
                { href: '#technology', label: 'Technology' },
                { href: '#impact', label: 'Impact' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-opacity hover:opacity-60"
                  style={{ color: '#86888B' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 transition-opacity hover:opacity-60"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3 animate-in fade-in duration-200">
              {[
                { href: '#about', label: 'About' },
                { href: '#partnership', label: 'Partnership' },
                { href: '#technology', label: 'Technology' },
                { href: '#impact', label: 'Impact' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-sm font-medium transition-opacity hover:opacity-60"
                  style={{ color: '#86888B' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/hero-reactor.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(45, 74, 62, 0.65) 0%, rgba(45, 74, 62, 0.35) 50%, transparent 100%)'
          }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-20 text-left">
          <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-tight text-white mb-6">
            Powering Africa's<br />Industrial Future
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-2xl leading-relaxed">
            Small Modular Reactors for reliable, affordable, and scalable nuclear energy
          </p>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 hover:opacity-80 active:scale-95"
            style={{
              backgroundColor: '#D4F78E',
              color: '#1A1A1A',
            }}
          >
            Explore Our Mission
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/energy-infra.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(45, 74, 62, 0.7) 0%, rgba(45, 74, 62, 0.4) 50%, transparent 100%)'
          }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-20">
          <h2 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-8">
            About Frontier Atomics
          </h2>
          <div className="space-y-6">
            <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl">
              We advance Small Modular Reactor projects to deliver reliable, affordable, and scalable power for Africa's next phase of industrial growth.
            </p>
            <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl">
              By bridging governments and global reactor vendors, we own end-to-end project coordination and localize nuclear technology to each nation's priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section id="partnership" className="relative w-full h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/partnership-story.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(45, 74, 62, 0.7) 0%, rgba(45, 74, 62, 0.4) 50%, transparent 100%)'
          }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-20">
          <h2 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-8">
            Strategic Partnership
          </h2>
          <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl">
            We partner directly with governments to secure long-term energy alignment and siting commitments. Working with national authorities and international regulators, we ensure nuclear projects integrate seamlessly into strategic energy roadmaps.
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative w-full h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/technology-story.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(45, 74, 62, 0.7) 0%, rgba(45, 74, 62, 0.4) 50%, transparent 100%)'
          }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-20">
          <h2 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-8">
            Advanced Solutions
          </h2>
          <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl">
            We assess and contract best-in-class SMR vendors, ensuring technical excellence and economic viability. Our expertise spans vendor selection, regulatory navigation, and structuring bankable financing solutions that unlock capital.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="relative w-full h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/impact-story.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(45, 74, 62, 0.7) 0%, rgba(45, 74, 62, 0.4) 50%, transparent 100%)'
          }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-20">
          <h2 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-8">
            Transforming Africa
          </h2>
          <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl">
            By aligning policy, technology, and capital, we enable nations to deploy nuclear energy with confidence and impact. Our comprehensive project oversight ensures reliable power for industrial growth and sustainable development.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 md:py-48" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h2 className="text-6xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
              Let's Connect
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to bring reliable nuclear power to your nation? We'd love to explore partnership opportunities.
            </p>
            
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:opacity-80 active:scale-95"
              style={{
                backgroundColor: '#2D4A3E',
                color: '#FFFFFF',
              }}
            >
              Get In Touch
            </button>
            <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-sm font-light text-gray-500">
            © 2025 Frontier Atomics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
