
import { CheckCircle, Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';
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

interface BookingConfirmationProps {
  movie: Movie;
  showtime: string;
  seats: string[];
  onNewBooking: () => void;
}

export const BookingConfirmation = ({ movie, showtime, seats, onNewBooking }: BookingConfirmationProps) => {
  const bookingId = `BK${Date.now().toString().slice(-6)}`;
  
  // Calculate total based on seat pricing
  const seatPricing = {
    'A': 250, 'B': 250,
    'C': 300, 'D': 300, 'E': 300,
    'F': 350, 'G': 350, 'H': 350
  };
  
  const totalAmount = seats.reduce((total, seat) => {
    const row = seat[0] as keyof typeof seatPricing;
    return total + (seatPricing[row] || 250);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-300 text-lg">Your tickets have been successfully booked</p>
        </div>

        {/* Ticket */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden mb-8">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-red-500 p-6 text-black">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="text-black/80">{movie.genre}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Booking ID</p>
                <p className="text-xl font-bold">{bookingId}</p>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">
            {/* Movie Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white font-medium">Today</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Showtime</p>
                    <p className="text-white font-medium">{showtime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Cinema</p>
                    <p className="text-white font-medium">PVR Forum Mall - Screen 1, Bangalore</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Seats</p>
                    <p className="text-white font-medium">{seats.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Ticket className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Tickets</p>
                    <p className="text-white font-medium">{seats.length} x Adult</p>
                  </div>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                  <p className="text-sm text-green-400 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-green-400">₹{totalAmount}</p>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center py-6 border-t border-white/10">
              <div className="inline-block bg-white p-4 rounded-lg mb-4">
                <div className="w-32 h-32 bg-black rounded grid grid-cols-8 gap-1 p-2">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm">Show this QR code at the cinema entrance</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onNewBooking}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg transition-all duration-300"
          >
            Book Another Movie
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10 py-4 text-lg"
            onClick={() => window.print()}
          >
            Download Ticket
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-bold text-white mb-3">Important Information</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Please arrive 15 minutes before showtime</li>
            <li>• Present this ticket and a valid ID at the entrance</li>
            <li>• No outside food or beverages allowed</li>
            <li>• Tickets are non-refundable and non-transferable</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
