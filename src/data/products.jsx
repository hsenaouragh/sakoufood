/* ------------------------------------------------------------------
   SHARED PRODUCT DATA: used by the catalogue AND the specs panel.
   Add a product by adding one object. Leave values empty or as
   'To confirm' until final (nothing is invented).

   image         -> photo used on the catalogue card
   showcaseImage -> transparent PNG of the cans for the specs hero
                    (empty = placeholder cans)
------------------------------------------------------------------- */
export const PRODUCTS = [
  {
    id: 1,
    family: 'Tuna',
    flavor: 'Sunflower oil',
    name: '[Product name]',
    packSize: 'To confirm',
    image: '/products/product-1.jpg',
    showcaseImage: '',
    description:
      'Packaged tuna for professional buyers. Final product presentation and intended use are to be confirmed with the company.',
    specs: { name: '[Product name]', category: 'Tuna' },
    packaging: { type: 'Metal can' },
  },
  {
    id: 2,
    family: 'Sardines',
    flavor: 'Tomato',
    name: '[Product name]',
    packSize: 'To confirm',
    image: '/products/product-2.jpg',
    showcaseImage: '',
    description:
      'Packaged sardines for professional buyers. Final product presentation and intended use are to be confirmed with the company.',
    specs: { name: '[Product name]', category: 'Sardines' },
    packaging: { type: 'Metal can' },
  },
  {
    id: 3,
    family: 'Tuna',
    flavor: 'Spicy oil',
    name: '[Product name]',
    packSize: 'To confirm',
    image: '/products/product-3.jpg',
    showcaseImage: '',
    description:
      'Packaged tuna for professional buyers. Final product presentation and intended use are to be confirmed with the company.',
    specs: { name: '[Product name]', category: 'Tuna' },
    packaging: { type: 'Metal can' },
  },
]

export default PRODUCTS