import React from 'react'
import { Star , Award , ShieldCheck , Truck} from 'lucide-react'

const Info = () => {
  return (
    <div className='bg-[#E0F2EF] h-[500px] flex flex-col items-center gap-10 p-10'>
        <div className='bg-blue-500 min-w-[200px] min-h-[35px] flex items-center justify-center rounded-2xl'>
            <h1 className='text-[#0D223F] font-cairo-bold font-bold'>WHO WE ARE</h1>
        </div>
        
        {/*CARDS*/}
        <div className='flex gap-10'>
            <div className='bg-white w-70 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                <Star color="#00BFA5" className='bg-[#E0F2EF] rounded-[3px]'/>
                <h1 className='text-[#0D223F] font-cairo-bold'>
                    MAIN ACTIVITY
                </h1>
                <p className='text-[#445869] font-medium'>
                    Delivering premium fresh and frozen seafood crafted to the highest quality standards.
                </p>
            </div>

              <div className='bg-white w-70 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                <Award color="#00BFA5" className='bg-[#E0F2EF] rounded-[3px]'/>
                <h1 className='text-[#0D223F] font-cairo-bold'>
                    MAIN ACTIVITY
                </h1>
                <p className='text-[#445869] font-medium'>
                    Delivering premium fresh and frozen seafood crafted to the highest quality standards.
                </p>
            </div>

              <div className='bg-white w-70 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                <ShieldCheck color="#00BFA5" className='bg-[#E0F2EF] rounded-[3px]'/>
                <h1 className='text-[#0D223F] font-cairo-bold'>
                    MAIN ACTIVITY
                </h1>
                <p className='text-[#445869] font-medium'>
                    Delivering premium fresh and frozen seafood crafted to the highest quality standards.
                </p>
            </div>

              <div className='bg-white w-70 h-70 flex flex-col gap-5 p-5 rounded-2xl'>
                <Truck color="#00BFA5" className='bg-[#E0F2EF] rounded-[3px]'/>
                <h1 className='text-[#0D223F] font-cairo-bold'>
                    MAIN ACTIVITY
                </h1>
                <p className='text-[#445869] font-medium'>
                    Delivering premium fresh and frozen seafood crafted to the highest quality standards.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Info