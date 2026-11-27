
import React, { useState } from 'react';

/* --------------------------------------------------
   PRODUCT DATA
-------------------------------------------------- */

const TBC = 'To be confirmed';

const PRODUCTS = [
  {
    id: 'tuna-01',
    family: 'Tuna',
    name: '[Product name]',
    description:
      'Packaged tuna for professional buyers. Final product presentation and intended use are to be confirmed with the company.',
    image: '',
    specs: {
      name: '[Product name]',
      category: 'Tuna',
    },
    packaging: {
      type: 'Metal can',
    },
  },
  {
    id: 'sardines-02',
    family: 'Sardines',
    name: '[Product name]',
    description:
      'Packaged sardines for professional buyers. Final product presentation and intended use are to be confirmed with the company.',
    image: '',
    specs: {
      name: '[Product name]',
      category: 'Sardines',
    },
    packaging: {
      type: 'Metal can',
    },
  },
];

/* --------------------------------------------------
   SPECIFICATION FIELDS
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
];

const PACKAGING_FIELDS = [
  ['Packaging type', 'type'],
  ['Unit / can size', 'canSize'],
  ['Available formats', 'formats'],
  ['Packaging material', 'material'],
  ['Carton configuration', 'carton'],
  ['Units per carton', 'unitsPerCarton'],
  ['Minimum order quantity', 'moq'],
];

/* --------------------------------------------------
   SPECIFICATION COMPONENTS
-------------------------------------------------- */

const SpecRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 border-b border-[#0D223F]/10 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <dt className="font-cairo-bold text-[12px] font-semibold text-[#0E6B67]">
      {label}
    </dt>

    <dd className="text-[12px] font-medium leading-relaxed text-[#445869] sm:max-w-[55%] sm:text-right">
      {value || TBC}
    </dd>
  </div>
);

const SpecGroup = ({ title, fields, data }) => (
  <div className="rounded-2xl border border-[#0D223F]/5 bg-white p-5 shadow-sm sm:p-6">
    <h3 className="mb-3 font-cairo-bold text-sm font-bold text-[#0D223F]">
      {title}
    </h3>

    <dl>
      {fields.map(([label, key]) => (
        <SpecRow key={key} label={label} value={data?.[key]} />
      ))}
    </dl>
  </div>
);

/* --------------------------------------------------
   PRODUCT CAN PLACEHOLDER
-------------------------------------------------- */

const Can = ({ label, className = '' }) => (
  <svg
    viewBox="0 0 100 120"
    className={className}
    aria-hidden="true"
  >
    <ellipse
      cx="50"
      cy="111"
      rx="40"
      ry="7"
      fill="#0D223F"
      opacity="0.15"
    />

    <rect x="10" y="22" width="80" height="86" fill="#C9DCE5" />

    <ellipse cx="50" cy="108" rx="40" ry="9" fill="#C9DCE5" />

    <rect x="10" y="44" width="80" height="46" fill="#0D223F" />

    <rect x="10" y="44" width="80" height="4" fill="#00BFA5" />

    <ellipse cx="50" cy="22" rx="40" ry="10" fill="#EAF2F5" />

    <ellipse
      cx="50"
      cy="22"
      rx="30"
      ry="6.5"
      fill="none"
      stroke="#9DB5C1"
      strokeWidth="1"
    />

    <text
      x="50"
      y="66"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fill="#FFFFFF"
    >
      SAKOU
    </text>

    <text
      x="50"
      y="80"
      textAnchor="middle"
      fontSize="7"
      fill="#E0F2EF"
    >
      {label.toUpperCase()}
    </text>
  </svg>
);

/* --------------------------------------------------
   PRODUCT IMAGE
-------------------------------------------------- */

const ProductImage = ({ product }) => (
  <div className="sk-float group mx-auto w-full max-w-[620px]">
    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="mx-auto max-h-full w-full object-contain drop-shadow-2xl"
        />
      ) : (
        <div className="flex items-end justify-center">
          <Can
            label={product.family}
            className="-mr-8 w-[27%] -rotate-6 opacity-90"
          />

          <Can
            label={product.family}
            className="z-10 w-[42%] drop-shadow-2xl"
          />

          <Can
            label={product.family}
            className="-ml-8 w-[27%] rotate-6 opacity-90"
          />
        </div>
      )}
    </div>
  </div>
);

/* --------------------------------------------------
   MAIN PRODUCT COMPONENT
-------------------------------------------------- */

const ProductSpecs = ({ products = PRODUCTS, onRequestInfo }) => {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const product = products[index];

  if (!product) return null;

  const go = (next) => {
    const n = (next + products.length) % products.length;

    if (n === index || fading) return;

    setFading(true);

    setTimeout(() => {
      setIndex(n);
      setFading(false);
    }, 250);
  };

  const handleRequest = () => {
    if (onRequestInfo) {
      onRequestInfo(product);
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <section
      id="product-showcase"
      className="relative overflow-hidden bg-[#E0F2EF] lg:min-h-screen"
    >
      {/* Floating image animation */}
      <style>{`
        @keyframes sk-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .sk-float {
          animation: sk-float 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-float {
            animation: none;
          }
        }
      `}</style>

      {/* Split background */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-white lg:block" />

      {/* Soft background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(13,34,63,0.07) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

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

            <p className="font-cairo-bold text-3xl font-bold text-[#0E6B67] sm:text-4xl">
              {product.family}
            </p>

            <h2 className="mt-1 font-cairo-bold text-5xl font-black leading-[1.05] text-[#0D223F] sm:text-6xl lg:text-7xl">
              {product.name}
            </h2>

            <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-[#445869]">
              {product.description}
            </p>

            {/* CTA and product navigation */}
            <div className="mt-7 flex flex-wrap items-center gap-5">

              <button
                type="button"
                onClick={handleRequest}
                className="rounded-full bg-[#0E6B67] px-7 py-3.5 font-cairo-bold text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D223F] hover:shadow-lg active:scale-95"
              >
                Request information
              </button>

              {products.length > 1 && (
                <div
                  className="flex items-center gap-2"
                  aria-label="Product navigation"
                >
                  <button
                    type="button"
                    aria-label="Previous product"
                    onClick={() => go(index - 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#0D223F]/20 text-[#0D223F] transition hover:border-[#00BFA5] hover:bg-white hover:text-[#0E6B67]"
                  >
                    ‹
                  </button>

                  {products.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Show product ${i + 1}`}
                      aria-current={i === index}
                      onClick={() => go(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === index
                          ? 'w-7 bg-[#00BFA5]'
                          : 'w-2 bg-[#0D223F]/20 hover:bg-[#0D223F]/50'
                      }`}
                    />
                  ))}

                  <button
                    type="button"
                    aria-label="Next product"
                    onClick={() => go(index + 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#0D223F]/20 text-[#0D223F] transition hover:border-[#00BFA5] hover:bg-white hover:text-[#0E6B67]"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            {!product.image && (
              <p className="mt-4 text-[11px] font-medium text-[#445869]/70">
                Placeholder illustration · replace with the final product photograph.
              </p>
            )}
          </div>

          {/* RIGHT: Specifications */}
          <div className="flex min-h-0 flex-col gap-5 lg:overflow-y-auto lg:py-5 lg:pr-3 [scrollbar-color:#00BFA5_transparent] [scrollbar-width:thin]">

            {/* Specifications heading */}
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

            {/* Product specification card */}
            <SpecGroup
              title="Product specifications"
              fields={SPEC_FIELDS}
              data={product.specs}
            />

            {/* Packaging card */}
            <SpecGroup
              title="Packaging & formats"
              fields={PACKAGING_FIELDS}
              data={product.packaging}
            />

            {/* Footer note */}
            <p className="pb-3 text-[11px] font-medium leading-relaxed text-[#445869]/80">
              All specifications, packaging, labels and order quantities are to be confirmed with the company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
