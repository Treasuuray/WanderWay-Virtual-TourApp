import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-utils";

// More comprehensive mock data
const MOCK_ATTRACTIONS = [
  {
    id: "1",
    name: "Eiffel Tower",
    location: "Paris, France",
    description: "Iconic iron tower offering panoramic city views and fine dining.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Grand Canyon",
    location: "Arizona, USA",
    description: "Vast natural canyon with layered red rock formations and stunning vistas.",
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "3",
    name: "Taj Mahal",
    location: "Agra, India",
    description: "Iconic white marble mausoleum and UNESCO World Heritage site.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Santorini",
    location: "Aegean Sea, Greece",
    description: "Stunning island with white-washed buildings and blue domes.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Colosseum",
    location: "Rome, Italy",
    description: "Ancient Roman amphitheater with a rich gladiatorial history.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Great Wall of China",
    location: "Northern China",
    description: "Ancient defensive wall spanning thousands of kilometers.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1396&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Petra",
    location: "Ma'an Governorate, Jordan",
    description: "Ancient city carved into rose-colored stone cliffs.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "9",
    name: "Angkor Wat",
    location: "Siem Reap, Cambodia",
    description: "Massive temple complex and UNESCO World Heritage site.",
    image: "https://images.unsplash.com/photo-1748311698468-dd2c11315b28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "10",
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Vast ecosystem known for its annual migration of wildebeest.",
    image: "https://plus.unsplash.com/premium_photo-1729636852214-dff2864cce02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "11",
    name: "Bora Bora",
    location: "French Polynesia",
    description: "Tropical island paradise with crystal clear waters and overwater bungalows.",
    image: "https://plus.unsplash.com/premium_photo-1719799236836-9353b88e710c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "12",
    name: "Northern Lights",
    location: "Tromsø, Norway",
    description: "Natural light display in Earth's sky, predominantly in high-latitude regions.",
    image: "https://images.unsplash.com/photo-1747582411588-f9b4acabe995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "13",
    name: "Mount Fuji",
    location: "Honshu, Japan",
    description: "Japan's highest mountain and active volcano, known for its symmetrical cone.",
    image: "https://plus.unsplash.com/premium_photo-1746596237110-1382fb583c26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "14",
    name: "Antelope Canyon",
    location: "Arizona, USA",
    description: "Stunning slot canyon known for its wave-like structure and light beams.",
    image: "https://images.unsplash.com/photo-1746956709021-54be7fcc763b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU3fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
  },
  {
    id: "15",
    name: "Taj Mahal",
    location: "Agra, India",
    description: "Iconic white marble mausoleum built by Emperor Shah Jahan.",
    image: "https://images.unsplash.com/photo-1742498527157-8abeed16b9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzNXxGem8zenVPSE42d3x8ZW58MHx8fHx8"
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would fetch from a database or external API
    // For now, we'll use mock data to ensure it works
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: MOCK_ATTRACTIONS,
      total: MOCK_ATTRACTIONS.length
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch attractions");
  }
}
