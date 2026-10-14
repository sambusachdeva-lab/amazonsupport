export interface OrderItem {
  id: string;
  title: string;
  price: number;
  orderNumber: string;
  orderDate: string;
  deliveryStatus: 'Delivered' | 'In Transit' | 'Out for Delivery' | 'Return Initiated' | 'Refunded';
  deliveryDate: string;
  carrier: string;
  trackingNumber: string;
  image: string;
  deliveryLocation?: string;
  canReturnUntil: string;
  serialNumber?: string;
}

export interface SupportCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  popularActions: string[];
}

export interface HelpArticle {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  readTime: string;
  lastUpdated: string;
  steps: string[];
  tips?: string[];
  relatedArticleIds?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'agent' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  actionLink?: string;
  actionText?: string;
}

export interface ReturnRequest {
  orderId: string;
  reason: string;
  refundMethod: 'gift_card' | 'original_payment';
  dropoffLocation: string;
  returnId: string;
  status: 'Approved' | 'Label Printed' | 'Received' | 'Refund Completed';
}
