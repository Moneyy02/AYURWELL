// Dosha Types
export type DoshaType = 'Vata' | 'Pitta' | 'Kapha';

export interface DoshaScores {
  Vata: number;
  Pitta: number;
  Kapha: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    dosha: DoshaType;
  }[];
}

export interface QuizResult {
  dominantDosha: DoshaType;
  percentages: DoshaScores;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  benefits: string[];
  recommendedFor: DoshaType[];
}

export interface CartItem extends Product {
  quantity: number;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

// Dosha Details
export interface DoshaDetails {
  color: string;
  borderColor: string;
  bgColor: string;
  image: string;
  elements: string;
  content: {
    Qualities: string;
    'Balanced State': string;
    'Imbalanced State': string;
    'Balancing Tips': string;
  };
  description: string;
  lifestyle: string[];
  products: string[];
}

// Chat Types
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// User Types - Enhanced for Doctor/Patient
export type UserRole = 'patient' | 'doctor';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Patient extends BaseUser {
  role: 'patient';
  doshaProfile?: QuizResult;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string[];
}

export interface Doctor extends BaseUser {
  role: 'doctor';
  specialization: string;
  experience: number;
  qualifications: string[];
  about: string;
  consultationFee: number;
  availability: AvailabilitySlot[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export type User = Patient | Doctor;

// Appointment Types
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type AppointmentType = 'video' | 'audio' | 'chat';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  symptoms?: string;
  notes?: string;
  prescription?: string;
  createdAt: Date;
  consultationFee: number;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';
