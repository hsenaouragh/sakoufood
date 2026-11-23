import React from 'react'
import Button from './ui/button'

const stats = [
  { label: 'Production capacity', value: '[ TO CONFIRM ]', unit: 'Tonnes / 2027' },
  { label: 'Markets served', value: '[ TO CONFIRM ]', unit: 'Zones / 2027' },
]

const Growth = () => {
  return (
    <div className='min-h-[500px] bg-[#0D3241] flex flex-col p-10 gap-10'>
      <div className='flex flex-col ml-20 gap-4'>
        <h1 className='text-white font-cairo-bold text-2xl'>GROWTH AT A GLANCE</h1>
        <h3 className='text-[#1FC7B5] font-medium text-[17px]'>
          See how big our Products are reaching your homes, all around the country
        </h3>
      </div>

      <div className='flex items-center justify-around'>
        {stats.map((s, i) => (
          <div
            key={i}
            className='w-[500px] h-[250px] rounded-xl bg-white/7 border border-white/5 pl-10 pt-12 flex flex-col gap-1'
          >
            <p className='text-white font-medium'>{s.label}</p>
            <h1 className='text-[#1FC7B5] text-2xl font-cairo-bold'>{s.value}</h1>
            <p className='text-white font-medium'>{s.unit}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Button variant='secondary'>
          VIEW GROWTH STATISTICS
        </Button>
      </div>
    </div>
  )
}

export default Growth