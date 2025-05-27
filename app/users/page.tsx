"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, MapPin, Eye, Star, Filter, Calendar, User, Globe, Play, Heart, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

interface UserActivity {
  id: string
  type: "tour_viewed" | "search" | "review" | "bookmark" | "share"
  title: string
  description: string
  timestamp: string
  location?: string
  rating?: number
  duration?: string
  image?: string
}

interface SearchHistory {
  id: string
  query: string
  timestamp: string
  results: number
  category: string
}

interface RecentUser {
  id: string
  name: string
  avatar: string
  location: string
  joinDate: string
  toursCompleted: number
  lastActive: string
  isOnline: boolean
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock user activity data
  const [userActivity] = useState<UserActivity[]>([
    {
      id: "1",
      type: "tour_viewed",
      title: "Completed Virtual Tour",
      description: "Eiffel Tower Sunset Experience",
      timestamp: "2024-01-20T14:30:00Z",
      location: "Paris, France",
      rating: 5,
      duration: "15 min",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      type: "search",
      title: "Searched for destinations",
      description: "Tokyo temples and gardens",
      timestamp: "2024-01-20T13:15:00Z",
    },
    {
      id: "3",
      type: "review",
      title: "Posted a review",
      description: "Great Wall of China Virtual Walk",
      timestamp: "2024-01-20T12:00:00Z",
      location: "China",
      rating: 4,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "4",
      type: "bookmark",
      title: "Bookmarked tour",
      description: "Machu Picchu Sunrise Tour",
      timestamp: "2024-01-20T11:30:00Z",
      location: "Peru",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "5",
      type: "tour_viewed",
      title: "Started Virtual Tour",
      description: "Ancient Rome Walking Experience",
      timestamp: "2024-01-20T10:45:00Z",
      location: "Rome, Italy",
      duration: "25 min",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "6",
      type: "share",
      title: "Shared tour",
      description: "Tokyo Neon Nights Tour",
      timestamp: "2024-01-19T16:20:00Z",
      location: "Tokyo, Japan",
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  // Mock search history
  const [searchHistory] = useState<SearchHistory[]>([
    {
      id: "1",
      query: "Tokyo temples",
      timestamp: "2024-01-20T13:15:00Z",
      results: 24,
      category: "Religious Sites",
    },
    {
      id: "2",
      query: "Paris museums",
      timestamp: "2024-01-20T09:30:00Z",
      results: 18,
      category: "Museums",
    },
    {
      id: "3",
      query: "Italian countryside",
      timestamp: "2024-01-19T15:45:00Z",
      results: 31,
      category: "Nature",
    },
    {
      id: "4",
      query: "Ancient Egypt",
      timestamp: "2024-01-19T11:20:00Z",
      results: 12,
      category: "Historical",
    },
    {
      id: "5",
      query: "New York skyline",
      timestamp: "2024-01-18T14:10:00Z",
      results: 8,
      category: "City Views",
    },
  ])

  // Mock recent users
  const [recentUsers] = useState<RecentUser[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "New York, USA",
      joinDate: "2024-01-15",
      toursCompleted: 23,
      lastActive: "2 minutes ago",
      isOnline: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Toronto, Canada",
      joinDate: "2024-01-18",
      toursCompleted: 15,
      lastActive: "5 minutes ago",
      isOnline: true,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Madrid, Spain",
      joinDate: "2024-01-12",
      toursCompleted: 31,
      lastActive: "1 hour ago",
      isOnline: false,
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Seoul, South Korea",
      joinDate: "2024-01-10",
      toursCompleted: 42,
      lastActive: "3 hours ago",
      isOnline: false,
    },
    {
      id: "5",
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "London, UK",
      joinDate: "2024-01-08",
      toursCompleted: 28,
      lastActive: "1 day ago",
      isOnline: false,
    },
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tour_viewed":
        return <Play className="h-4 w-4 text-blue-600" />
      case "search":
        return <Search className="h-4 w-4 text-green-600" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-600" />
      case "bookmark":
        return <Heart className="h-4 w-4 text-red-600" />
      case "share":
        return <Globe className="h-4 w-4 text-purple-600" />
      default:
        return <Eye className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">User Activity</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Track your exploration history and discover what others are exploring
              </p>
            </div>

            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-96">
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="search">Search History</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              {/* Recent Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Filter:</span>
                      </div>

                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Activity Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          <SelectItem value="tour_viewed">Tours Viewed</SelectItem>
                          <SelectItem value="search">Searches</SelectItem>
                          <SelectItem value="review">Reviews</SelectItem>
                          <SelectItem value="bookmark">Bookmarks</SelectItem>
                          <SelectItem value="share">Shares</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="type">By Type</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity List */}
                <div className="space-y-4">
                  {userActivity
                    .filter((activity) => filterType === "all" || activity.type === filterType)
                    .map((activity) => (
                      <Card key={activity.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

                            {activity.image && (
                              <Image
                                src={activity.image || "/placeholder.svg"}
                                alt={activity.description}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                            )}

                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>

                                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatTimestamp(activity.timestamp)}
                                    </span>

                                    {activity.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {activity.location}
                                      </span>
                                    )}

                                    {activity.duration && (
                                      <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {activity.duration}
                                      </span>
                                    )}

                                    {activity.rating && (
                                      <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        {activity.rating}/5
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <Badge variant="outline" className="text-xs">
                                  {activity.type.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Search History Tab */}
              <TabsContent value="search" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Search History</CardTitle>
                    <CardDescription>Your recent searches and exploration queries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchHistory.map((search) => (
                        <div
                          key={search.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Search className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{search.query}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{formatTimestamp(search.timestamp)}</span>
                                <span>{search.results} results</span>
                                <Badge variant="outline" className="text-xs">
                                  {search.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Search Again
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Searches */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Searches This Week</CardTitle>
                    <CardDescription>Trending destinations and experiences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Paris landmarks",
                        "Tokyo street food",
                        "Italian museums",
                        "Egyptian pyramids",
                        "New York skyline",
                        "London bridges",
                        "Barcelona architecture",
                        "Amsterdam canals",
                      ].map((tag, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>New members and active explorers in the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                              {user.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{user.name}</h3>
                                {user.isOnline && (
                                  <Badge variant="secondary" className="text-xs">
                                    Online
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {user.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Play className="h-3 w-3" />
                                  {user.toursCompleted} tours
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Joined {new Date(user.joinDate).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">Last active: {user.lastActive}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            <Button variant="ghost" size="sm">
                              Message
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">1,250</div>
                      <div className="text-sm text-gray-500">Active Users Today</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-gray-500">Countries Represented</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Play className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">3,420</div>
                      <div className="text-sm text-gray-500">Tours Completed Today</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
