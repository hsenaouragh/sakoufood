import { useState } from 'react'
import SakouFood from '../assets/sakou-logo.png'

const navItems = ['HOME', 'OUR PRODUCTS', 'WHO WE ARE', 'GROWTH STATISTICS']

export default function App() {
  const [activeItem, setActiveItem] = useState('HOME')
  const [menuOpen, setMenuOpen] = useState(false)

  const selectItem = (item) => {
    setActiveItem(item)
    setMenuOpen(false)
  }

  return (
    <div>
      <header className="relative z-10 bg-[#0d2137]">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[80px] max-w-[1016px] items-center justify-between px-6 md:grid md:grid-cols-[1fr_96px_1fr] md:gap-[97px] md:px-10"
        >
          <div className="hidden items-center justify-end gap-[97px] md:flex">
            {navItems.slice(0, 2).map((item) => (
              <NavButton
                key={item}
                active={activeItem === item}
                label={item}
                onClick={() => selectItem(item)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Go to home"
            className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfa5]"
            onClick={() => selectItem('HOME')}
          >
            <img
              src={SakouFood}
              alt="SakouFood"
              width="70"
              height="70"
              className="block h-[65px] w-16"
            />
          </button>

          <div className="hidden items-center gap-[97px] md:flex">
            {navItems.slice(2).map((item) => (
              <NavButton
                key={item}
                active={activeItem === item}
                label={item}
                onClick={() => selectItem(item)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfa5] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </nav>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-white/10 bg-[#0d2137] transition-[max-height,opacity] duration-300 md:hidden ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <NavButton
                key={item}
                active={activeItem === item}
                label={item}
                mobile
                onClick={() => selectItem(item)}
              />
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}



function NavButton({ active, label, mobile = false, onClick }) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={`whitespace-nowrap font-['Cairo:Bold'] text-base font-bold leading-normal transition-colors hover:text-[#00bfa5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfa5] ${
        mobile ? 'w-full py-3 text-left' : ''
      } ${active ? 'text-[#00bfa5]' : 'text-white'}`}
    >
      {label}
    </button>
  )
}
