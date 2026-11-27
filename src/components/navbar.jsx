
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SakouFood from '../assets/sakou-logo.png';

const navItems = [
  { label: 'HOME', path: '/Home' },
  { label: 'OUR PRODUCTS', path: '/Products' },
  { label: 'WHO WE ARE', path: '/WhoWeAre' },
  { label: 'GROWTH STATISTICS', path: '/GrowthStatistics' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-50 bg-[#0d2137]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[80px] max-w-[1200px] items-center justify-between px-6 md:grid md:grid-cols-[1fr_96px_1fr] md:gap-12 md:px-10"
      >
        {/* Left navigation */}
        <div className="hidden items-center justify-end gap-10 md:flex">
          {navItems.slice(0, 2).map((item) => (
            <NavButton key={item.path} {...item} />
          ))}
        </div>

        {/* Logo */}
        <NavLink
          to="/Home"
          onClick={closeMenu}
          aria-label="Go to home"
          className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfa5]"
        >
          <img
            src={SakouFood}
            alt="SakouFood"
            width="70"
            height="70"
            className="block h-[65px] w-16"
          />
        </NavLink>

        {/* Right navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.slice(2).map((item) => (
            <NavButton key={item.path} {...item} />
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfa5] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-opacity ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#0d2137] transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              {...item}
              mobile
              onNavigate={closeMenu}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function NavButton({ label, path, mobile = false, onNavigate }) {
  return (
    <NavLink
      to={path}
      onClick={onNavigate}
      className={({ isActive }) =>
        `whitespace-nowrap font-['Cairo:Bold'] text-base font-bold leading-normal transition-colors hover:text-[#00bfa5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfa5] ${
          mobile ? 'w-full py-3 text-left' : ''
        } ${isActive ? 'text-[#00bfa5]' : 'text-white'}`
      }
    >
      {label}
    </NavLink>
  );
}
