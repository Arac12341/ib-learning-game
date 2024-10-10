import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeaturedSections from '../components/FeaturedSections'
import Footer from '@/components/Footer'
import WhyChooseUs from '@/components/TrickThem'

export default function Home() {
  return (
    <Layout>
        <Hero />
        <FeaturedSections />
        <WhyChooseUs />
      <Footer />
    </Layout>
  )
}
