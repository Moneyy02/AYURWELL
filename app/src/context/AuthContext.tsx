import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, Patient, Doctor, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signupPatient: (data: PatientSignupData) => Promise<boolean>;
  signupDoctor: (data: DoctorSignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

interface PatientSignupData {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
}

interface DoctorSignupData {
  name: string;
  email: string;
  password: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  about: string;
  consultationFee: number;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock doctors data
const mockDoctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Anjali Sharma',
    email: 'anjali.sharma@ayurwell.com',
    role: 'doctor',
    specialization: 'Ayurvedic Medicine',
    experience: 15,
    qualifications: ['BAMS', 'MD (Ayurveda)'],
    about: 'Specialist in Panchakarma therapy and chronic disease management through Ayurveda.',
    consultationFee: 800,
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '17:00' },
    ],
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    avatar: '/images/doctor1.png',
    phone: '+91 98765 43210',
    createdAt: new Date('2020-01-15'),
  },
  {
    id: 'doc2',
    name: 'Dr. Rajesh Patel',
    email: 'rajesh.patel@ayurwell.com',
    role: 'doctor',
    specialization: 'Panchakarma Specialist',
    experience: 20,
    qualifications: ['BAMS', 'PhD (Panchakarma)'],
    about: 'Expert in detoxification therapies and rejuvenation treatments.',
    consultationFee: 1000,
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00' },
      { day: 'Saturday', startTime: '10:00', endTime: '14:00' },
    ],
    rating: 4.9,
    reviewCount: 203,
    isVerified: true,
    avatar: '/images/doctor2.png',
    phone: '+91 98765 43211',
    createdAt: new Date('2019-06-20'),
  },
  {
    id: 'doc3',
    name: 'Dr. Priya Gupta',
    email: 'priya.gupta@ayurwell.com',
    role: 'doctor',
    specialization: 'Women\'s Health',
    experience: 12,
    qualifications: ['BAMS', 'Diploma in Gynecology'],
    about: 'Focused on women\'s health issues, hormonal balance, and prenatal care through Ayurveda.',
    consultationFee: 700,
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '16:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '16:00' },
      { day: 'Friday', startTime: '10:00', endTime: '16:00' },
    ],
    rating: 4.7,
    reviewCount: 89,
    isVerified: true,
    avatar: '/images/doctor3.png',
    phone: '+91 98765 43212',
    createdAt: new Date('2021-03-10'),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('ayurwell_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if it's a mock doctor
    if (role === 'doctor') {
      const doctor = mockDoctors.find(d => d.email === email);
      if (doctor) {
        setUser(doctor);
        localStorage.setItem('ayurwell_user', JSON.stringify(doctor));
        toast.success(`Welcome back, ${doctor.name}!`);
        setIsLoading(false);
        return true;
      }
      // For demo, allow any doctor login with mock data
      if (email.includes('doctor') || email.includes('dr.')) {
        const mockDoctor = mockDoctors[0];
        setUser(mockDoctor);
        localStorage.setItem('ayurwell_user', JSON.stringify(mockDoctor));
        toast.success(`Welcome back, ${mockDoctor.name}!`);
        setIsLoading(false);
        return true;
      }
    }
    
    // Create patient user
    const mockUser: Patient = {
      id: 'patient_' + Date.now(),
      name: email.split('@')[0],
      email,
      role: 'patient',
      createdAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('ayurwell_user', JSON.stringify(mockUser));
    toast.success('Welcome back!');
    setIsLoading(false);
    return true;
  }, []);

  const signupPatient = useCallback(async (data: PatientSignupData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPatient: Patient = {
      id: 'patient_' + Date.now(),
      name: data.name,
      email: data.email,
      role: 'patient',
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      createdAt: new Date(),
    };
    
    setUser(newPatient);
    localStorage.setItem('ayurwell_user', JSON.stringify(newPatient));
    toast.success('Account created successfully!');
    setIsLoading(false);
    return true;
  }, []);

  const signupDoctor = useCallback(async (data: DoctorSignupData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDoctor: Doctor = {
      id: 'doctor_' + Date.now(),
      name: data.name,
      email: data.email,
      role: 'doctor',
      specialization: data.specialization,
      experience: data.experience,
      qualifications: data.qualifications,
      about: data.about,
      consultationFee: data.consultationFee,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' },
      ],
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      phone: data.phone,
      createdAt: new Date(),
    };
    
    setUser(newDoctor);
    localStorage.setItem('ayurwell_user', JSON.stringify(newDoctor));
    toast.success('Doctor account created! Pending verification.');
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ayurwell_user');
    toast.info('Logged out successfully');
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('ayurwell_user', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signupPatient,
        signupDoctor,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { mockDoctors };
