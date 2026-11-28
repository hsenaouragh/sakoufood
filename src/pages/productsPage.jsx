import React, { useRef, useState } from 'react'
import ProductCatalogue from '../components/productsCatalogue'
import ProductSpecs from '../components/productsSpecs'

const ProductsPage = () => {
  // The selected product is shared: the catalogue highlights its card,
  // the specs panel opens on it, and stepping through products in the
  // panel moves the highlight in the catalogue.
  const [selectedId, setSelectedId] = useState(null)
  const specsRef = useRef(null)

  const scrollTo = (el) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const handleSelect = (product) => {
    setSelectedId(product.id)
    // let the panel start opening, then bring it into view
    setTimeout(() => scrollTo(specsRef.current), 120)
  }

  const handleClose = () => {
    setSelectedId(null)
    scrollTo(document.getElementById('products'))
  }

  return (
    <div>
      <ProductCatalogue selectedId={selectedId} onSelectProduct={handleSelect} />

      <div ref={specsRef}>
        <ProductSpecs
          activeId={selectedId}
          onChange={setSelectedId}
          open={selectedId !== null}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}

export default ProductsPage