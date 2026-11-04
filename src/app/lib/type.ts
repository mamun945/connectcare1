export interface JoinedEvent {
  _id?: string;
  eventId?: string;
  title?: string;
  description?: string;
  eventType?: string;
  location?: string;
  thumbnail?: string;
  eventDate?: string;
  joinDate?: string;
  userName?: string;
  userEmail?: string;
  userId?: string;
}


export interface Event {
  _id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  title?: string;
  description?: string;
  eventType?: string;
  thumbnail?: string;
  location?: string;
  eventDate?: string;
}

export type EventCardData = {
  _id: string;
  eventDate: string | Date;
  thumbnail: string;
  title: string;
  eventType: string;
  description: string;
  location: string;
};