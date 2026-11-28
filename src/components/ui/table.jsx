import React, { useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ */
/* DATA: edit here. Replace placeholders only with confirmed figures.  */
/* Values written as "[...]" (or left empty) are styled as            */
/* placeholders, so unconfirmed data never looks like real data.       */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { key: 'year', label: 'Reporting year' },
  { key: 'capacity', label: 'Capacity (t/year)' },
  { key: 'output', label: 'Output (t/year)' },
  { key: 'workforce', label: 'Workforce' },
  { key: 'references', label: 'Product references' },
  { key: 'source', label: 'Source' },
]

const ROWS = [
  { year: '[Year]', capacity: '[To confirm]', output: '[To confirm]', workforce: '[To confirm]', references: '[To confirm]', source: '[Source]' },
  { year: '[Year]', capacity: '[To confirm]', output: '[To confirm]', workforce: '[To confirm]', references: '[To confirm]', source: '[Source]' },
  { year: '[Year]', capacity: '[To confirm]', output: '[To confirm]', workforce: '[To confirm]', references: '[To confirm]', source: '[Source]' },
]

const isPlaceholder = (v) => v == null || v === '' || /^\[.*\]$/.test(String(v).trim())

const Cell = ({ value, strong = false }) =>
  isPlaceholder(value) ? (
    <span className='text-[#445869]/55'>{value || '[To confirm]'}</span>
  ) : (
    <span className={`text-[#0D223F] ${strong ? 'font-bold' : 'font-semibold'}`}>{value}</span>
  )

// Fade/slide in when scrolled into view (disabled for reduced motion)
const useInView = () => {
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
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

/* One table at every screen size. The data area scrolls inside the table
   (vertically with a sticky header, horizontally on narrow screens) and
   rows are revealed progressively as you scroll (infinite scroll). */
const GrowthTable = ({
  columns = COLUMNS,
  rows = ROWS,
  caption = 'Growth over time', // screen-reader label for the table
  note, // optional footnote shown under the table
  pageSize = 10, // rows added each time the end is reached
  maxHeight = 420, // px: height of the scrolling area
  className = '',
}) => {
  const [ref, shown] = useInView()
  const scrollRef = useRef(null)
  const sentinelRef = useRef(null)
  const [count, setCount] = useState(pageSize)

  const visibleRows = rows.slice(0, count)
  const hasMore = count < rows.length

  // Infinite scroll: when the sentinel row enters the scroll area, add more rows.
  // The observer is re-created after each load so a tall container keeps filling.
  useEffect(() => {
    if (!hasMore) return
    const root = scrollRef.current
    const target = sentinelRef.current
    if (!root || !target || typeof IntersectionObserver === 'undefined') {
      setCount(rows.length)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCount((c) => Math.min(c + pageSize, rows.length))
      },
      { root, rootMargin: '0px 0px 80px 0px' }
    )
    io.observe(target)
    return () => io.disconnect()
  }, [count, hasMore, pageSize, rows.length])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      <div className='overflow-hidden rounded-2xl border border-[#0D223F]/10 bg-white shadow-sm'>
        {/* Scroll area: vertical + horizontal, header stays pinned */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role='region'
          aria-label={`${caption} (scrollable)`}
          style={{ maxHeight }}
          className='overflow-auto overscroll-contain scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00BFA5] [scrollbar-color:#00BFA5_transparent] [scrollbar-width:thin]'
        >
          <table className='w-full min-w-[760px] border-collapse text-left text-sm'>
            <caption className='sr-only'>{caption}</caption>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    scope='col'
                    className='sticky top-0 z-10 whitespace-nowrap bg-[#0D223F] px-5 py-4 font-cairo-bold text-[13px] font-bold text-white'
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => (
                <tr
                  key={i}
                  className='group border-t border-[#0D223F]/10 bg-white transition-colors duration-200 even:bg-[#E0F2EF]/40 hover:bg-[#E0F2EF]'
                >
                  {columns.map((c, ci) => (
                    <td
                      key={c.key}
                      className={`whitespace-nowrap px-5 py-5 transition-shadow duration-200 ${
                        ci === 0 ? 'group-hover:shadow-[inset_3px_0_0_#00BFA5]' : ''
                      }`}
                    >
                      <Cell value={row[c.key]} strong={ci === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* sentinel: triggers loading the next batch */}
          {hasMore && <div ref={sentinelRef} aria-hidden='true' className='h-px' />}
        </div>

        {/* Status bar */}
        <div
          aria-live='polite'
          className='flex items-center justify-between border-t border-[#0D223F]/10 bg-[#E0F2EF]/40 px-5 py-2 text-[11px] font-medium text-[#445869]'
        >
          <span>
            Showing {visibleRows.length} of {rows.length} {rows.length === 1 ? 'row' : 'rows'}
          </span>
          {hasMore && <span className='text-[#0E6B67]'>Scroll for more</span>}
        </div>
      </div>

      {note && <p className='mt-6 text-xs font-semibold leading-relaxed text-[#0E6B67]'>{note}</p>}
    </div>
  )
}

export default GrowthTable