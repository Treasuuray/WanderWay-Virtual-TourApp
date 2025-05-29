'Use client'
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import MainContentWrapper from "@/components/main-content-wrapper"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <MainContentWrapper />
          <Footer />
        </div>
      </div>
    </div>
  )
}
