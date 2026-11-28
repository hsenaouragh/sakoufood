import React, { useEffect, useRef, useState } from 'react'
import PRODUCTS from '../data/products'

const TBC = 'To be confirmed'

/* --------------------------------------------------
   FIELD DEFINITIONS + TABS
-------------------------------------------------- */
const SPEC_FIELDS = [
  ['Product name', 'name'],
  ['Product reference / SKU', 'reference'],
  ['Species / scientific name', 'species'],
  ['Product category', 'category'],
  ['Product form', 'form'],
  ['Ingredients', 'ingredients'],
  ['Net weight', 'netWeight'],
  ['Drained weight', 'drainedWeight'],
  ['Storage temperature', 'storage'],
  ['Shelf life', 'shelfLife'],
  ['Allergens', 'allergens'],
  ['Country of origin', 'origin'],
]

const PACKAGING_FIELDS = [
  ['Packaging type', 'type'],
  ['Unit / can size', 'canSize'],
  ['Available formats', 'formats'],
  ['Packaging material', 'material'],
  ['Carton configuration', 'carton'],
  ['Units per carton', 'unitsPerCarton'],
  ['Minimum order quantity', 'moq'],
]

const TABS = [
  { id: 'specs', label: 'Specifications', fields: SPEC_FIELDS, dataKey: 'specs' },
  { id: 'packaging', label: 'Packaging & formats', fields: PACKAGING_FIELDS, dataKey: 'packaging' },
]

/* --------------------------------------------------
   SMALL COMPONENTS
-------------------------------------------------- */
const SpecRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 border-b border-[#0D223F]/10 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <dt className="font-cairo-bold text-[12px] font-semibold text-[#0E6B67]">{label}</dt>
    <dd className="text-[12px] font-medium leading-relaxed text-[#445869] sm:max-w-[55%] sm:text-right">
      {value || TBC}
    </dd>
  </div>
)

const SpecList = ({ fields, data }) => (
  <dl className="rounded-2xl border border-[#0D223F]/5 bg-white px-5 py-2 shadow-sm sm:px-6">
    {fields.map(([label, key]) => (
      <SpecRow key={key} label={label} value={data?.[key]} />
    ))}
  </dl>
)

const Can = ({ label, className = '' }) => (
  <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
    <ellipse cx="50" cy="111" rx="40" ry="7" fill="#0D223F" opacity="0.15" />
    <rect x="10" y="22" width="80" height="86" fill="#C9DCE5" />
    <ellipse cx="50" cy="108" rx="40" ry="9" fill="#C9DCE5" />
    <rect x="10" y="44" width="80" height="46" fill="#0D223F" />
    <rect x="10" y="44" width="80" height="4" fill="#00BFA5" />
    <ellipse cx="50" cy="22" rx="40" ry="10" fill="#EAF2F5" />
    <ellipse cx="50" cy="22" rx="30" ry="6.5" fill="none" stroke="#9DB5C1" strokeWidth="1" />
    <text x="50" y="66" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">SAKOU</text>
    <text x="50" y="80" textAnchor="middle" fontSize="7" fill="#E0F2EF">{label.toUpperCase()}</text>
  </svg>
)

const ProductImage = ({ product }) => (
  <div className="sk-float group mx-auto w-full max-w-[620px]">
    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
      {product.showcaseImage ? (
        <img
          src={product.showcaseImage}
          alt={product.name}
          className="mx-auto max-h-full w-full object-contain drop-shadow-2xl"
        />
      ) : (
        <div className="flex items-end justify-center">
          <Can label={product.family} className="-mr-8 w-[27%] -rotate-6 opacity-90" />
          <Can label={product.family} className="z-10 w-[42%] drop-shadow-2xl" />
          <Can label={product.family} className="-ml-8 w-[27%] rotate-6 opacity-90" />
        </div>
      )}
    </div>
  </div>
)

const arrowBtn =
  'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#0D223F]/20 text-[#0D223F] transition hover:border-[#00BFA5] hover:bg-white hover:text-[#0E6B67]'

/* --------------------------------------------------
   MAIN COMPONENT

   Props
   - products   list (defaults to the shared data file)
   - activeId   id of the open product (controlled). Leave undefined to
                let the component manage its own state.
   - onChange   called with a product id when the user steps to another product
   - open       expands / collapses the panel (default: open)
   - onClose    shows a close button when provided
   - onRequestInfo  called with the product from "Request information"
-------------------------------------------------- */
const ProductSpecs = ({
  products = PRODUCTS,
  activeId,
  onChange,
  open = true,
  onClose,
  onRequestInfo,
}) => {
  const controlled = activeId !== undefined
  const [innerIndex, setInnerIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [tab, setTab] = useState('specs')
  const [dir, setDir] = useState(1) // slide direction of the tab panel
  const selfRef = useRef(null) // id we set ourselves (arrows), to tell it apart from a catalogue click

  const found = controlled ? products.findIndex((p) => p.id === activeId) : innerIndex
  const index = found < 0 ? 0 : found
  const product = products[index]
  const total = products.length

  // When a product is opened from outside (catalogue), start on "Specifications"
  useEffect(() => {
    if (activeId == null) return
    if (selfRef.current === activeId) {
      selfRef.current = null
      return
    }
    setTab('specs')
  }, [activeId])

  if (!product) return null

  const activeTab = TABS.find((t) => t.id === tab) || TABS[0]

  // Fade the hero out, switch product (and tab), fade back in
  const stepProduct = (n, nextTab, direction) => {
    if (fading) return
    setFading(true)
    setDir(direction)
    setTimeout(() => {
      if (controlled) {
        selfRef.current = products[n].id
        onChange?.(products[n].id)
      } else {
        setInnerIndex(n)
      }
      setTab(nextTab)
      setFading(false)
    }, 250)
  }

  // Tab arrows move through every step in order:
  // P1 specs -> P1 packaging -> P2 specs -> P2 packaging -> ... -> back to P1
  const next = () => {
    if (tab === 'specs') {
      setDir(1)
      setTab('packaging')
    } else {
      stepProduct((index + 1) % total, 'specs', 1)
    }
  }

  const prev = () => {
    if (tab === 'packaging') {
      setDir(-1)
      setTab('specs')
    } else {
      stepProduct((index - 1 + total) % total, 'packaging', -1)
    }
  }

  const jumpTo = (n) => {
    if (n !== index) stepProduct(n, 'specs', n > index ? 1 : -1)
  }

  const onTabKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const handleRequest = () => {
    if (onRequestInfo) onRequestInfo(product)
    else window.location.hash = '#contact'
  }

  return (
    <section
      id="product-showcase"
      aria-hidden={!open}
      {...(!open ? { inert: '' } : {})}
      className={`grid transition-[grid-template-rows] duration-700 ease-out motion-reduce:transition-none ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="relative overflow-hidden bg-[#E0F2EF] lg:min-h-screen">
          {/* Local animations */}
          <style>{`
            @keyframes sk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
            .sk-float { animation: sk-float 6s ease-in-out infinite; }
            @keyframes sk-tab-in { from { opacity: 0; transform: translateX(var(--dx, 16px)); } to { opacity: 1; transform: none; } }
            .sk-tab-in { animation: sk-tab-in 350ms ease-out both; }
            @media (prefers-reduced-motion: reduce) { .sk-float, .sk-tab-in { animation: none; } }
          `}</style>

          {/* Split background */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-white lg:block" />

          {/* Soft background texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(rgba(13,34,63,0.07) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />

          {/* Close */}
          {onClose && (
            <button
              type="button"
              aria-label="Close specifications"
              onClick={onClose}
              className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#0D223F]/15 bg-white text-xl leading-none text-[#0D223F] shadow-sm transition hover:border-[#0D223F] hover:bg-[#0D223F] hover:text-white"
            >
              ×
            </button>
          )}

          <div
            className={`relative mx-auto flex max-w-[1440px] flex-col px-5 py-10 transition-opacity duration-300 sm:px-10 lg:min-h-screen lg:px-14 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Product number */}
            <span className="pointer-events-none absolute left-5 top-[28%] select-none text-7xl font-black text-[#0D223F]/[0.06] sm:left-10 lg:text-9xl">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Product image */}
            <div className="relative z-10 flex items-center justify-center pb-8 pt-4 lg:h-[42vh] lg:pb-0">
              <ProductImage product={product} />
            </div>

            {/* Bottom content */}
            <div className="grid flex-1 gap-10 lg:min-h-0 lg:grid-cols-2 lg:gap-14">
              {/* LEFT: Product identity */}
              <div className="flex flex-col justify-end py-4">
                <div className="mb-4 flex w-fit items-center justify-center rounded-full bg-white px-5 py-2 shadow-sm">
                  <span className="font-cairo-bold text-[11px] font-bold tracking-wider text-[#0E6B67]">
                    PRODUCT {String(index + 1).padStart(2, '0')} / CANNED SEAFOOD
                  </span>
                </div>

                <p className="font-cairo-bold text-3xl font-bold text-[#0E6B67] sm:text-4xl">{product.family}</p>

                <h2 className="mt-1 font-cairo-bold text-5xl font-black leading-[1.05] text-[#0D223F] sm:text-6xl lg:text-7xl">
                  {product.name}
                </h2>

                <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-[#445869]">
                  {product.description}
                </p>

                {/* CTA and direct product navigation */}
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={handleRequest}
                    className="rounded-full bg-[#0E6B67] px-7 py-3.5 font-cairo-bold text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D223F] hover:shadow-lg active:scale-95"
                  >
                    Request information
                  </button>

                  {total > 1 && (
                    <div className="flex items-center gap-2" aria-label="Product navigation">
                      <button
                        type="button"
                        aria-label="Previous product"
                        onClick={() => jumpTo((index - 1 + total) % total)}
                        className={arrowBtn}
                      >
                        ‹
                      </button>

                      {products.map((p, i) => (
                        <button
                          key={p.id}
                          type="button"
                          aria-label={`Show product ${i + 1}`}
                          aria-current={i === index}
                          onClick={() => jumpTo(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === index ? 'w-7 bg-[#00BFA5]' : 'w-2 bg-[#0D223F]/20 hover:bg-[#0D223F]/50'
                          }`}
                        />
                      ))}

                      <button
                        type="button"
                        aria-label="Next product"
                        onClick={() => jumpTo((index + 1) % total)}
                        className={arrowBtn}
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {!product.showcaseImage && (
                  <p className="mt-4 text-[11px] font-medium text-[#445869]/70">
                    Placeholder illustration · replace with the final product photograph.
                  </p>
                )}
              </div>

              {/* RIGHT: tabbed specifications / packaging */}
              <div className="flex min-h-0 flex-col gap-5 lg:overflow-y-auto lg:py-5 lg:pr-3 [scrollbar-color:#00BFA5_transparent] [scrollbar-width:thin]">
                <div className="mb-1">
                  <span className="font-cairo-bold text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E6B67]">
                    Product details
                  </span>
                  <h3 className="mt-2 font-cairo-bold text-xl font-bold text-[#0D223F] sm:text-2xl">
                    Specifications, packaging and formats
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#445869]">
                    Explore the technical specifications and packaging options available for this product.
                  </p>
                </div>

                {/* Tab bar with arrows */}
                <div className="flex items-center gap-2" onKeyDown={onTabKeyDown}>
                  <button type="button" aria-label="Previous section" onClick={prev} className={arrowBtn}>
                    ‹
                  </button>

                  <div
                    role="tablist"
                    aria-label="Product information"
                    className="flex flex-1 rounded-full bg-[#0D223F]/[0.06] p-1"
                  >
                    {TABS.map((t) => {
                      const active = t.id === tab
                      return (
                        <button
                          key={t.id}
                          id={`tab-${t.id}`}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-controls="spec-panel"
                          tabIndex={active ? 0 : -1}
                          onClick={() => {
                            if (!active) {
                              setDir(t.id === 'packaging' ? 1 : -1)
                              setTab(t.id)
                            }
                          }}
                          className={`flex-1 rounded-full px-3 py-2 font-cairo-bold text-xs font-bold transition-colors duration-300 ${
                            active
                              ? 'bg-[#0D223F] text-white shadow'
                              : 'text-[#0E6B67] hover:bg-white/70'
                          }`}
                        >
                          {t.label}
                        </button>
                      )
                    })}
                  </div>

                  <button type="button" aria-label="Next section" onClick={next} className={arrowBtn}>
                    ›
                  </button>
                </div>

                <p className="-mt-2 text-[11px] font-medium text-[#445869]/80" aria-live="polite">
                  Product {index + 1} of {total} · {product.family} · {activeTab.label}
                </p>

                {/* Active panel (re-animates on every tab / product change) */}
                <div
                  key={`${product.id}-${tab}`}
                  id="spec-panel"
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab.id}`}
                  className="sk-tab-in"
                  style={{ '--dx': `${dir * 16}px` }}
                >
                  <SpecList fields={activeTab.fields} data={product[activeTab.dataKey]} />
                </div>

                <p className="pb-3 text-[11px] font-medium leading-relaxed text-[#445869]/80">
                  All specifications, packaging, labels and order quantities are to be confirmed with the company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSpecs