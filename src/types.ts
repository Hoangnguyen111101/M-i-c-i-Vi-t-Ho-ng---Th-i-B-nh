export interface WeddingEvent {
  id: string;
  title: string; // e.g. "Lễ Vu Quy", "Lễ Thành Hôn", "Tiệc Cưới"
  date: string; // YYYY-MM-DD
  time: string; // e.g. "11:00"
  lunarDate: string; // e.g. "Ngày 18 tháng 10 năm Giáp Thìn"
  venueName: string; // e.g. "Trung tâm Hội nghị Tiệc cưới White Palace"
  address: string; // e.g. "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP.HCM"
  mapUrl: string; // Google maps URL
  note?: string;
}

export interface StoryTimelineItem {
  id: string;
  yearOrDate: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface BankAccount {
  id: string;
  ownerType: 'groom' | 'bride';
  ownerName: string;
  bankName: string;
  bankCode: string; // e.g. 'MB', 'VCB', 'TCB' for VietQR
  accountNumber: string;
  qrUrl?: string; // Optional custom QR image or auto-generated
}

export interface WeddingData {
  groom: {
    fullName: string;
    shortName: string;
    avatar: string;
    fatherName: string;
    motherName: string;
    origin: string; // e.g. "Trưởng nam / Thứ nam"
    bio: string;
  };
  bride: {
    fullName: string;
    shortName: string;
    avatar: string;
    fatherName: string;
    motherName: string;
    origin: string; // e.g. "Ái nữ / Trưởng nữ"
    bio: string;
  };
  weddingDate: string; // ISO date format YYYY-MM-DDTHH:mm:ss for countdown
  invitationMessage: string;
  sweetQuote: string;
  events: WeddingEvent[];
  loveStories: StoryTimelineItem[];
  photos: string[];
  bankAccounts: BankAccount[];
  musicTitle: string;
  musicUrl: string;
  musicStartTime?: number;
  doorBowImage?: string; // Optional custom real photo of the bow (local file or base64 data url)
}

export interface GuestWish {
  id: string;
  senderName: string;
  relationship: string; // Bạn cô dâu, Bạn chú rể, Đồng nghiệp, Người thân...
  content: string;
  createdAt: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  phone: string;
  attending: 'yes' | 'no';
  attendingEvent: string;
  guestCount: number;
  dietaryNote?: string;
  message?: string;
  createdAt: string;
}
