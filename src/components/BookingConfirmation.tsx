
import { CheckCircle, Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookingConfirmationProps {
  movie: {
    title: string;
    genre: string;
    duration: string;
    image: string;
  };
  showtime: string;
  seats: string[];
  onNewBooking: () => void;
  user: any;
}

export const BookingConfirmation = ({ 
  movie, 
  showtime, 
  seats, 
  onNewBooking 
}: BookingConfirmationProps) => {
  const totalAmount = seats.length * 250; // ₹250 per seat
  const bookingId = `BK${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Booking Confirmed!</CardTitle>
          <CardDescription className="text-gray-300">
            Your movie tickets have been successfully booked
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Booking Details</h3>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Confirmed
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Ticket className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Booking ID</p>
                    <p className="text-white font-semibold">{bookingId}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Date</p>
                    <p className="text-white font-semibold">Today</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Show Time</p>
                    <p className="text-white font-semibold">{showtime}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Cinema</p>
                    <p className="text-white font-semibold">PVR Forum Mall, Bangalore</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Seats</p>
                    <p className="text-white font-semibold">{seats.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">₹</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Total Amount</p>
                    <p className="text-white font-semibold">₹{totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Movie Details */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Movie Details</h3>
            <div className="flex items-start space-x-4">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2">{movie.title}</h4>
                <p className="text-gray-300 mb-1">{movie.genre}</p>
                <p className="text-gray-400 text-sm">{movie.duration}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onNewBooking}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Book Another Movie
            </Button>
          </div>
          
          {/* Important Notes */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-400 font-semibold mb-2">Important Notes:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Please arrive at least 15 minutes before the show time</li>
              <li>• Carry a valid ID proof for verification</li>
              <li>• Outside food and beverages are not allowed</li>
              <li>• This booking is non-refundable and non-transferable</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
