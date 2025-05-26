
import { useState } from 'react';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';
import { MovieCard } from '@/components/MovieCard';
import { SeatSelection } from '@/components/SeatSelection';
import { BookingConfirmation } from '@/components/BookingConfirmation';

const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    rating: 9.0,
    genre: "Action, Crime, Drama",
    duration: "152 min",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    showtimes: ["14:30", "17:00", "19:30", "22:00"],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 2,
    title: "Inception",
    rating: 8.8,
    genre: "Action, Sci-Fi, Thriller",
    duration: "148 min",
    image: "https://images.unsplash.com/photo-1489599558842-6e04ca377d7e?w=400&h=600&fit=crop",
    showtimes: ["15:00", "18:00", "21:00"],
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 8.6,
    genre: "Adventure, Drama, Sci-Fi",
    duration: "169 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    showtimes: ["13:30", "16:45", "20:15"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: 8.9,
    genre: "Crime, Drama",
    duration: "154 min",
    image: "https://images.unsplash.com/photo-1489599558842-6e04ca377d7e?w=400&h=600&fit=crop",
    showtimes: ["14:00", "17:30", "21:30"],
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  }
];

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<typeof movies[0] | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'movies' | 'seats' | 'confirmation'>('movies');

  const handleMovieSelect = (movie: typeof movies[0], showtime: string) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setCurrentStep('seats');
  };

  const handleSeatConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    setCurrentStep('confirmation');
  };

  const handleBackToMovies = () => {
    setCurrentStep('movies');
    setSelectedMovie(null);
    setSelectedShowtime("");
    setSelectedSeats([]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'seats':
        return selectedMovie ? (
          <SeatSelection
            movie={selectedMovie}
            showtime={selectedShowtime}
            onConfirm={handleSeatConfirm}
            onBack={() => setCurrentStep('movies')}
          />
        ) : null;
      case 'confirmation':
        return selectedMovie ? (
          <BookingConfirmation
            movie={selectedMovie}
            showtime={selectedShowtime}
            seats={selectedSeats}
            onNewBooking={handleBackToMovies}
          />
        ) : null;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-xl">🎬</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">CinemaMax</h1>
                  </div>
                  <div className="flex items-center space-x-6 text-gray-300">
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>PVR Forum Mall, Bangalore</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Today</span>
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-2xl">
                  <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
                    Experience Cinema Like Never Before
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Book your favorite movies with premium seats and immersive sound. 
                    Discover the magic of cinema in our state-of-the-art theaters in Bangalore.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <div className="flex items-center space-x-2 text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-semibold">Premium Experience</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <div className="flex items-center space-x-2 text-green-400">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">Easy Booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Movies Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold text-white mb-4">Now Showing</h3>
                  <p className="text-gray-400 text-lg">Choose from our selection of blockbuster movies</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={handleMovieSelect}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-black/20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">Premium Screens</h4>
                    <p className="text-gray-400">State-of-the-art projection and sound systems for the ultimate viewing experience.</p>
                  </div>
                  
                  <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">🪑</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">Luxury Seating</h4>
                    <p className="text-gray-400">Comfortable reclining seats with ample legroom and premium amenities.</p>
                  </div>
                  
                  <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">🍿</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">Gourmet Concessions</h4>
                    <p className="text-gray-400">Fresh popcorn, premium snacks, and beverages delivered to your seat.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return renderCurrentStep();
};

export default Index;
