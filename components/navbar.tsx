"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, User, Phone, Eye, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  name: string
  location: string
  type: "attraction" | "tour" | "destination"
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock search data
  const searchData: SearchResult[] = [
    { id: "1", name: "Eiffel Tower", location: "Paris, France", type: "attraction" },
    { id: "2", name: "Great Wall of China", location: "China", type: "attraction" },
    { id: "3", name: "Machu Picchu", location: "Peru", type: "attraction" },
    { id: "4", name: "Taj Mahal", location: "Agra, India", type: "attraction" },
    { id: "5", name: "Colosseum", location: "Rome, Italy", type: "attraction" },
    { id: "6", name: "Petra", location: "Jordan", type: "attraction" },
    { id: "7", name: "Paris Virtual Tour", location: "Paris, France", type: "tour" },
    { id: "8", name: "Tokyo Street Walk", location: "Tokyo, Japan", type: "tour" },
    { id: "9", name: "Rome Ancient Sites", location: "Rome, Italy", type: "tour" },
    { id: "10", name: "France", location: "Europe", type: "destination" },
    { id: "11", name: "Japan", location: "Asia", type: "destination" },
    { id: "12", name: "Italy", location: "Europe", type: "destination" },
  ]

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered.slice(0, 6)) // Limit to 6 results
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery("")
    setShowResults(false)
    // Navigate based on result type
    if (result.type === "attraction") {
      router.push(`/attraction/${result.id}`)
    } else if (result.type === "tour") {
      router.push(`/tour/${result.id}`)
    } else {
      router.push(`/destination/${result.id}`)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowResults(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">WANDERWAY</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search destinations, tours, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{result.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{result.location}</p>
                      </div>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        {result.type}
                      </span>
                    </div>
                  </button>
                ))}
                {searchQuery && (
                  <button
                    onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-blue-600 dark:text-blue-400 font-medium"
                  >
                    View all results for "{searchQuery}"
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/overview"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Overview</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>

            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
