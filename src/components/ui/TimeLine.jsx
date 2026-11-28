import React, { useEffect, useRef, useState } from 'react'

/* Fades/slides content in when it enters the viewport.
   Disabled automatically for users with prefers-reduced-motion. */
export const Reveal = ({ children, delay = 0, className = '' }) => {
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

/* Timeline only (vertical on mobile, horizontal on desktop).
   The page owns the section, heading and data.
   Each milestone: { year, title, description, image?, placeholder? }
   Works best with 3 to 5 milestones on desktop. */
const Timeline = ({ milestones = [], className = '' }) => (
  <ol
    className={`relative grid gap-10 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6 ${className}`}
    style={{ '--n': milestones.length }}
  >
    {/* the line */}
    <span
      aria-hidden='true'
      className='absolute bottom-0 left-[7px] top-0 w-px bg-[#0E6B67]/25 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-full'
    />

    {milestones.map((m, i) => (
      <li key={`${m.title}-${i}`} className='relative pl-9 lg:pl-0 lg:pt-10'>
        {/* the dot */}
        <span
          aria-hidden='true'
          className='absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-[3px] border-white bg-[#00BFA5] shadow ring-1 ring-[#0E6B67]/30 lg:top-0'
        />
        <Reveal delay={i * 150} className='h-full'>
          <article
            className={`flex h-full flex-col overflow-hidden rounded-2xl bg-[#E0F2EF]/60 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              m.placeholder ? 'border border-dashed border-[#0E6B67]/40' : 'border border-[#0D223F]/5'
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
)

export default Timeline