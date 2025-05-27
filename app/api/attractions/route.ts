import { NextResponse } from "next/server"

// Mock data for the attractions API
const mockAttractions = [
  {
    id: "1",
    name: "Eiffel Tower",
    description: "Iconic iron lattice tower in Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    location: "Paris, France",
    rating: 4.8,
    category: "landmark",
  },
  {
    id: "2",
    name: "Great Wall of China",
    description: "Ancient fortification in northern China",
    image: "/placeholder.svg?height=300&width=400",
    location: "China",
    rating: 4.9,
    category: "historical",
  },
  {
    id: "3",
    name: "Machu Picchu",
    description: "Ancient Incan citadel in Peru",
    image: "/placeholder.svg?height=300&width=400",
    location: "Peru",
    rating: 4.7,
    category: "historical",
  },
  {
    id: "4",
    name: "Taj Mahal",
    description: "Ivory-white marble mausoleum in India",
    image: "/placeholder.svg?height=300&width=400",
    location: "Agra, India",
    rating: 4.6,
    category: "landmark",
  },
  {
    id: "5",
    name: "Colosseum",
    description: "Ancient amphitheatre in Rome, Italy",
    image: "/placeholder.svg?height=300&width=400",
    location: "Rome, Italy",
    rating: 4.5,
    category: "historical",
  },
  {
    id: "6",
    name: "Petra",
    description: "Archaeological city in Jordan",
    image: "/placeholder.svg?height=300&width=400",
    location: "Jordan",
    rating: 4.8,
    category: "historical",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: mockAttractions,
      total: mockAttractions.length,
    })
  } catch (error) {
    console.error("Error fetching attractions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch attractions" }, { status: 500 })
  }
}
