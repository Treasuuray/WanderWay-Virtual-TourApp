"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Play, Star, TrendingUp, Globe, Clock, Eye, Award, Heart, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0,
    totalViews: 0,
    avgRating: 0,
  })

  // Animate numbers on load
  useEffect(() => {
    const targetStats = {
      totalUsers: 125000,
      totalTours: 450,
      totalViews: 2500000,
      avgRating: 4.8,
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        totalUsers: Math.floor(targetStats.totalUsers * progress),
        totalTours: Math.floor(targetStats.totalTours * progress),
        totalViews: Math.floor(targetStats.totalViews * progress),
        avgRating: Number((targetStats.avgRating * progress).toFixed(1)),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setStats(targetStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const featuredDestinations = [
    {
      id: 1,
      name: "Paris, France",
      image: "/placeholder.svg?height=200&width=300",
      tours: 45,
      rating: 4.9,
      views: "1.2M",
      trending: true,
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      image: "/placeholder.svg?height=200&width=300",
      tours: 38,
      rating: 4.8,
      views: "980K",
      trending: true,
    },
    {
      id: 3,
      name: "Rome, Italy",
      image: "/placeholder.svg?height=200&width=300",
      tours: 42,
      rating: 4.7,
      views: "850K",
      trending: false,
    },
    {
      id: 4,
      name: "New York, USA",
      image: "/placeholder.svg?height=200&width=300",
      tours: 35,
      rating: 4.6,
      views: "750K",
      trending: true,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "tour_completed",
      user: "Sarah M.",
      action: "completed virtual tour of",
      destination: "Machu Picchu",
      time: "2 minutes ago",
      rating: 5,
    },
    {
      id: 2,
      type: "review_posted",
      user: "Mike C.",
      action: "posted a review for",
      destination: "Eiffel Tower Tour",
      time: "5 minutes ago",
      rating: 4,
    },
    {
      id: 3,
      type: "tour_started",
      user: "Emma L.",
      action: "started virtual tour of",
      destination: "Great Wall of China",
      time: "8 minutes ago",
      rating: null,
    },
    {
      id: 4,
      type: "user_joined",
      user: "Alex R.",
      action: "joined WANDERWAY",
      destination: "",
      time: "12 minutes ago",
      rating: null,
    },
  ]

  const topTours = [
    {
      id: 1,
      title: "Sunset at Eiffel Tower",
      views: "245K",
      rating: 4.9,
      duration: "15 min",
      category: "Landmark",
    },
    {
      id: 2,
      title: "Ancient Rome Walking Tour",
      views: "198K",
      rating: 4.8,
      duration: "25 min",
      category: "Historical",
    },
    {
      id: 3,
      title: "Tokyo Neon Nights",
      views: "187K",
      rating: 4.7,
      duration: "20 min",
      category: "City",
    },
    {
      id: 4,
      title: "Machu Picchu Sunrise",
      views: "165K",
      rating: 4.9,
      duration: "18 min",
      category: "Nature",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Platform Overview</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Real-time insights into WANDERWAY's virtual tourism platform
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Virtual Tours</CardTitle>
                  <MapPin className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTours}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8 new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalViews / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +25% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Featured Destinations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Featured Destinations
                  </CardTitle>
                  <CardDescription>Most popular destinations this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredDestinations.map((destination) => (
                      <div key={destination.id} className="flex items-center space-x-4">
                        <Image
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{destination.name}</h4>
                            {destination.trending && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{destination.tours} tours</span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {destination.rating}
                            </span>
                            <span>{destination.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Tours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Top Performing Tours
                  </CardTitle>
                  <CardDescription>Highest rated tours this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTours.map((tour, index) => (
                      <div key={tour.id} className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{tour.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {tour.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {tour.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {tour.duration}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {tour.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Platform Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Live user activity on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {activity.type === "tour_completed" && <Play className="h-4 w-4 text-green-600 mt-1" />}
                          {activity.type === "review_posted" && <Star className="h-4 w-4 text-yellow-600 mt-1" />}
                          {activity.type === "tour_started" && <Eye className="h-4 w-4 text-blue-600 mt-1" />}
                          {activity.type === "user_joined" && <Users className="h-4 w-4 text-purple-600 mt-1" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                            {activity.destination && <span className="font-medium">{activity.destination}</span>}
                            {activity.rating && (
                              <span className="ml-2 inline-flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                {activity.rating}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Platform Health
                  </CardTitle>
                  <CardDescription>System performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Server Uptime</span>
                      <span className="text-green-600">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>User Satisfaction</span>
                      <span className="text-green-600">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tour Completion Rate</span>
                      <span className="text-blue-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Mobile Usage</span>
                      <span className="text-purple-600">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
