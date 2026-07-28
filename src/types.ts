export type ServiceCategory = 
  | 'all'
  | 'haircut'
  | 'color'
  | 'nails'
  | 'facials'
  | 'lashes'
  | 'bridal';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  benefits: string[];
  popular?: boolean;
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  experienceYears: number;
  image: string;
  rating: number;
  reviewsCount: number;
  quote: string;
}

export interface Transformation {
  id: string;
  title: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  stylistName: string;
  clientStory: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientImage?: string;
  rating: number;
  serviceName: string;
  stylistName: string;
  date: string;
  comment: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export interface BookingDetails {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  stylistId: string;
  stylistName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  bookingRef?: string;
}
