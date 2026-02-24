import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, LogOut, Check, X,
  Video, Phone, MessageSquare, Moon, Sun,
  TrendingUp, Users, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useAppointments } from '@/context/AppointmentContext';
import { useTheme } from '@/context/ThemeContext';
import type { Appointment, AppointmentType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getDoctorAppointments, confirmAppointment, cancelAppointment, completeAppointment } = useAppointments();
  const { toggleTheme, isDark } = useTheme();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [prescription, setPrescription] = useState('');

  if (!user || user.role !== 'doctor') {
    navigate('/login');
    return null;
  }

  const doctor = user;
  const myAppointments = getDoctorAppointments(doctor.id);

  const getPendingAppointments = () => {
    return myAppointments.filter(apt => apt.status === 'pending');
  };

  const getConfirmedAppointments = () => {
    return myAppointments.filter(apt => apt.status === 'confirmed');
  };

  const getCompletedAppointments = () => {
    return myAppointments.filter(apt => apt.status === 'completed');
  };

  const getTotalEarnings = () => {
    return myAppointments
      .filter(apt => apt.status === 'completed')
      .reduce((sum, apt) => sum + apt.consultationFee, 0);
  };

  const handleConfirm = (appointmentId: string) => {
    confirmAppointment(appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
  };

  const handleComplete = () => {
    if (selectedAppointment) {
      completeAppointment(selectedAppointment.id, prescription);
      setShowDetailsModal(false);
      setSelectedAppointment(null);
      setPrescription('');
    }
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Doctor Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                <span className="text-amber-600 dark:text-amber-400">👨‍⚕️</span>
                <span className="text-sm text-amber-800 dark:text-amber-400">{doctor.name}</span>
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
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Appointments</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{myAppointments.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{getCompletedAppointments().length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{getPendingAppointments().length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₹{getTotalEarnings()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending">
              Pending ({getPendingAppointments().length})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({getConfirmedAppointments().length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({getCompletedAppointments().length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending">
            {getPendingAppointments().length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No pending appointments</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">New appointment requests will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getPendingAppointments().map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.patientName}</h4>
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
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              Symptoms: {appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-green-700 dark:text-green-400 mr-4">₹{appointment.consultationFee}</p>
                        <Button
                          size="sm"
                          onClick={() => handleConfirm(appointment.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(appointment.id)}
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Confirmed Tab */}
          <TabsContent value="confirmed">
            {getConfirmedAppointments().length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Check className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No confirmed appointments</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Accepted appointments will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getConfirmedAppointments().map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.patientName}</h4>
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
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              Symptoms: {appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-green-700 dark:text-green-400 mr-4">₹{appointment.consultationFee}</p>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetailsModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed">
            {getCompletedAppointments().length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <TrendingUp className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No completed appointments</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your consultation history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getCompletedAppointments().map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 opacity-75"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.patientName}</h4>
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
                          {appointment.prescription && (
                            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                              Prescription added
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{appointment.consultationFee}</p>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400">Completed</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Complete Appointment Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Complete Appointment</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="py-4">
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Patient</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedAppointment.patientName}</p>
                {selectedAppointment.symptoms && (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Symptoms</p>
                    <p className="text-gray-900 dark:text-white">{selectedAppointment.symptoms}</p>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prescription / Notes (Optional)
                </label>
                <textarea
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder="Add prescription, recommendations, or notes..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white min-h-[120px]"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
