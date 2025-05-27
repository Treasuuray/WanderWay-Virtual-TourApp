"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Globe, Award, Heart, Target, Eye, Lightbulb, Shield, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Former travel industry executive with 15+ years of experience in digital tourism innovation.",
      linkedin: "#",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Tech visionary specializing in VR/AR technologies and immersive digital experiences.",
      linkedin: "#",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Head of Content",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Award-winning travel photographer and content creator with a passion for storytelling.",
      linkedin: "#",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Head of Engineering",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Full-stack developer with expertise in scalable web applications and user experience.",
      linkedin: "#",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Head of Marketing",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Digital marketing strategist focused on building communities around travel and exploration.",
      linkedin: "#",
    },
    {
      id: 6,
      name: "Alex Patel",
      role: "UX Designer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "User experience designer passionate about creating intuitive and accessible digital experiences.",
      linkedin: "#",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "WANDERWAY was born from a vision to make travel accessible to everyone, everywhere.",
    },
    {
      year: "2021",
      title: "First Virtual Tours",
      description: "Launched our first collection of 50 virtual tours across 15 countries.",
    },
    {
      year: "2022",
      title: "100K Users",
      description: "Reached our first major milestone of 100,000 registered users worldwide.",
    },
    {
      year: "2023",
      title: "VR Integration",
      description: "Introduced VR compatibility and 360° immersive tour experiences.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with over 500 virtual tours and 1M+ users.",
    },
  ]

  const values = [
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Making world exploration accessible to everyone, regardless of physical or financial limitations.",
    },
    {
      icon: Heart,
      title: "Cultural Respect",
      description: "Celebrating and preserving cultural heritage through authentic, respectful storytelling.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously pushing the boundaries of virtual travel technology and user experience.",
    },
    {
      icon: Shield,
      title: "Sustainability",
      description: "Promoting sustainable tourism practices and environmental consciousness.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of explorers, dreamers, and cultural enthusiasts.",
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "Delivering high-quality, immersive experiences that inspire and educate.",
    },
  ]

  const stats = [
    { label: "Virtual Tours", value: "500+", icon: MapPin },
    { label: "Countries", value: "50+", icon: Globe },
    { label: "Active Users", value: "1M+", icon: Users },
    { label: "Awards Won", value: "15", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-8">
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white mb-12">
              <h1 className="text-5xl font-bold mb-6">About WANDERWAY</h1>
              <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
                We're on a mission to make the world's most incredible destinations accessible to everyone, breaking
                down barriers and bringing global exploration to your fingertips.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Join Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Watch Our Story
                </Button>
              </div>
            </section>

            {/* Stats Section */}
            <section className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-6 w-6 text-blue-600" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      To democratize travel and cultural exploration by creating immersive, accessible virtual
                      experiences that inspire, educate, and connect people with the world's most incredible
                      destinations. We believe that everyone deserves to explore the wonders of our planet, regardless
                      of physical, financial, or geographical constraints.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-6 w-6 text-purple-600" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      To become the world's leading platform for virtual travel experiences, fostering global
                      understanding and cultural appreciation. We envision a future where virtual exploration
                      complements physical travel, making the world more connected, sustainable, and accessible to all.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Values */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
              <div className="max-w-4xl mx-auto">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start mb-8 last:mb-0">
                    <div className="flex-shrink-0 w-20 text-right mr-8">
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6">Join Our Global Community</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Be part of a movement that's changing how the world explores, learns, and connects through virtual
                travel experiences.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
