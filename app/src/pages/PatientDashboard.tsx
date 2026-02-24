import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, LogOut, ShoppingBag, 
  Search, Star, Video, Phone, MessageSquare, 
  ChevronRight, MapPin, Moon, Sun, Stethoscope,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useAppointments } from '@/context/AppointmentContext';
import { useTheme } from '@/context/ThemeContext';
import { mockDoctors } from '@/context/AuthContext';
import { toast } from 'sonner';
import type { Doctor, AppointmentType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getPatientAppointments, bookAppointment } = useAppointments();
  const { toggleTheme, isDark } = useTheme();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('video');
  const [symptoms, setSymptoms] = useState('');

  if (!user || user.role !== 'patient') {
    navigate('/login');
    return null;
  }

  const patient = user;
  const myAppointments = getPatientAppointments(patient.id);

  const filteredDoctors = mockDoctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const success = await bookAppointment({
      patientId: patient.id,
      doctorId: selectedDoctor.id,
      patientName: patient.name,
      doctorName: selectedDoctor.name,
      doctorSpecialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      symptoms: symptoms || undefined,
      consultationFee: selectedDoctor.consultationFee,
    });

    if (success) {
      setShowBookingModal(false);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setSymptoms('');
    }
  };

  const getUpcomingAppointments = () => {
    return myAppointments.filter(apt => 
      apt.status === 'confirmed' || apt.status === 'pending'
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getPastAppointments = () => {
    return myAppointments.filter(apt => 
      apt.status === 'completed' || apt.status === 'cancelled'
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getTypeIcon = (type: AppointmentType) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="AyurWell" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-green-800 dark:text-green-400">AyurWell</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Patient Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/30 rounded-full">
                <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-800 dark:text-green-400">{patient.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="doctors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({getUpcomingAppointments().length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Find Doctors Tab */}
          <TabsContent value="doctors">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {doctor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{doctor.rating}</span>
                          <span className="text-sm text-gray-400">({doctor.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Briefcase className="w-4 h-4" />
                        {doctor.experience} years experience
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        Available {doctor.availability.length} days/week
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Consultation Fee</p>
                          <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{doctor.consultationFee}</p>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setShowBookingModal(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Appointments Tab */}
          <TabsContent value="upcoming">
            {getUpcomingAppointments().length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No upcoming appointments</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Book an appointment with a doctor</p>
                <Button
                  onClick={() => {
                    const tabs = document.querySelector('[value="doctors"]') as HTMLElement;
                    tabs?.click();
                  }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Find Doctors
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {getUpcomingAppointments().map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.doctorName}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.doctorSpecialization}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              {appointment.time}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              {getTypeIcon(appointment.type)}
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-400'
                        }>
                          {appointment.status}
                        </Badge>
                        <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-2">₹{appointment.consultationFee}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            {getPastAppointments().length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No appointment history</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your past appointments will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getPastAppointments().map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 opacity-75"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.doctorName}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.doctorSpecialization}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          appointment.status === 'completed' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                        }>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <DialogTitle>Book Appointment</DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedDoctor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{selectedDoctor.name}</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">{selectedDoctor.specialization}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">₹{selectedDoctor.consultationFee}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Choose a time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Consultation Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['video', 'audio', 'chat'] as AppointmentType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAppointmentType(type)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            appointmentType === type
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          {type === 'video' && <Video className="w-5 h-5" />}
                          {type === 'audio' && <Phone className="w-5 h-5" />}
                          {type === 'chat' && <MessageSquare className="w-5 h-5" />}
                          <span className="text-sm capitalize">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symptoms (Optional)</label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Briefly describe your symptoms..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white min-h-[80px]"
                    />
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirm Booking
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
