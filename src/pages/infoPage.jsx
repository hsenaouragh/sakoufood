import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, ShieldCheck, FileCheck } from 'lucide-react'
import SakouBg from '../assets/sakou-bg.png'

/* ==================================================================
   DATA: edit here, the sections below are fully data-driven
================================================================== */
const PRODUCTS_PATH = '/Products' // existing products route

// PLACEHOLDER TARGET: change to your real contact route (e.g. '/Contact').
// '/#contact' assumes a section with id="contact" on the home page.
const CONTACT_PATH = '/#contact'

// Replace with real packaged-can photos in public/products/.
// If an image is missing, a placeholder can illustration is shown.
const CATEGORIES = [
  {
    id: 'tuna',
    label: 'Tuna',
    title: 'Tuna Products',
    description: 'Explore our tuna products and available formats.',
    image: '/products/tuna-cans.png',
    alt: 'Packaged tuna cans',
  },
  {
    id: 'sardines',
    label: 'Sardines',
    title: 'Sardine Products',
    description: 'Discover our sardine product range and packaging.',
    image: '/products/sardine-cans.png',
    alt: 'Packaged sardine cans',
  },
]

// No certifications or specific procedures are claimed.
// Add them only once they are verified by the company.
const COMMITMENTS = [
  {
    number: '01',
    icon: Award,
    title: 'Product Quality',
    text: 'Committed to maintaining product quality and consistency throughout our business activities.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Food Safety',
    text: 'Recognizing the importance of hygiene, food safety and applicable requirements in the seafood industry.',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Transparency',
    text: 'Providing clear product information and maintaining transparent communication with customers and business partners.',
  },
]

// EDIT ME: every entry is a placeholder until verified history is supplied.
// Set placeholder: false once an entry is confirmed. `image` is optional.
// Works best with 3 to 5 milestones on desktop.
const MILESTONES = [
  {
    year: '[Year]',
    title: 'Company established',
    description: 'Founding story and original activity to be confirmed.',
    image: '',
    placeholder: true,
  },
  {
    year: '[Year]',
    title: 'Business development',
    description: "Key developments in the company's activities to be confirmed.",
    image: '',
    placeholder: true,
  },
  {
    year: '[Year]',
    title: 'Market expansion',
    description: 'New product ranges and markets entered to be confirmed.',
    image: '',
    placeholder: true,
  },
]

/* ==================================================================
   SMALL HELPERS (used only by this page)
================================================================== */

// Fades/slides content in when it enters the viewport.
// Disabled automatically for users with prefers-reduced-motion.
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Eyebrow + title + supporting text, in the site's heading style
const SectionHeading = ({ eyebrow, title, text }) => (
  <div>
    <span className='font-cairo-bold text-xs font-bold uppercase tracking-[0.18em] text-[#0E6B67]'>
      {eyebrow}
    </span>
    <h2 className='mt-3 font-cairo-bold text-3xl font-bold leading-tight text-[#0D223F] sm:text-4xl'>
      {title}
    </h2>
    {text && (
      <p className='mt-4 max-w-xl text-sm font-medium leading-relaxed text-[#445869] sm:text-base'>
        {text}
      </p>
    )}
  </div>
)

// Placeholder cans, shown until real product photos are supplied
const Can = ({ label, className = '' }) => (
  <svg viewBox='0 0 100 120' className={className} aria-hidden='true'>
    <ellipse cx='50' cy='111' rx='40' ry='7' fill='#0D223F' opacity='0.15' />
    <rect x='10' y='22' width='80' height='86' fill='#C9DCE5' />
    <ellipse cx='50' cy='108' rx='40' ry='9' fill='#C9DCE5' />
    <rect x='10' y='44' width='80' height='46' fill='#0D223F' />
    <rect x='10' y='44' width='80' height='4' fill='#00BFA5' />
    <ellipse cx='50' cy='22' rx='40' ry='10' fill='#EAF2F5' />
    <ellipse cx='50' cy='22' rx='30' ry='6.5' fill='none' stroke='#9DB5C1' strokeWidth='1' />
    <text x='50' y='66' textAnchor='middle' fontSize='10' fontWeight='700' fill='#fff'>
      SAKOU
    </text>
    <text x='50' y='80' textAnchor='middle' fontSize='7' fill='#E0F2EF'>
      {label.toUpperCase()}
    </text>
  </svg>
)

const CategoryCard = ({ item }) => {
  const [broken, setBroken] = useState(false)
  return (
    <Link
      to={PRODUCTS_PATH}
      aria-label={`${item.title}: explore products`}
      className='group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0D223F]/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00BFA5] motion-reduce:transition-none motion-reduce:hover:translate-y-0'
    >
      <div className='aspect-[4/3] overflow-hidden bg-[#E0F2EF]'>
        <div className='flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100'>
          {item.image && !broken ? (
            <img
              src={item.image}
              alt={item.alt}
              loading='lazy'
              onError={() => setBroken(true)}
              className='h-full w-full object-contain p-4'
            />
          ) : (
            <div className='flex w-3/4 items-end justify-center' role='img' aria-label={item.alt}>
              <Can label={item.label} className='-mr-6 w-[28%] -rotate-6 opacity-90' />
              <Can label={item.label} className='z-10 w-[42%] drop-shadow-xl' />
              <Can label={item.label} className='-ml-6 w-[28%] rotate-6 opacity-90' />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-1 flex-col p-6'>
        <h3 className='font-cairo-bold text-xl font-bold text-[#0D223F]'>{item.title}</h3>
        <p className='mt-2 text-sm font-medium leading-relaxed text-[#445869]'>{item.description}</p>
        <span className='mt-5 inline-flex items-center gap-2 font-cairo-bold text-sm font-bold text-[#0E6B67] transition-colors group-hover:text-[#00BFA5]'>
          Explore Products
          <ArrowRight
            className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0'
            aria-hidden='true'
          />
        </span>
      </div>
    </Link>
  )
}

/* ==================================================================
   PAGE
================================================================== */
const InfoPage = () => {
  return (
    <div className=''>
        {/* INTRO */}
        <div className='flex justify-center gap-2'>
            <div className='flex flex-col gap-4'>
                <h3 className='text-[#00bfa5] font-cairo-bold text-2xl'>
                    SAKOU FOOD
                </h3>
                <h1 className='text-[#0D223F] font-cairo-bold text-6xl'>
                    WHO WE ARE
                </h1>
                <p className='text-[#445869] font-medium text-[17px]'>
                    Sakou Food is a tuna company focused on the needs of professional buyers. Explore our business, capabilities and commitment to quality.
                    <br/> Our history and key development milestones are outlined below.
                </p>
            </div>
            <div className='max-w-3xl'>
                <img src={SakouBg} alt="sakou-bg" className='rounded-2xl'/>
            </div>
        </div>

        {/* STRATEGY */}
        <div className='bg-[#E0F2EF] min-h-[450px] flex flex-col justify-center'>

            <h3 className='font-cairo-bold text-4xl'>
                MISSION , VISION AND VALUES
            </h3>
            
            <div className='flex items-center justify-around'>
                <div className='bg-white w-100 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                    <h1 className='text-[#0D223F] font-cairo-bold text-2xl'>
                        MISSION
                    </h1>
                    <p className='text-[#445869] font-medium text-[17px]'>
                        Provide tuna products that meet professional buyers’ requirements, with a focus on quality and clear product information.
                    </p>
                </div>
                <div className='bg-white w-100 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                    <h1 className='text-[#0D223F] font-cairo-bold text-2xl'>
                        VISION
                    </h1>
                    <p className='text-[#445869] font-medium text-[17px]'>
                        Build long-term relationships with international seafood partners through dependable communication and continuous development.
                    </p>
                </div>
                <div className='bg-white w-100 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                    <h1 className='text-[#0D223F] font-cairo-bold text-2xl'>
                        VALUES
                    </h1>
                    <p className='text-[#445869] font-medium text-[17px]'>
                        Quality, transparency and responsibility guide the way we aim to work with our customers and partners.
                    </p>
                </div>
            </div>
        </div>

        {/* EXPERTISE & CAPABILITIES */}
        <section className="bg-white border-t-4 border-[#00BFA5] px-6 py-12 md:px-12 lg:px-16">

            {/* SECTION HEADER */}
            <div className="mb-8">
                <span className="font-cairo-bold text-xs font-bold uppercase tracking-wider text-[#0E6B67]">
                    COMPANY OVERVIEW
                </span>

                <h2 className="mt-2 font-cairo-bold text-3xl font-bold text-[#0D223F]">
                    Our Expertise & Capabilities
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#445869]">
                    Discover our business activities, product range and commitment
                    to serving professional seafood buyers.
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">

                {/* LEFT: AREAS OF EXPERTISE */}
                <div className="flex flex-col">

                    <h3 className="mb-4 font-cairo-bold text-base font-bold text-[#0D223F]">
                        Areas of expertise
                    </h3>

                    <div className="flex flex-col">

                        {/* ITEM 1 */}
                        <div className="border-b border-[#0D223F]/10 py-4">
                            <h4 className="font-cairo-bold text-sm font-bold text-[#0E6B67]">
                                Seafood products
                            </h4>

                            <p className="mt-1 text-xs leading-relaxed text-[#445869]">
                                Tuna and canned seafood products for professional markets.
                            </p>
                        </div>

                        {/* ITEM 2 */}
                        <div className="border-b border-[#0D223F]/10 py-4">
                            <h4 className="font-cairo-bold text-sm font-bold text-[#0E6B67]">
                                Formats & packaging
                            </h4>

                            <p className="mt-1 text-xs leading-relaxed text-[#445869]">
                                Product presentation, packaging options and available formats.
                            </p>
                        </div>

                        {/* ITEM 3 */}
                        <div className="py-4">
                            <h4 className="font-cairo-bold text-sm font-bold text-[#0E6B67]">
                                Quality & responsibility
                            </h4>

                            <p className="mt-1 text-xs leading-relaxed text-[#445869]">
                                A commitment to product quality, food safety awareness
                                and clear communication.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: COMPANY OVERVIEW CARD */}
                <div className="rounded-xl bg-[#E0F2EF]/60 p-6 md:p-7">

                    <h3 className="mb-4 font-cairo-bold text-base font-bold text-[#0D223F]">
                        Company overview
                    </h3>

                    <div className="flex flex-col">

                        {/* ROW 1 */}
                        <div className="flex flex-col justify-between gap-1 border-b border-[#0D223F]/10 py-3 sm:flex-row sm:items-center">
                            <span className="text-xs text-[#445869]">
                                Company location
                            </span>

                            <span className="font-cairo-bold text-xs font-bold text-[#0D223F] sm:text-right">
                                [City, Algeria]
                            </span>
                        </div>

                        {/* ROW 2 */}
                        <div className="flex flex-col justify-between gap-1 border-b border-[#0D223F]/10 py-3 sm:flex-row sm:items-center">
                            <span className="text-xs text-[#445869]">
                                Business activity
                            </span>

                            <span className="font-cairo-bold text-xs font-bold text-[#0D223F] sm:text-right">
                                Seafood products
                            </span>
                        </div>

                        {/* ROW 3 */}
                        <div className="flex flex-col justify-between gap-1 border-b border-[#0D223F]/10 py-3 sm:flex-row sm:items-center">
                            <span className="text-xs text-[#445869]">
                                Product categories
                            </span>

                            <span className="font-cairo-bold text-xs font-bold text-[#0D223F] sm:text-right">
                                Tuna & canned seafood
                            </span>
                        </div>

                        {/* ROW 4 */}
                        <div className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center">
                            <span className="text-xs text-[#445869]">
                                Business inquiries
                            </span>

                            <span className="font-cairo-bold text-xs font-bold text-[#0D223F] sm:text-right">
                                Welcome
                            </span>
                        </div>

                    </div>

                    <p className="mt-4 text-[10px] leading-relaxed text-[#445869]/80">
                        Company information is provided for general reference.
                        Product details are available upon request.
                    </p>

                </div>

            </div>
        </section>

        {/* QUALITY & RESPONSIBILITY */}
        <section id='our-commitment' className='bg-[#E0F2EF] px-5 py-16 sm:px-10 lg:px-20 lg:py-24'>
          <div className='mx-auto max-w-6xl'>
            <Reveal>
              <SectionHeading
                eyebrow='Our commitment'
                title='Quality and Responsibility'
                text='Building confidence through attention to product quality, responsible practices and clear communication with our business partners.'
              />
            </Reveal>

            <ul className='mt-12 grid gap-6 md:grid-cols-3'>
              {COMMITMENTS.map(({ number, icon: Icon, title, text }, i) => (
                <li key={title}>
                  <Reveal delay={i * 150} className='h-full'>
                    <article className='flex h-full flex-col rounded-2xl border border-[#0D223F]/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 motion-reduce:transition-none motion-reduce:hover:translate-y-0'>
                      <div className='flex items-center justify-between'>
                        <span className='grid h-12 w-12 place-items-center rounded-xl bg-[#E0F2EF] text-[#0E6B67]'>
                          <Icon className='h-6 w-6' aria-hidden='true' />
                        </span>
                        <span className='font-cairo-bold text-2xl font-bold text-[#00BFA5]'>{number}</span>
                      </div>
                      <h3 className='mt-6 font-cairo-bold text-xl font-bold text-[#0D223F]'>{title}</h3>
                      <p className='mt-3 text-sm font-medium leading-relaxed text-[#445869]'>{text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* OUR JOURNEY (vertical on mobile, horizontal on desktop) */}
        <section id='our-journey' className='bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24'>
          <div className='mx-auto max-w-6xl'>
            <Reveal>
              <SectionHeading
                eyebrow='Our journey'
                title='Growing Through Experience'
                text='Discover the milestones that have shaped Sakou Food and its development in the seafood industry.'
              />
            </Reveal>

            <ol
              className='relative mt-14 grid gap-10 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6'
              style={{ '--n': MILESTONES.length }}
            >
              {/* the line */}
              <span
                aria-hidden='true'
                className='absolute bottom-0 left-[7px] top-0 w-px bg-[#0E6B67]/25 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-full'
              />

              {MILESTONES.map((m, i) => (
                <li key={`${m.title}-${i}`} className='relative pl-9 lg:pl-0 lg:pt-10'>
                  {/* the dot */}
                  <span
                    aria-hidden='true'
                    className='absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-[3px] border-white bg-[#00BFA5] shadow ring-1 ring-[#0E6B67]/30 lg:top-0'
                  />
                  <Reveal delay={i * 150} className='h-full'>
                    <article
                      className={`flex h-full flex-col overflow-hidden rounded-2xl bg-[#E0F2EF]/60 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                        m.placeholder
                          ? 'border border-dashed border-[#0E6B67]/40'
                          : 'border border-[#0D223F]/5'
                      }`}
                    >
                      {m.image && (
                        <img src={m.image} alt={m.title} loading='lazy' className='aspect-video w-full object-cover' />
                      )}
                      <div className='p-5 sm:p-6'>
                        <p className='font-cairo-bold text-2xl font-bold text-[#0E6B67]'>{m.year}</p>
                        <h3 className='mt-2 font-cairo-bold text-base font-bold text-[#0D223F]'>{m.title}</h3>
                        <p className='mt-2 text-sm font-medium leading-relaxed text-[#445869]'>{m.description}</p>
                        {m.placeholder && (
                          <span className='mt-4 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0E6B67]'>
                            Placeholder · to confirm
                          </span>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BUSINESS INQUIRY CTA */}
        <section id='work-with-us' className='relative overflow-hidden bg-[#0D223F] px-5 py-16 sm:px-10 lg:px-20 lg:py-24'>
          <div aria-hidden='true' className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00BFA5]/15 blur-3xl' />
          <div aria-hidden='true' className='pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#0E6B67]/30 blur-3xl' />

          <Reveal>
            <div className='relative mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between'>
              <div className='max-w-2xl'>
                <span className='font-cairo-bold text-xs font-bold uppercase tracking-[0.18em] text-[#00BFA5]'>
                  Let's work together
                </span>
                <h2 className='mt-3 font-cairo-bold text-3xl font-bold leading-tight text-white sm:text-4xl'>
                  Looking for a Seafood Business Partner?
                </h2>
                <p className='mt-4 text-sm font-medium leading-relaxed text-white/75 sm:text-base'>
                  Get in touch with Sakou Food to discuss our products and your business requirements.
                </p>
              </div>

              <Link
                to={CONTACT_PATH}
                className='group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#00BFA5] px-8 py-4 font-cairo-bold text-sm font-bold text-[#0D223F] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00BFA5] motion-reduce:transition-none motion-reduce:hover:translate-y-0'
              >
                Contact Our Team
                <ArrowRight
                  className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0'
                  aria-hidden='true'
                />
              </Link>
            </div>
          </Reveal>
        </section>
    </div>
  )
}

export default InfoPage