import React from 'react'
import GrowthTable from '../components/ui/table'
import Timeline, { Reveal } from '../components/ui/TimeLine'

const stats = [
  { label: 'Production capacity', value: '[ TO CONFIRM ]', unit: 'Tonnes / 2027' },
  { label: 'Workforce', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
  { label: 'Distribution Reach', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
  { label: 'Products Range', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
  { label: 'Markets served', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
  { label: 'Markets served', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
]

// EDIT ME: every entry is a placeholder until verified information is supplied.
// Set placeholder: false once an entry is confirmed. `image` is optional.
const DEVELOPMENT_MILESTONES = [
  {
    year: '[Year]',
    title: 'Investment milestone',
    description: 'Investment details to be confirmed.',
    image: '',
    placeholder: true,
  },
  {
    year: '[Year]',
    title: 'Development milestone',
    description: 'Development details to be confirmed.',
    image: '',
    placeholder: true,
  },
  {
    year: '[Year]',
    title: 'Next stage',
    description: 'Upcoming milestones to be confirmed.',
    image: '',
    placeholder: true,
  },
]

const GrowthPage = () => {
  return (
    <div className='flex flex-col'>
        {/* DEVELOPMENT IN PERSPECTIVE */}
        <section >
            <div className='flex flex-col p-5 ml-5 gap-5'>
                <h3 className='font-cairo-bold font-medium text-[23px] text-[#00bfa5]'>
                    GROWTH STATISTICS
                </h3>
                <h1 className='font-cairo-bold text-4xl'>
                    OUR DEVELOPMENT , IN PERSPECTIVE
                </h1>
                <p className=' text-[20px] text-gray-600'>
                    Explore production, people, product range and distribution over time.<br/>
                    Figures will be published with their reporting period and supporting source.
                </p>
            </div>
        </section>

        {/* PERFORMANCE AT A GLANCE */}
        <section className="bg-[#0D3241] px-5 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">

            <h3 className="mb-8 font-cairo-bold text-xl font-medium text-white">
            COMPANY PERFORMANCE AT A GLANCE
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s, i) => (
                <div
                key={i}
                className="flex min-h-[180px] flex-col justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.07] px-8 py-8 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                <p className="font-medium text-white/80">
                    {s.label}
                </p>

                <h1 className="font-cairo-bold text-2xl text-[#1FC7B5]">
                    {s.value}
                </h1>

                <p className="text-sm font-medium text-white/60">
                    {s.unit}
                </p>
                </div>
            ))}
            </div>

        </div>
        </section>

        {/* GROWTH OVER TIME */}
        <section id='growth-over-time' className='bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-20'>
            <div className='mx-auto max-w-6xl'>
                {/* Section title (owned by the page) */}
                <h2 className='font-cairo-bold text-3xl font-bold text-[#0D223F]'>
                    Growth Over Time
                </h2>
                <p className='mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#445869] sm:text-base'>
                    Compare like-for-like annual measures. The table remains unpopulated until figures and sources are confirmed.
                </p>

                {/* Table (UI component) */}
                <GrowthTable
                    className='mt-8'
                    maxHeight={360}
                    pageSize={8}
                    note='Each published figure should include its definition, unit, period and source. No illustrative trend line is shown.'
                />
            </div>
        </section>

        {/* DISTRIBUTION AND MARKET SERVED*/}
        <section className='bg-[#E0F2EF] min-h-[450px] px-5 py-16 sm:px-10 lg:px-20 lg:py-20'>
            <div className='flex flex-col gap-3'>
                <h3 className='font-cairo-bold text-3xl font-bold text-[#0D223F]'>
                    Distribution And Market Served
                </h3>
                <p className='mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#445869] sm:text-base'>
                    A clear view of our domestic and international presence, supported by confirmed market information.
                </p>

                <div className='flex justify-around items-center gap-8 mt-2'>
                    <div className='bg-white w-100 h-50 flex flex-col gap-5 p-5 rounded-2xl'>
                        <h3 className='font-cairo-bold text-xl text-[#0D223F]'>
                            Domestic Distribution
                        </h3>
                        <h1 className='font-cairo-bold text-[#00bfa5] text-6xl'>
                            +60
                        </h1>
                        <p>
                            Region / Wilayas
                        </p>
                    </div>
                    <div className='bg-white w-100 h-50 flex flex-col gap-5 p-5 rounded-2xl'>
                        <h3 className='font-cairo-bold text-xl text-[#0D223F]'>
                            International Markets
                        </h3>
                        <h1 className='font-cairo-bold text-[#00bfa5] text-6xl'>
                            +12
                        </h1>
                        <p>
                            Region / Wilayas
                        </p>
                    </div>
                    <div className='bg-white w-100 h-50 flex flex-col gap-5 p-5 rounded-2xl'>
                        <h3 className='font-cairo-bold text-xl text-[#0D223F]'>
                            Reporting Basis
                        </h3>
                        <h1 className='font-cairo-bold text-[#00bfa5] text-6xl'>
                            +260
                        </h1>
                        <p>
                            Region / Wilayas
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* INVESTMENT AND DEVELOPMENT MILESTONES (same design as "Our Journey") */}
        <section id='development-milestones' className='bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24'>
            <div className='mx-auto max-w-6xl'>
                <Reveal>
                    <span className='font-cairo-bold text-xs font-bold uppercase tracking-[0.18em] text-[#0E6B67]'>
                        Our development
                    </span>
                    <h2 className='mt-3 font-cairo-bold text-3xl font-bold leading-tight text-[#0D223F] sm:text-4xl'>
                        Investment and Development Milestones
                    </h2>
                    <p className='mt-4 max-w-xl text-sm font-medium leading-relaxed text-[#445869] sm:text-base'>
                        Key investments and development milestones will be published once they are confirmed and verified.
                    </p>
                </Reveal>

                <Timeline className='mt-14' milestones={DEVELOPMENT_MILESTONES} />
            </div>
        </section>
    </div>
  )
}

export default GrowthPage