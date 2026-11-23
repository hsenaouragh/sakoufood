import React from 'react'
import Logo from '../assets/sakou-logo.png'

const explore = [
  { label: 'Home', href: '#home' },
  { label: 'Our Products', href: '#products' },
  { label: 'Who We Are', href: '#about' },
  { label: 'Growth Statistics', href: '#growth' },
]

const resources = [
  { label: 'Product catalogue', href: '#' },
  { label: 'Quality & certifications', href: '#' },
  { label: 'Responsibility', href: '#' },
]

const languages = [
  { label: 'Français', code: 'fr' },
  { label: 'English', code: 'en' },
  { label: 'العربية', code: 'ar' },
]

const linkClass = 'text-sm text-white/80 transition hover:text-[#1FC7B5]'
const headingClass = 'mb-4 text-sm font-semibold text-[#1FC7B5]'

const Footer = () => {
  return (
    <footer className='bg-[#0d2137] px-5 pt-14 sm:px-10 lg:px-20 font-cairo-bold'>
      <div className='mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Brand */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <img
              src={Logo}
              alt='Sakou Food logo'
              className='h-20 w-20 rounded-full object-cover'
            />
            <span className='font-cairo-bold text-[22px] font-bold text-white'>SAKOU-FOOD</span>
          </div>
          <p className='max-w-[220px] text-md leading-relaxed text-white/80'>
            Tuna products for professional buyers.
          </p>
        </div>

        {/* Explore */}
        <nav aria-label='Explore'>
          <h4 className={headingClass}>Explore</h4>
          <ul className='flex flex-col gap-2.5'>
            {explore.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label='Resources'>
          <h4 className={headingClass}>Resources</h4>
          <ul className='flex flex-col gap-2.5'>
            {resources.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h4 className={headingClass}>Contact Us</h4>
          <a href='mailto:info@sakoufood.com' className={linkClass}>
            info@sakoufood.com
          </a>
          <div className='mt-4 flex flex-wrap items-center gap-x-2 text-xs text-white/70'>
            {languages.map((l, i) => (
              <React.Fragment key={l.code}>
                {i > 0 && <span aria-hidden='true'>·</span>}
                <button
                  type='button'
                  lang={l.code}
                  className='transition hover:text-[#1FC7B5]'
                  // onClick={() => changeLanguage(l.code)}  // plug in your i18n here
                >
                  {l.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mx-auto mt-12 max-w-6xl border-t border-white/10 py-6'>
        <p className='text-xs text-white/60'>
          © {new Date().getFullYear()} Sakou Food. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer