import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeaturedSections from '../components/FeaturedSections'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import WhyChooseUs from '@/components/TrickThem'

export default function Home() {
  return (
    <Layout>
      <Header />
        <Hero />
        <FeaturedSections />
        <WhyChooseUs />
      <Footer />
    </Layout>
  )
}
