import React, { useState } from 'react'

const initialForm = { company: '', phone: '', email: '', details: '' }

const inputClass =
  'w-full rounded-lg border border-[#1FC7B5]/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#1FC7B5] focus:ring-1 focus:ring-[#1FC7B5]'

const labelClass = 'text-xs font-medium text-white/80'

const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (sent) setSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send `form` to your backend / email service here
    console.log('B2B inquiry:', form)
    setForm(initialForm)
    setSent(true)
  }

  return (
    <section id='contact' className='bg-[#0d2137] px-5 py-16 sm:px-10 lg:px-20 lg:py-24'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16'>
        {/* Left: intro + contact details */}
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <span className='text-2xl font-semibold text-[#1FC7B5]'>contact us</span>
            <h2 className='font-cairo-bold text-2xl font-bold leading-tight text-white sm:text-5xl'>
              Let’s discuss your <br className='hidden sm:block' />
              business requirements.
            </h2>
            <p className='max-w-md text-sm leading-relaxed font-cairo-bold text-white/80 sm:text-base'>
              Tell us which tuna products you need, your preferred packaging, expected quantities and
              destination market.
            </p>
          </div>

          <ul className='flex flex-col gap-2 text-sm text-white font-sans font-semibold text-[17px]'>
            <li>
              Email:{' '}
              <a href='mailto:info@sakoufood.com' className='hover:text-[#1FC7B5]'>
                info@sakoufood.com
              </a>
            </li>
            <li>Phone: [To confirm]</li>
            <li>Address: [To confirm]</li>
          </ul>
        </div>

        {/* Right: form card */}
        <form
          onSubmit={handleSubmit}
          className='flex w-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8'
        >
          <h3 className='font-cairo-bold text-lg font-bold text-white'>Send a B2B inquiry</h3>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='company' className={labelClass}>
              Company / full name
            </label>
            <input
              id='company'
              name='company'
              type='text'
              required
              value={form.company}
              onChange={handleChange}
              placeholder='Company and contact name'
              className={inputClass}
            />
          </div>

          <div className='grid gap-5 sm:grid-cols-2'>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='phone' className={labelClass}>
                Phone number
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                value={form.phone}
                onChange={handleChange}
                placeholder='+Country code · Phone'
                className={inputClass}
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='email' className={labelClass}>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={form.email}
                onChange={handleChange}
                placeholder='example@mail.com'
                className={inputClass}
              />
            </div>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='details' className={labelClass}>
              Product, quantity, packaging &amp; destination
            </label>
            <textarea
              id='details'
              name='details'
              rows={4}
              required
              value={form.details}
              onChange={handleChange}
              placeholder='Write here'
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type='submit'
            className='rounded-lg bg-[#1FC7B5] py-3 text-sm font-semibold text-[#0D3241] transition hover:brightness-110 active:scale-[0.99] font-cairo-bold font-medium'
          >
            Send inquiry
          </button>

          {sent && (
            <p role='status' className='text-center text-sm text-[#1FC7B5]'>
              Thank you! We received your inquiry and will get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact