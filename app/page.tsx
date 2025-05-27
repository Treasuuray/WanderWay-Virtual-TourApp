import { Suspense } from "react"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <MainContent />
          </Suspense>
          <Footer />
        </div>
      </div>
    </div>
  )
}
