
import { useState } from 'react';
import { ArrowLeft, Users, Banknote } from 'lucide-react';
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

interface SeatSelectionProps {
  movie: Movie;
  showtime: string;
  onConfirm: (seats: string[]) => void;
  onBack: () => void;
}

const seatLayout = [
  { row: 'A', seats: 12, price: 15 },
  { row: 'B', seats: 12, price: 15 },
  { row: 'C', seats: 14, price: 18 },
  { row: 'D', seats: 14, price: 18 },
  { row: 'E', seats: 14, price: 18 },
  { row: 'F', seats: 16, price: 22 },
  { row: 'G', seats: 16, price: 22 },
  { row: 'H', seats: 16, price: 22 },
];

const occupiedSeats = ['C5', 'C6', 'F8', 'F9', 'F10', 'G7', 'H12', 'H13'];

export const SeatSelection = ({ movie, showtime, onConfirm, onBack }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      const rowData = seatLayout.find(r => r.row === row);
      return total + (rowData?.price || 0);
    }, 0);
  };

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-500 cursor-not-allowed';
      case 'selected':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 cursor-pointer';
      default:
        return 'bg-gray-600 hover:bg-gray-500 cursor-pointer';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Movies</span>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
              <p className="text-gray-300">{showtime} • Today</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Screen 1</p>
              <p className="text-white font-semibold">Premium Hall</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Screen */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-transparent via-white/20 to-transparent h-2 rounded-full mb-4"></div>
            <p className="text-center text-gray-400 text-sm">SCREEN</p>
          </div>

          {/* Seat Map */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 border border-white/10 mb-8">
            <div className="space-y-4">
              {seatLayout.map((rowData) => (
                <div key={rowData.row} className="flex items-center justify-center space-x-2">
                  <span className="text-white font-bold w-8 text-center">{rowData.row}</span>
                  <div className="flex space-x-2">
                    {Array.from({ length: rowData.seats }, (_, i) => {
                      const seatNumber = i + 1;
                      const seatId = `${rowData.row}${seatNumber}`;
                      const status = getSeatStatus(seatId);
                      
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`w-8 h-8 rounded-md transition-all duration-200 flex items-center justify-center text-xs font-bold text-white ${getSeatColor(status)}`}
                          disabled={status === 'occupied'}
                        >
                          {seatNumber}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-gray-400 text-sm w-16 text-left">${rowData.price}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-8 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <span className="text-gray-300 text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
                <span className="text-gray-300 text-sm">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-300 text-sm">Occupied</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedSeats.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Booking Summary</h3>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedSeats.length} seats</span>
                    </span>
                    <span>Seats: {selectedSeats.join(', ')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-green-400 text-2xl font-bold">
                    <Banknote className="w-6 h-6" />
                    <span>${calculateTotal()}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                </div>
              </div>
              
              <Button
                onClick={() => onConfirm(selectedSeats)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
