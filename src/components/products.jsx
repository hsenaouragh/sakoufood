import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import DepthCarousel from './ui/DepthCarousel'
import Button from './ui/button'

// Replace the images, names and descriptions with your real products.
// Put the image files in /public/products/ (or change the paths).
const products = [
  {
    image: '/products/product-1.jpg',
    alt: 'Product one',
    name: 'Product One',
    description:
      'A short, clear description of this product: what it is, who it is for, and what makes it stand out.',
  },
  {
    image: '/products/product-2.jpg',
    alt: 'Product two',
    name: 'Product Two',
    description:
      'Describe the key benefits, materials or ingredients, and typical use of this product in a couple of sentences.',
  },
  {
    image: '/products/product-3.jpg',
    alt: 'Product three',
    name: 'Product Three',
    description:
      'Another product description. Keep each one around the same length so the layout stays stable.',
  },
  {
    image: '/products/product-4.jpg',
    alt: 'Product four',
    name: 'Product Four',
    description:
      'Highlight what customers love about this product and why it belongs in your range.',
  },
  {
    image: '/products/product-4.jpg',
    alt: 'Product four',
    name: 'Product Four',
    description:
      'Highlight what customers love about this product and why it belongs in your range.',
  },
]

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const infoRef = useRef(null)
  const activeProduct = products[activeIndex]

  // Fade/slide the text in whenever the focused product changes
  useEffect(() => {
    if (!infoRef.current) return
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }, [activeIndex])

  return (
    <div className="bg-white min-h-[600px] flex flex-col items-center gap-10 p-10">
      <div className="bg-blue-500 min-w-[200px] min-h-[35px] flex items-center justify-center rounded-2xl">
        <h1 className="text-[#0D223F] font-cairo-bold font-bold">OUR PRODUCTS</h1>
      </div>

      <div className="w-full max-w-6xl flex items-center justify-center gap-8 md:gap-10">
        {/* Left: carousel */}
        <div className="h-[460px] w-[50%]">
          <DepthCarousel
            items={products}
            onChange={(index) => setActiveIndex(index)}
            depth={220}
            spread={90}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay
            loop
            cardWidth={300}
            cardHeight={380}
            radius={18}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls
            showIndicators
          />
        </div>

        {/* Middle: divider (horizontal on mobile, vertical on md+) */}
        <div className="h-px w-full bg-[#0D223F]/20 md:h-64 md:w-px" />

        {/* Right: name + description of the focused product */}
        <div className="min-h-[200px] flex items-center">
          <div ref={infoRef} className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-widest text-blue-500">
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
            <h2 className="text-3xl font-bold text-[#0D223F] font-cairo-bold">
              {activeProduct.name}
            </h2>
            <p className="text-base leading-relaxed text-[#0D223F]/70 max-w-md">
              {activeProduct.description}
            </p>
          </div>
        </div>
      </div>
      <Button>
        CHECK PRODUCTS CATALOGUE
      </Button>
    </div>
  )
}

export default Products