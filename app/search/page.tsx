"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, MapPin, Clock, Eye } from "lucide-react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

interface SearchResult {
  id: string
  name: string
  description: string
  location: string
  type: "attraction" | "tour" | "destination"
  rating: number
  views: string
  duration?: string
  image: string
  category: string
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: "1",
      name: "Eiffel Tower",
      description: "Iconic iron lattice tower in Paris, France",
      location: "Paris, France",
      type: "attraction",
      rating: 4.8,
      views: "1.2M",
      image: "/placeholder.svg?height=200&width=300",
      category: "Landmark",
    },
    {
      id: "2",
      name: "Paris Virtual Walking Tour",
      description: "Explore the streets of Paris from your home",
      location: "Paris, France",
      type: "tour",
      rating: 4.9,
      views: "850K",
      duration: "25 min",
      image: "/placeholder.svg?height=200&width=300",
      category: "City Tour",
    },
    {
      id: "3",
      name: "Great Wall of China",
      description: "Ancient fortification in northern China",
      location: "China",
      type: "attraction",
      rating: 4.9,
      views: "2.1M",
      image: "/placeholder.svg?height=200&width=300",
      category: "Historical",
    },
    {
      id: "4",
      name: "Tokyo Street Experience",
      description: "Virtual walk through Tokyo's bustling streets",
      location: "Tokyo, Japan",
      type: "tour",
      rating: 4.7,
      views: "650K",
      duration: "30 min",
      image: "/placeholder.svg?height=200&width=300",
      category: "City Tour",
    },
    {
      id: "5",
      name: "Machu Picchu",
      description: "Ancient Incan citadel in Peru",
      location: "Peru",
      type: "attraction",
      rating: 4.8,
      views: "980K",
      image: "/placeholder.svg?height=200&width=300",
      category: "Historical",
    },
    {
      id: "6",
      name: "France",
      description: "Explore the beautiful country of France",
      location: "Europe",
      type: "destination",
      rating: 4.6,
      views: "1.5M",
      image: "/placeholder.svg?height=200&width=300",
      category: "Country",
    },
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (searchQuery.trim()) {
        const filtered = mockResults.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setResults(filtered)
      } else {
        setResults(mockResults)
      }
      setLoading(false)
    }, 500)
  }, [searchQuery])

  useEffect(() => {
    let filtered = [...results]

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType)
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory)
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "views":
        filtered.sort((a, b) => {
          const aViews = Number.parseFloat(a.views.replace(/[KM]/g, "")) * (a.views.includes("M") ? 1000000 : 1000)
          const bViews = Number.parseFloat(b.views.replace(/[KM]/g, "")) * (b.views.includes("M") ? 1000000 : 1000)
          return bViews - aViews
        })
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredResults(filtered)
  }, [results, sortBy, filterType, filterCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL and trigger search
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-8">
            {/* Search Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Search Results
                {query && <span className="text-blue-600"> for "{query}"</span>}
              </h1>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search destinations, tours, experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg"
                  />
                </div>
              </form>

              {/* Filters and Sort */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="attraction">Attractions</SelectItem>
                    <SelectItem value="tour">Tours</SelectItem>
                    <SelectItem value="destination">Destinations</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Landmark">Landmarks</SelectItem>
                    <SelectItem value="Historical">Historical</SelectItem>
                    <SelectItem value="City Tour">City Tours</SelectItem>
                    <SelectItem value="Country">Countries</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                  {loading ? "Searching..." : `${filteredResults.length} results found`}
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((result) => (
                  <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <Image
                        src={result.image || "/placeholder.svg"}
                        alt={result.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {result.type}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {result.rating}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{result.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{result.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {result.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {result.views}
                        </span>
                        {result.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.duration}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          {result.type === "tour" ? "Start Tour" : "Explore"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search terms or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setFilterType("all")
                    setFilterCategory("all")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
