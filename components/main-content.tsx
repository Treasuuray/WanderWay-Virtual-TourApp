'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ExpandIcon as Explore, Star, Info, Map, Users, Send, X, ArrowLeft, ArrowRight } from "lucide-react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image';

// Add modal component for image viewing
function ImageModal({ 
  src, 
  alt, 
  onClose, 
  onNext, 
  onPrevious, 
  hasNext, 
  hasPrevious 
}: { 
  src: string; 
  alt: string; 
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh]">
        <button 
          className="absolute -top-10 right-0 text-white p-2 rounded-full hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        
        {hasPrevious && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white p-2 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); onPrevious?.(); }}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        
        {hasNext && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white p-2 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        )}
        
        <img src={src} alt={alt} className="max-h-[80vh] max-w-full object-contain" />
      </div>
    </div>
  );
}

// Add video player modal
function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh]">
        <button 
          className="absolute -top-10 right-0 text-white p-2 rounded-full hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        <div className="bg-black rounded-lg overflow-hidden">
          <video 
            src={src} 
            controls 
            autoPlay 
            className="max-h-[80vh] max-w-full"
          >
            Your browser does not support the video tag.
          </video>
          <div className="p-4 text-white">{title}</div>
        </div>
      </div>
    </div>
  );
}

type Attraction = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
};

type AttractionCardProps = {
  attraction: Attraction;
};

function AttractionCard({ attraction, index, attractions }: AttractionCardProps & { index: number, attractions: Attraction[] }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % attractions.length;
    setCurrentIndex(nextIndex);
  };
  
  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + attractions.length) % attractions.length;
    setCurrentIndex(prevIndex);
  };
  
  const currentAttraction = showImageModal ? attractions[currentIndex] : attraction;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative" onClick={() => {
        setCurrentIndex(index); // Reset to original index when opening
        setShowImageModal(true);
      }}>
        <SafeImage
          src={attraction.image}
          alt={attraction.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{attraction.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{attraction.location}</p>
        <p className="text-gray-700 dark:text-gray-300">{attraction.description}</p>
      </CardContent>
      
      {showImageModal && (
        <ImageModal 
          src={currentAttraction.image} 
          alt={currentAttraction.name} 
          onClose={() => setShowImageModal(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={attractions.length > 1}
          hasPrevious={attractions.length > 1}
        />
      )}
    </Card>
  );
}

export default function MainContent() {
  // Add state for video modal
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos[0]) | null>(null);
  
  // Define all state variables at the top level
  const [mounted, setMounted] = useState(false);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
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
  ]);
  
  // Videos data
  const videos = [
    {
      id: 1,
      title: "Exploring the Grand Canyon",
      thumbnail: "https://videos.pexels.com/video-files/2141798/2141798-sd_640_360_25fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2141798/free-video-2141798.jpg",
      duration: "0:25"
    },
    {
      id: 2,
      title: "Paris: City of Lights",
      thumbnail: "https://videos.pexels.com/video-files/3123756/3123756-sd_640_360_24fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/3123756/free-video-3123756.jpg",
      duration: "0:18"
    },
    {
      id: 3,
      title: "Venice Canals Tour",
      thumbnail: "https://videos.pexels.com/video-files/2848072/2848072-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2848072/free-video-2848072.jpg",
      duration: "0:12"
    },
    {
      id: 4,
      title: "Tokyo Cityscape",
      thumbnail: "https://videos.pexels.com/video-files/2099332/2099332-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2099332/free-video-2099332.jpg",
      duration: "0:15"
    },
    {
      id: 5,
      title: "Tokyo Night Skyline",
      thumbnail: "https://videos.pexels.com/video-files/4133023/4133023-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/4133023/free-video-4133023.jpg",
      duration: "0:20"
    },
    {
      id: 6,
      title: "Shibuya Crossing",
      thumbnail: "https://videos.pexels.com/video-files/2933375/2933375-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2933375/free-video-2933375.jpg",
      duration: "0:15"
    },
    {
      id: 7,
      title: "Cherry Blossoms in Japan",
      thumbnail: "https://videos.pexels.com/video-files/2547258/2547258-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2547258/free-video-2547258.jpg",
      duration: "0:18"
    },
    {
      id: 8,
      title: "Coastal Italy",
      thumbnail: "https://videos.pexels.com/video-files/3576378/3576378-sd_640_360_25fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/3576378/free-video-3576378.jpg",
      duration: "0:22"
    },
    {
      id: 9,
      title: "Kyoto Gardens",
      thumbnail: "https://videos.pexels.com/video-files/2547258/2547258-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2547258/free-video-2547258.jpg",
      duration: "0:18"
    },
    {
      id: 10,
      title: "Mediterranean Beaches",
      thumbnail: "https://videos.pexels.com/video-files/3576378/3576378-sd_640_360_25fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/3576378/free-video-3576378.jpg",
      duration: "0:22"
    },
    {
      id: 11,
      title: "Northern Lights",
      thumbnail: "https://videos.pexels.com/video-files/3135808/3135808-sd_640_360_24fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/3135808/free-video-3135808.jpg",
      duration: "0:16"
    },
    {
      id: 12,
      title: "Tropical Paradise",
      thumbnail: "https://videos.pexels.com/video-files/2169880/2169880-sd_640_360_30fps.mp4",
      thumbnailImage: "https://images.pexels.com/videos/2169880/free-video-2169880.jpg",
      duration: "0:14"
    },
    {
      id: 13,
      title: 'Mount Fuji Sunrise',
      thumbnail: 'https://videos.pexels.com/video-files/3028399/3028399-sd_640_360_24fps.mp4',
      thumbnailImage: 'https://images.pexels.com/videos/3028399/free-video-3028399.jpg',
      duration: '0:25'
    },
    {
      id: 14,
      title: 'Amazon Rainforest',
      thumbnail: 'https://videos.pexels.com/video-files/2035976/2035976-sd_640_360_30fps.mp4',
      thumbnailImage: 'https://images.pexels.com/videos/2035976/free-video-2035976.jpg',
      duration: '0:20'
    },
    {
      id: 15,
      title: 'Machu Picchu Dawn',
      thumbnail: 'https://videos.pexels.com/video-files/4035859/4035859-sd_640_360_25fps.mp4',
      thumbnailImage: 'https://images.pexels.com/videos/4035859/free-video-4035859.jpg',
      duration: '0:24'
    },
    {
      id: 16,
      title: 'Dubai Modern Marvels',
      thumbnail: 'https://videos.pexels.com/video-files/2851008/2851008-sd_960_506_24fps.mp4',
      thumbnailImage: 'https://images.pexels.com/videos/2851008/free-video-2851008.jpg',
      duration: '0:18'
    }
  ];

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch attractions
  useEffect(() => {
    if (!mounted) return;

    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/attractions', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setAttractions(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch attractions");
        }
      } catch (err) {
        console.error("Error fetching attractions:", err);
        setError(err instanceof Error ? err.message : String(err));
        
        // Fallback to mock data
        setAttractions([
          {
            id: "1",
            name: "Eiffel Tower",
            location: "Paris, France",
            description: "Iconic iron tower offering city views.",
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop"
          },
          {
            id: "2",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&h=600"
          },
           {
            id: "3",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1470&auto=format&fit=crop"
          },
           {
            id: "4",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1374&auto=format&fit=crop"
          },
           {
            id: "5",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop"
          },
           {
            id: "6",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop"
          },
           {
            id: "7",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1396&auto=format&fit=crop"
          },
           {
            id: "8",
            name: "Grand Canyon",
            location: "Arizona, USA",
            description: "Vast natural canyon with layered red rock.",
            image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop"
          },
          {
            id: "9",
            name: "Taj Mahal",
            location: "Agra, India",
            description: "Iconic white marble mausoleum.",
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1374&auto=format&fit=crop"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [mounted]);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) return null;

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

      {/* Error message if any */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p className="font-semibold">Error loading attractions</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2">Showing fallback data instead.</p>
        </div>
      )}

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
            {attractions.map((attraction, index) => (
              <AttractionCard 
                key={attraction.id} 
                attraction={attraction} 
                index={index}
                attractions={attractions}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Virtual Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-blue-600">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-gray-600">Explore destinations from around the world without leaving your home.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-green-600">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Exploration</h3>
            <p className="text-gray-600">Zoom in on details and discover hidden gems at your own pace.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-purple-600">🎧</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Audio Guides</h3>
            <p className="text-gray-600">Listen to expert commentary and historical context as you explore.</p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Virtual Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnailImage || video.thumbnail || "/placeholder.svg"}
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
        
        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            src={selectedVideo.thumbnail}
            title={selectedVideo.title}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </section>

      {/* Quick Access */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/about">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Info className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">About Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn about our mission, values, and the team behind WANDERWAY.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/map">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Map className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore destinations around the world with our interactive map.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/users">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Activity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See what other travelers are exploring and join the community.
                </p>
              </CardContent>
            </Card>
          </Link>
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
