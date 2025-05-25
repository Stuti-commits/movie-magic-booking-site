
import { useState } from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
  rating: number;
  genre: string;
  duration: string;
  image: string;
  showtimes: string[];
  description: string;
}

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie, showtime: string) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 fill-current text-yellow-900" />
          <span className="text-yellow-900 font-bold text-sm">{movie.rating}</span>
        </div>
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-2">{movie.title}</h3>
          <div className="flex items-center space-x-4 text-gray-300 text-sm">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration}</span>
            </span>
            <span>{movie.genre}</span>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-6">
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{movie.description}</p>
        
        {/* Showtimes */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">Today's Showtimes</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {movie.showtimes.map((time) => (
              <Button
                key={time}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
                onClick={() => onSelect(movie, time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowDetails(!showDetails)}
        >
          Select Showtime
        </Button>
      </div>
    </div>
  );
};
