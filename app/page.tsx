import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Works from '@/components/sections/Works'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Works />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
