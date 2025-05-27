
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User as UserType, Session } from '@supabase/supabase-js';
import { 
  LogOut, 
  Ticket, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  MessageSquare,
  StarIcon,
  UserIcon
} from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
}

interface Booking {
  id: string;
  booking_id: string;
  movie_title: string;
  movie_genre: string;
  showtime: string;
  seats: string[];
  total_amount: number;
  booking_date: string;
  status: string;
  cinema_location: string;
  created_at: string;
}

interface Feedback {
  id: string;
  booking_id: string;
  rating: number;
  comments: string;
  created_at: string;
}

export const UserProfile = ({ onLogout }: UserProfileProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comments: '', bookingId: '' });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchFeedbacks();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch bookings",
          variant: "destructive",
        });
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error in fetchBookings:', error);
    }
  };

  const fetchFeedbacks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
        toast({
          title: "Error",
          description: "Failed to fetch feedback",
          variant: "destructive",
        });
      } else {
        setFeedbacks(data || []);
      }
    } catch (error) {
      console.error('Error in fetchFeedbacks:', error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      onLogout();
    }
  };

  const submitFeedback = async () => {
    if (!user || !newFeedback.bookingId) return;

    setIsSubmittingFeedback(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          booking_id: newFeedback.bookingId,
          rating: newFeedback.rating,
          comments: newFeedback.comments
        });

      if (error) {
        console.error('Error submitting feedback:', error);
        toast({
          title: "Error",
          description: "Failed to submit feedback",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Feedback submitted successfully!",
        });
        setNewFeedback({ rating: 5, comments: '', bookingId: '' });
        fetchFeedbacks();
      }
    } catch (error) {
      console.error('Error in submitFeedback:', error);
    }

    setIsSubmittingFeedback(false);
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={interactive ? () => onRatingChange?.(star) : undefined}
          />
        ))}
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
            <TabsTrigger value="bookings" className="text-white data-[state=active]:bg-white/20">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-white data-[state=active]:bg-white/20">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              {bookings.length === 0 ? (
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="text-center py-12">
                    <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Bookings Yet</h3>
                    <p className="text-gray-300">Start booking your favorite movies!</p>
                  </CardContent>
                </Card>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{booking.movie_title}</CardTitle>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'destructive'}>
                          {booking.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-300">
                        Booking ID: {booking.booking_id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span>{booking.showtime}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <span>{booking.cinema_location}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="w-4 h-4 text-yellow-400" />
                            <span>Seats: {booking.seats.join(', ')}</span>
                          </div>
                          <div className="text-green-400 font-semibold">
                            Total: ₹{booking.total_amount}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {booking.movie_genre}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            {/* Submit New Feedback */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Submit Feedback
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Share your experience with us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Booking
                  </label>
                  <select
                    value={newFeedback.bookingId}
                    onChange={(e) => setNewFeedback({ ...newFeedback, bookingId: e.target.value })}
                    className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                  >
                    <option value="">Choose a booking</option>
                    {bookings.map((booking) => (
                      <option key={booking.id} value={booking.id} className="text-black">
                        {booking.movie_title} - {booking.booking_id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Rating
                  </label>
                  {renderStars(newFeedback.rating, true, (rating) => 
                    setNewFeedback({ ...newFeedback, rating })
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Comments
                  </label>
                  <Textarea
                    value={newFeedback.comments}
                    onChange={(e) => setNewFeedback({ ...newFeedback, comments: e.target.value })}
                    placeholder="Share your thoughts about the movie and experience..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    rows={4}
                  />
                </div>

                <Button
                  onClick={submitFeedback}
                  disabled={!newFeedback.bookingId || isSubmittingFeedback}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </CardContent>
            </Card>

            {/* Previous Feedback */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Your Previous Feedback</h3>
              {feedbacks.length === 0 ? (
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300">No feedback submitted yet</p>
                  </CardContent>
                </Card>
              ) : (
                feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        {renderStars(feedback.rating)}
                        <span className="text-gray-400 text-sm">
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{feedback.comments}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
