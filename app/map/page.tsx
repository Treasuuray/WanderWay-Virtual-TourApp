"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Search,
  Filter,
  Layers,
  Navigation,
  Maximize,
  Star,
  Eye,
  Camera,
  Mountain,
  Building,
  TreePine,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

interface MapLocation {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  type: "landmark" | "city" | "nature" | "historical"
  rating: number
  tours: number
  image: string
  description: string
  country: string
  continent: string
  featured: boolean
}

interface MapFilter {
  type: string
  continent: string
  rating: number
  featured: boolean
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mapView, setMapView] = useState("world")
  const [filters, setFilters] = useState<MapFilter>({
    type: "all",
    continent: "all",
    rating: 0,
    featured: false,
  })

  // Mock map locations data
  const [locations] = useState<MapLocation[]>([
    {
      id: "1",
      name: "Eiffel Tower",
      coordinates: { lat: 48.8584, lng: 2.2945 },
      type: "landmark",
      rating: 4.8,
      tours: 12,
      image: "/placeholder.svg?height=200&width=300",
      description: "Iconic iron lattice tower in Paris, France",
      country: "France",
      continent: "Europe",
      featured: true,
    },
    {
      id: "2",
      name: "Great Wall of China",
      coordinates: { lat: 40.4319, lng: 116.5704 },
      type: "historical",
      rating: 4.9,
      tours: 8,
      image: "/placeholder.svg?height=200&width=300",
      description: "Ancient fortification in northern China",
      country: "China",
      continent: "Asia",
      featured: true,
    },
    {
      id: "3",
      name: "Machu Picchu",
      coordinates: { lat: -13.1631, lng: -72.545 },
      type: "historical",
      rating: 4.7,
      tours: 6,
      image: "/placeholder.svg?height=200&width=300",
      description: "Ancient Incan citadel in Peru",
      country: "Peru",
      continent: "South America",
      featured: true,
    },
    {
      id: "4",
      name: "Tokyo",
      coordinates: { lat: 35.6762, lng: 139.6503 },
      type: "city",
      rating: 4.6,
      tours: 15,
      image: "/placeholder.svg?height=200&width=300",
      description: "Modern metropolis blending tradition and innovation",
      country: "Japan",
      continent: "Asia",
      featured: false,
    },
    {
      id: "5",
      name: "Colosseum",
      coordinates: { lat: 41.8902, lng: 12.4922 },
      type: "historical",
      rating: 4.5,
      tours: 9,
      image: "/placeholder.svg?height=200&width=300",
      description: "Ancient amphitheatre in Rome, Italy",
      country: "Italy",
      continent: "Europe",
      featured: false,
    },
    {
      id: "6",
      name: "Petra",
      coordinates: { lat: 30.3285, lng: 35.4444 },
      type: "historical",
      rating: 4.8,
      tours: 7,
      image: "/placeholder.svg?height=200&width=300",
      description: "Archaeological city in Jordan",
      country: "Jordan",
      continent: "Asia",
      featured: true,
    },
    {
      id: "7",
      name: "Santorini",
      coordinates: { lat: 36.3932, lng: 25.4615 },
      type: "nature",
      rating: 4.7,
      tours: 5,
      image: "/placeholder.svg?height=200&width=300",
      description: "Beautiful Greek island with stunning sunsets",
      country: "Greece",
      continent: "Europe",
      featured: false,
    },
    {
      id: "8",
      name: "New York City",
      coordinates: { lat: 40.7128, lng: -74.006 },
      type: "city",
      rating: 4.4,
      tours: 18,
      image: "/placeholder.svg?height=200&width=300",
      description: "The city that never sleeps",
      country: "USA",
      continent: "North America",
      featured: false,
    },
  ])

  const filteredLocations = locations.filter((location) => {
    if (filters.type !== "all" && location.type !== filters.type) return false
    if (filters.continent !== "all" && location.continent !== filters.continent) return false
    if (filters.rating > 0 && location.rating < filters.rating) return false
    if (filters.featured && !location.featured) return false
    if (searchQuery && !location.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "landmark":
        return <Building className="h-4 w-4" />
      case "city":
        return <Building className="h-4 w-4" />
      case "nature":
        return <TreePine className="h-4 w-4" />
      case "historical":
        return <Mountain className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "landmark":
        return "bg-blue-500"
      case "city":
        return "bg-purple-500"
      case "nature":
        return "bg-green-500"
      case "historical":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Interactive World Map</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Explore destinations around the world and discover virtual tours
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Map Controls */}
              <div className="lg:col-span-1 space-y-6">
                {/* Search */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Search Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="landmark">Landmarks</SelectItem>
                          <SelectItem value="city">Cities</SelectItem>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="historical">Historical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Continent</label>
                      <Select
                        value={filters.continent}
                        onValueChange={(value) => setFilters({ ...filters, continent: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Continents</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia">Asia</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="South America">South America</SelectItem>
                          <SelectItem value="Africa">Africa</SelectItem>
                          <SelectItem value="Oceania">Oceania</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Minimum Rating</label>
                      <Select
                        value={filters.rating.toString()}
                        onValueChange={(value) => setFilters({ ...filters, rating: Number.parseFloat(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Any Rating</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4.8">4.8+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={filters.featured}
                        onChange={(e) => setFilters({ ...filters, featured: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured only
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Map Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">View</label>
                      <Select value={mapView} onValueChange={setMapView}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="world">World View</SelectItem>
                          <SelectItem value="satellite">Satellite</SelectItem>
                          <SelectItem value="terrain">Terrain</SelectItem>
                          <SelectItem value="street">Street View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Navigation className="h-4 w-4 mr-1" />
                        Center
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Maximize className="h-4 w-4 mr-1" />
                        Fullscreen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Legend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Landmarks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Cities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Nature</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Historical</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Map Area */}
              <div className="lg:col-span-3">
                <Card className="h-[600px]">
                  <CardContent className="p-0 h-full">
                    {/* Mock Interactive Map */}
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg overflow-hidden">
                      {/* Map Background */}
                      <div className="absolute inset-0 opacity-20">
                        <Image
                          src="/placeholder.svg?height=600&width=800"
                          alt="World Map"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Location Markers */}
                      {filteredLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location)}
                          className={`absolute w-6 h-6 ${getTypeColor(
                            location.type,
                          )} rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center`}
                          style={{
                            left: `${((location.coordinates.lng + 180) / 360) * 100}%`,
                            top: `${((90 - location.coordinates.lat) / 180) * 100}%`,
                          }}
                          title={location.name}
                        >
                          {location.featured && <Star className="h-3 w-3 text-white fill-white" />}
                        </button>
                      ))}

                      {/* Map Info Overlay */}
                      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                        <div className="text-sm font-medium">{filteredLocations.length} locations found</div>
                        <div className="text-xs text-gray-500">
                          {mapView.charAt(0).toUpperCase() + mapView.slice(1)} view
                        </div>
                      </div>

                      {/* Selected Location Popup */}
                      {selectedLocation && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm">
                          <div className="flex items-start gap-3">
                            <Image
                              src={selectedLocation.image || "/placeholder.svg"}
                              alt={selectedLocation.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{selectedLocation.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedLocation.country}</p>
                                </div>
                                <button
                                  onClick={() => setSelectedLocation(null)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  ×
                                </button>
                              </div>

                              <div className="flex items-center gap-3 mt-2 text-sm">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {selectedLocation.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Camera className="h-3 w-3" />
                                  {selectedLocation.tours} tours
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {selectedLocation.type}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {selectedLocation.description}
                              </p>

                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="flex-1">
                                  View Tours
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Location List */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Locations ({filteredLocations.length})</CardTitle>
                    <CardDescription>Click on any location to view details and available tours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {filteredLocations.map((location) => (
                        <div
                          key={location.id}
                          onClick={() => setSelectedLocation(location)}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <div className={`w-3 h-3 ${getTypeColor(location.type)} rounded-full`}></div>
                          <Image
                            src={location.image || "/placeholder.svg"}
                            alt={location.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{location.name}</h4>
                              {location.featured && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{location.country}</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {location.rating}
                              </span>
                              <span>{location.tours} tours</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
