'use client';

import { Card, CardContent } from "@/components/ui/card";
import NoSSR from './no-ssr';
import DynamicImage from './dynamic-image';

interface AttractionCardProps {
  attraction: {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
  };
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <NoSSR>
          <DynamicImage
            src={attraction.image || "/placeholder.svg"}
            alt={attraction.name}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </NoSSR>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{attraction.name}</h3>
        <p className="text-sm text-gray-500">{attraction.location}</p>
        <p className="mt-2 text-gray-700">{attraction.description}</p>
      </CardContent>
    </Card>
  );
}


