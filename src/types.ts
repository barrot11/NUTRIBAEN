export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  price?: string;
  duration: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
}

export interface BookingDetails {
  date: Date | null;
  time: string;
  visitType: "primera" | "seguiment";
  modality: "presencial" | "online";
  name: string;
  email: string;
  phone: string;
  notes: string;
}
