import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Appointment, AppointmentStatus } from '@/types';
import { toast } from 'sonner';

interface AppointmentContextType {
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  cancelAppointment: (appointmentId: string) => void;
  confirmAppointment: (appointmentId: string) => void;
  completeAppointment: (appointmentId: string, prescription?: string) => void;
  getPatientAppointments: (patientId: string) => Appointment[];
  getDoctorAppointments: (doctorId: string) => Appointment[];
  getAppointmentById: (id: string) => Appointment | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Mock appointments data
const initialAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'patient_1',
    doctorId: 'doc1',
    patientName: 'Rahul Kumar',
    doctorName: 'Dr. Anjali Sharma',
    doctorSpecialization: 'Ayurvedic Medicine',
    date: '2025-02-25',
    time: '10:00',
    type: 'video',
    status: 'confirmed',
    symptoms: 'Digestive issues, bloating',
    notes: 'First consultation',
    createdAt: new Date('2025-02-20'),
    consultationFee: 800,
  },
  {
    id: 'apt2',
    patientId: 'patient_2',
    doctorId: 'doc1',
    patientName: 'Priya Patel',
    doctorName: 'Dr. Anjali Sharma',
    doctorSpecialization: 'Ayurvedic Medicine',
    date: '2025-02-26',
    time: '14:00',
    type: 'audio',
    status: 'pending',
    symptoms: 'Stress, insomnia',
    createdAt: new Date('2025-02-21'),
    consultationFee: 800,
  },
];

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  useEffect(() => {
    const savedAppointments = localStorage.getItem('ayurwell_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ayurwell_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = useCallback(async (
    appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAppointment: Appointment = {
      ...appointmentData,
      id: 'apt_' + Date.now(),
      status: 'pending',
      createdAt: new Date(),
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    toast.success('Appointment booked successfully!');
    return true;
  }, []);

  const cancelAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as AppointmentStatus } : apt
      )
    );
    toast.info('Appointment cancelled');
  }, []);

  const confirmAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'confirmed' as AppointmentStatus } : apt
      )
    );
    toast.success('Appointment confirmed!');
  }, []);

  const completeAppointment = useCallback((appointmentId: string, prescription?: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId 
          ? { ...apt, status: 'completed' as AppointmentStatus, prescription } 
          : apt
      )
    );
    toast.success('Appointment marked as completed');
  }, []);

  const getPatientAppointments = useCallback((patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId);
  }, [appointments]);

  const getDoctorAppointments = useCallback((doctorId: string) => {
    return appointments.filter(apt => apt.doctorId === doctorId);
  }, [appointments]);

  const getAppointmentById = useCallback((id: string) => {
    return appointments.find(apt => apt.id === id);
  }, [appointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        bookAppointment,
        cancelAppointment,
        confirmAppointment,
        completeAppointment,
        getPatientAppointments,
        getDoctorAppointments,
        getAppointmentById,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
}
