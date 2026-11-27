import React, { useEffect, useMemo, useRef, useState } from 'react'

const FAMILIES = ['Tuna', 'Sardines']
const FLAVORS = ['Sunflower oil', 'Tomato', 'Spicy oil', 'Natural', 'Citrus & fine herbs']
const FLAVOR_ITEMS = ['All', ...FLAVORS]

// Add a new card by adding an object here. Leave fields as 'To confirm' until final.
const PRODUCTS = [
  {
    id: 1,
    name: '[Product name]',
    family: 'Tuna',
    flavor: 'Sunflower oil',
    packSize: 'To confirm',
    image: '/products/product-1.jpg',
  },
  {
    id: 2,
    name: '[Product name]',
    family: 'Sardines',
    flavor: 'Tomato',
    packSize: 'To confirm',
    image: '/products/product-2.jpg',
  },
  {
    id: 3,
    name: '[Product name]',
    family: 'Tuna',
    flavor: 'Spicy oil',
    packSize: 'To confirm',
    image: '/products/product-3.jpg',
  },
  // { id: 4, name: '...', family: 'Sardines', flavor: 'Natural', packSize: '...', image: '...' },
]

const fieldClass =
  'w-full rounded-lg border border-[#0D3241]/15 bg-white px-4 py-2.5 text-sm text-[#0D3241] placeholder:text-[#0D3241]/50 outline-none transition focus:border-[#1FC7B5] focus:ring-1 focus:ring-[#1FC7B5]'

const ProductCatalogue = ({ products = PRODUCTS, onSelectProduct }) => {
  const [family, setFamily] = useState('All')
  const [flavor, setFlavor] = useState('All')
  const [query, setQuery] = useState('')

  // Flavor dropdown state
  const [menuOpen, setMenuOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const menuRef = useRef(null)
  const listRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (family === 'All' || p.family === family) &&
        (flavor === 'All' || p.flavor === flavor) &&
        (!q || p.name.toLowerCase().includes(q) || String(p.id).includes(q))
    )
  }, [products, family, flavor, query])

  const resetFilters = () => {
    setFamily('All')
    setFlavor('All')
    setQuery('')
  }

  // --- Flavor dropdown behaviour ---
  const openMenu = () => {
    setHighlight(Math.max(FLAVOR_ITEMS.indexOf(flavor), 0))
    setMenuOpen(true)
  }

  const chooseFlavor = (item) => {
    setFlavor(item)
    setMenuOpen(false)
  }

  const onMenuKeyDown = (e) => {
    const last = FLAVOR_ITEMS.length - 1
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!menuOpen) openMenu()
        else setHighlight((h) => Math.min(h + 1, last))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!menuOpen) openMenu()
        else setHighlight((h) => Math.max(h - 1, 0))
        break
      case 'Home':
        if (menuOpen) {
          e.preventDefault()
          setHighlight(0)
        }
        break
      case 'End':
        if (menuOpen) {
          e.preventDefault()
          setHighlight(last)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (menuOpen) chooseFlavor(FLAVOR_ITEMS[highlight])
        else openMenu()
        break
      case 'Escape':
        setMenuOpen(false)
        break
      default:
    }
  }

  // Close the menu when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Keep the highlighted option in view while navigating with the keyboard
  useEffect(() => {
    if (menuOpen) listRef.current?.children[highlight]?.scrollIntoView({ block: 'nearest' })
  }, [highlight, menuOpen])

  return (
    <section id='products' className='bg-white px-5 py-14 sm:px-10 lg:px-20'>
      <div className='mx-auto max-w-6xl'>
        {/* Heading */}
        <h2 className='font-cairo-bold text-3xl font-bold text-[#0D3241]'>Find the right product</h2>
        <p className='mt-2 text-sm text-[#0D3241]/70'>
          Start with a family, then narrow your requirements.
        </p>

        {/* Family pills */}
        <div className='mt-6 flex flex-wrap gap-3' role='tablist' aria-label='Product family'>
          {['All', ...FAMILIES].map((f) => {
            const active = family === f
            return (
              <button
                key={f}
                type='button'
                role='tab'
                aria-selected={active}
                onClick={() => setFamily(f)}
                className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-[#0D3241] bg-[#0D3241] text-white'
                    : 'border-[#0D3241]/15 bg-white text-[#0D3241] hover:border-[#1FC7B5]'
                }`}
              >
                {f === 'All' ? 'All products' : f}
              </button>
            )
          })}
        </div>

        {/* Search + flavor dropdown */}
        <div className='mt-5 grid gap-3 sm:grid-cols-[1fr_240px]'>
          <input
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by product name or reference'
            aria-label='Search products'
            className={fieldClass}
          />

          <div ref={menuRef} className='relative'>
            <button
              type='button'
              aria-haspopup='listbox'
              aria-expanded={menuOpen}
              aria-label='Filter by flavor'
              onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
              onKeyDown={onMenuKeyDown}
              className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-left text-sm text-[#0D3241] outline-none transition ${
                menuOpen
                  ? 'border-[#1FC7B5] ring-1 ring-[#1FC7B5]'
                  : 'border-[#0D3241]/15 hover:border-[#1FC7B5]'
              }`}
            >
              <span className='truncate'>
                <span className='text-[#0D3241]/60'>Flavor: </span>
                <span className={flavor === 'All' ? '' : 'font-semibold'}>{flavor}</span>
              </span>
              <svg
                viewBox='0 0 20 20'
                className={`h-4 w-4 shrink-0 text-[#0D3241]/60 transition-transform duration-200 ${
                  menuOpen ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <path d='M5 8l5 5 5-5' />
              </svg>
            </button>

            {menuOpen && (
              <ul
                ref={listRef}
                role='listbox'
                aria-label='Flavor'
                className='absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-auto rounded-xl border border-[#0D3241]/10 bg-white p-1.5 shadow-xl'
              >
                {FLAVOR_ITEMS.map((item, i) => {
                  const selected = item === flavor
                  return (
                    <li
                      key={item}
                      role='option'
                      aria-selected={selected}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => chooseFlavor(item)}
                      className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        i === highlight ? 'bg-[#1FC7B5]/15' : ''
                      } ${selected ? 'font-semibold text-[#0D3241]' : 'text-[#0D3241]/80'}`}
                    >
                      <span>{item === 'All' ? 'All flavors' : item}</span>
                      {selected && (
                        <svg
                          viewBox='0 0 20 20'
                          className='h-4 w-4 shrink-0 text-[#0E6B67]'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          aria-hidden='true'
                        >
                          <path d='M4 10.5l4 4 8-9' />
                        </svg>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        <p className='mt-4 text-xs font-semibold text-[#0D3241]'>
          Product count: {filtered.length}
        </p>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className='mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {filtered.map((p) => (
              <article
                key={p.id}
                className='flex flex-col overflow-hidden rounded-xl border border-[#0D3241]/10 bg-white shadow-sm transition hover:shadow-md'
              >
                {/* Image (gradient fallback if no image) */}
                <div className='aspect-[16/9] w-full bg-gradient-to-br from-[#0D3241] to-[#1FC7B5]'>
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading='lazy'
                      className='h-full w-full object-cover'
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>

                <div className='flex flex-1 flex-col gap-3 p-4'>
                  <p className='text-[10px] text-[#0D3241]/60'>
                    Range illustration • not product photography
                  </p>
                  <p className='text-[10px] font-bold uppercase tracking-wide text-teal-700'>
                    {p.family}
                  </p>
                  <h3 className='font-cairo-bold text-xl font-bold text-[#0D3241]'>{p.name}</h3>

                  <dl className='divide-y divide-[#0D3241]/10 text-sm'>
                    {[
                      ['Family', p.family],
                      ['Flavor', p.flavor],
                      ['Pack size', p.packSize],
                    ].map(([label, value]) => (
                      <div key={label} className='flex justify-between py-2'>
                        <dt className='text-[#0D3241]/70'>{label}</dt>
                        <dd className='font-bold text-[#0D3241]'>{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <button
                    type='button'
                    onClick={() => onSelectProduct?.(p)}
                    className='mt-auto rounded-lg border border-[#0E6B67] py-2.5 text-sm font-semibold text-[#0E6B67] transition hover:bg-[#0E6B67] hover:text-white'
                  >
                    View specifications
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className='mt-6 rounded-xl border border-dashed border-[#0D3241]/20 p-10 text-center'>
            <p className='text-sm text-[#0D3241]/70'>No products match these filters.</p>
            <button
              type='button'
              onClick={resetFilters}
              className='mt-3 text-sm font-semibold text-teal-700 hover:underline'
            >
              Reset filters
            </button>
          </div>
        )}

        <p className='mt-6 text-xs text-[#0D3241]/60'>
          Catalogue preview • final product range to confirm
        </p>
      </div>

      
    </section>
  )
}

export default ProductCatalogue