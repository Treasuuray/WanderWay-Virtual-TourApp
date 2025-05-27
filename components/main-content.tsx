"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, Play, ExpandIcon as Explore, Send } from "lucide-react"
import Image from "next/image"

interface Attraction {
  id: string
  name: string
  description: string
  image: string
  location: string
  rating: number
}

export default function MainContent() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing virtual tour experience! Felt like I was actually there.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      comment: "Great quality videos and very informative guides.",
      date: "2024-01-14",
    },
  ])

  // Mock data for attractions (since we can't access the actual API in this environment)
  useEffect(() => {
    const mockAttractions: Attraction[] = [
      {
        id: "1",
        name: "Eiffel Tower",
        description: "Iconic iron lattice tower in Paris, France",
        image: "/placeholder.svg?height=300&width=400",
        location: "Paris, France",
        rating: 4.8,
      },
      {
        id: "2",
        name: "Great Wall of China",
        description: "Ancient fortification in northern China",
        image: "/placeholder.svg?height=300&width=400",
        location: "China",
        rating: 4.9,
      },
      {
        id: "3",
        name: "Machu Picchu",
        description: "Ancient Incan citadel in Peru",
        image: "/placeholder.svg?height=300&width=400",
        location: "Peru",
        rating: 4.7,
      },
      {
        id: "4",
        name: "Taj Mahal",
        description: "Ivory-white marble mausoleum in India",
        image: "/placeholder.svg?height=300&width=400",
        location: "Agra, India",
        rating: 4.6,
      },
      {
        id: "5",
        name: "Colosseum",
        description: "Ancient amphitheatre in Rome, Italy",
        image: "/placeholder.svg?height=300&width=400",
        location: "Rome, Italy",
        rating: 4.5,
      },
      {
        id: "6",
        name: "Petra",
        description: "Archaeological city in Jordan",
        image: "/placeholder.svg?height=300&width=400",
        location: "Jordan",
        rating: 4.8,
      },
    ]

    setTimeout(() => {
      setAttractions(mockAttractions)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (review.trim() && reviewerName.trim()) {
      const newReview = {
        id: reviews.length + 1,
        name: reviewerName,
        rating: 5,
        comment: review,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews([newReview, ...reviews])
      setReview("")
      setReviewerName("")
    }
  }

  const videos = [
    {
      id: 1,
      title: "Virtual Tour: Paris at Sunset",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "15:30",
    },
    { id: 2, title: "Exploring Ancient Rome", thumbnail: "/placeholder.svg?height=200&width=300", duration: "22:45" },
    { id: 3, title: "Machu Picchu Sunrise", thumbnail: "/placeholder.svg?height=200&width=300", duration: "18:20" },
    { id: 4, title: "Tokyo Street Walk", thumbnail: "/placeholder.svg?height=200&width=300", duration: "25:10" },
  ]

  return (
    <main className="p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World from Home</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Virtual tours that bring the world's wonders to your screen
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Start Your Journey
        </Button>
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <h2 className="text-3xl font-bold mb-8 text-center">World's Top Attractions</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {attraction.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{attraction.description}</p>
                  <p className="text-blue-600 text-sm font-medium">{attraction.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
      <section id="videos">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Virtual Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">{video.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Explore Button */}
      <section className="text-center py-8">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
        >
          <Explore className="h-5 w-5 mr-2" />
          Explore More Destinations
        </Button>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Tourist Reviews & Experiences</h2>

        {/* Add Review Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>Tell us about your virtual tour experience</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <Input
                placeholder="Your name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
              <Textarea
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                required
              />
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
