import { OrderItem, SupportCategory, HelpArticle } from '../types';

export const RECENT_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones - Black',
    price: 348.00,
    orderNumber: '114-7294810-8201948',
    orderDate: 'October 11, 2026',
    deliveryStatus: 'Delivered',
    deliveryDate: 'Delivered yesterday, Oct 13',
    carrier: 'Amazon Logistics (AMZL)',
    trackingNumber: 'TBA309481928001',
    image: '/src/assets/images/order_headphones_thumb_1792011007901.jpg',
    deliveryLocation: 'Front Porch / Mailbox',
    canReturnUntil: 'November 13, 2026',
    serialNumber: 'S01-9481028-H'
  },
  {
    id: 'ord-102',
    title: 'Amazon Echo Dot (5th Gen, 2022 release) with bigger vibrant sound & Alexa - Glacier White',
    price: 49.99,
    orderNumber: '114-3829104-5829103',
    orderDate: 'October 8, 2026',
    deliveryStatus: 'Delivered',
    deliveryDate: 'Delivered Friday, Oct 10',
    carrier: 'Amazon Logistics (AMZL)',
    trackingNumber: 'TBA209841829374',
    image: '/src/assets/images/order_smart_speaker_1792011009903.jpg',
    deliveryLocation: 'Resident handed package directly',
    canReturnUntil: 'November 10, 2026',
    serialNumber: 'G091A8092841'
  },
  {
    id: 'ord-103',
    title: 'Kindle Paperwhite (16 GB) – Now with a 6.8" display, adjustable warm light & up to 10 weeks battery',
    price: 149.99,
    orderNumber: '114-9102938-1928374',
    orderDate: 'October 13, 2026',
    deliveryStatus: 'In Transit',
    deliveryDate: 'Arriving tomorrow by 8:00 PM',
    carrier: 'UPS Ground Next Day',
    trackingNumber: '1Z9999999999999999',
    image: '/src/assets/images/order_ereader_tablet_1792011009215.jpg',
    deliveryLocation: 'In transit from Seattle Regional Hub',
    canReturnUntil: 'December 1, 2026',
    serialNumber: 'B08KTZ8249'
  }
];

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: 'delivery-returns',
    title: 'A delivery, order or return',
    description: 'Track packages, start a return, cancel items, or report a delivery issue.',
    iconName: 'PackageCheck',
    popularActions: [
      'Track package in real-time',
      'Return or replace items',
      'Find a missing delivered package',
      'Cancel items or order',
      'Change delivery instructions'
    ]
  },
  {
    id: 'prime-memberships',
    title: 'Prime & Memberships',
    description: 'Manage renewal dates, payment method, shared household benefits, or cancel Prime.',
    iconName: 'Crown',
    popularActions: [
      'View Prime membership status',
      'Update Prime payment method',
      'Share benefits with Family Vault',
      'Pause or end membership',
      'Check Prime delivery guarantees'
    ]
  },
  {
    id: 'payments-giftcards',
    title: 'Payment, charges or gift cards',
    description: 'Investigate unexpected charges, update credit cards, redeem gift cards, or print invoices.',
    iconName: 'CreditCard',
    popularActions: [
      'Look up an unfamiliar charge',
      'Redeem an Amazon Gift Card',
      'Manage wallet payment methods',
      'Download order VAT/tax invoice',
      'Check Amazon Store Card balance'
    ]
  },
  {
    id: 'address-security',
    title: 'Address, security & privacy',
    description: 'Update shipping addresses, enable two-step verification, and report suspicious communications.',
    iconName: 'ShieldCheck',
    popularActions: [
      'Change shipping or billing address',
      'Enable Two-Step Verification (2SV)',
      'Report phishing email or fake SMS',
      'Manage active sign-in sessions',
      'Request account data copy'
    ]
  },
  {
    id: 'digital-devices',
    title: 'Digital services & Device support',
    description: 'Troubleshoot Echo & Alexa, Fire TV, Kindle e-readers, Prime Video, or Audible subscriptions.',
    iconName: 'Cpu',
    popularActions: [
      'Echo & Alexa Wi-Fi troubleshooter',
      'Kindle book sync & download help',
      'Fire TV remote pairing steps',
      'Prime Video playback error fix',
      'Deregister an old Amazon device'
    ]
  },
  {
    id: 'contact-associate',
    title: 'Something else / Contact Us',
    description: 'Connect immediately via 24/7 Live Chat, request an instant phone call back, or submit a case.',
    iconName: 'Headphones',
    popularActions: [
      'Start 24/7 Live Messaging Chat',
      'Request "Call Me Now" phone callback',
      'Submit an email inquiry ticket',
      'Accessibility & disability support',
      'Amazon Business support line'
    ]
  }
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'art-track-package',
    categoryId: 'delivery-returns',
    title: "Where's My Stuff? Track Your Package",
    summary: 'Find the current shipping status, carrier tracking code, and delivery photo proof for your recent orders.',
    readTime: '2 min read',
    lastUpdated: 'Updated 2 days ago',
    steps: [
      'Go to "Your Orders" or use the quick tracking cards at the top of this Help Hub.',
      'Locate the order you wish to monitor and select "Track Package".',
      'Review the carrier tracking timeline: Ordered, Shipped, Out for Delivery, and Delivered.',
      'If AMZL was the carrier and the package is marked as delivered, select "View delivery photo" to confirm the drop-off location.',
      'If the tracking shows delivered but you cannot locate the package, allow 24 hours as carriers occasionally scan parcels prematurely.'
    ],
    tips: [
      'You can sign up for Amazon SMS delivery updates in your Account Communication preferences.',
      'Packages shipped with Amazon Key can be delivered inside your garage or gated gate.'
    ]
  },
  {
    id: 'art-return-items',
    categoryId: 'delivery-returns',
    title: 'How to Return Items You Ordered',
    summary: 'Step-by-step instructions on initiating returns, printing QR codes, and drop-off locations with no box needed.',
    readTime: '3 min read',
    lastUpdated: 'Updated this week',
    steps: [
      'Select "Return or replace items" on any eligible order under Your Orders.',
      'Choose the item(s) you wish to return and select a reason from the dropdown menu.',
      'Select your refund preference: Instant Amazon Gift Card balance or Refund to your original payment method.',
      'Choose your preferred drop-off location: The UPS Store, Kohl’s, Whole Foods Market, or Amazon Locker.',
      'No box or tape is required at most Whole Foods or UPS locations—simply bring your item and show the digital QR return code on your smartphone.'
    ],
    tips: [
      'Returns are typically accepted within 30 days of receipt.',
      'Extended holiday returns are automatically applied to items purchased between November 1 and December 31.'
    ]
  },
  {
    id: 'art-refund-timelines',
    categoryId: 'payments-giftcards',
    title: 'Refund Timelines & Payment Processing Details',
    summary: 'Learn when and how your refund will be issued depending on the payment method used.',
    readTime: '2 min read',
    lastUpdated: 'Updated 5 days ago',
    steps: [
      'Amazon Gift Card balance: Available within 2 to 3 hours after the carrier scans your return drop-off.',
      'Credit or Debit card: 3 to 5 business days after your returned item is received and inspected at our fulfillment center.',
      'Checking account (ACH): Up to 10 business days depending on your financial institution.',
      'Prepaid credit card: Up to 30 business days depending on the card issuer policies.',
      'You can check your current refund approval status at any time in "Your Payments" > "Transactions".'
    ],
    tips: [
      'If you have not received your credit card refund after 7 business days from our confirmation email, contact your card issuer with the ARN (Acquirer Reference Number) provided in your receipt.'
    ]
  },
  {
    id: 'art-missing-package',
    categoryId: 'delivery-returns',
    title: 'Find a Missing Package That Shows as Delivered',
    summary: 'Steps to take if your tracking status shows "Delivered" but your parcel cannot be found.',
    readTime: '3 min read',
    lastUpdated: 'Updated yesterday',
    steps: [
      'Verify the delivery address in "Your Orders" to ensure it was routed to your current residence.',
      'Look around the delivery location: porches, bushes, back doors, side entrances, garage perimeter, and mailrooms.',
      'Check if someone else accepted the delivery on your behalf (family members, roommates, or neighbors).',
      'Check your mailbox or parcel locker: some packages are delivered via USPS or local courier parcel lockers.',
      'Wait 36 hours: In rare instances, carrier handheld scanners mark packages as delivered up to 36 hours before physical arrival.',
      'If 36 hours have elapsed, select "Problem with Order" in your order card to receive an immediate replacement or full refund.'
    ]
  },
  {
    id: 'art-manage-prime',
    categoryId: 'prime-memberships',
    title: 'Manage Your Amazon Prime Membership & Benefits',
    summary: 'How to review renewal dates, share household benefits, pause, or cancel Prime.',
    readTime: '2 min read',
    lastUpdated: 'Updated last week',
    steps: [
      'Go to "Your Prime Membership" from the main menu or click the Prime tile on this page.',
      'Review your current billing plan ($14.99/month or $139/year) and upcoming renewal date.',
      'To update your billing card, select "Manage Membership" > "Update your payment method".',
      'To share shipping and digital perks, select "Amazon Household" to invite one adult and up to four teens.',
      'To cancel, click "End Membership and Benefits". If you haven’t utilized any Prime benefits during the current period, you are entitled to a full prorated refund.'
    ]
  },
  {
    id: 'art-phishing-scams',
    categoryId: 'address-security',
    title: 'Identify Whether an Email, Phone Call, or SMS is from Amazon',
    summary: 'Protect your account against phishing attempts, fake order confirmations, and suspicious caller ID spoofing.',
    readTime: '4 min read',
    lastUpdated: 'Updated 3 days ago',
    steps: [
      'Amazon emails always arrive from an address ending in "@amazon.com" (e.g. order-update@amazon.com, auto-confirm@amazon.com).',
      'We will NEVER ask you to purchase gift cards, wire funds, or download remote control software (like AnyDesk or TeamViewer).',
      'We will NEVER call you unsolicited demanding immediate payment to unlock an account or cancel an unauthorized order.',
      'Legitimate order communications will always appear in your official Amazon Message Center inside your account.',
      'To report a suspicious email or SMS, forward it directly to stop-spoofing@amazon.com.'
    ]
  },
  {
    id: 'art-device-troubleshoot',
    categoryId: 'digital-devices',
    title: 'Troubleshoot Echo, Alexa, and Kindle Devices',
    summary: 'Quick guide to resolving connection drops, frozen screens, and unresponsive voice prompts.',
    readTime: '3 min read',
    lastUpdated: 'Updated 4 days ago',
    steps: [
      'Power cycle the device: Unplug your Echo or Fire TV for 30 seconds, then plug it back in.',
      'Restart your home Wi-Fi modem and router to clear cached IP lease conflicts.',
      'Check Echo LED light rings: Spinning blue indicates processing; solid orange means setup mode; pulsing yellow indicates unread notifications.',
      'For Kindle e-readers: Hold the physical power button down for a full 40 seconds to trigger a hard reset.',
      'If issues persist, use our interactive Device Diagnostic tool below to test your hardware.'
    ]
  }
];

export const POPULAR_SEARCH_SUGGESTIONS = [
  'Track package',
  'Return an item',
  'Refund status',
  'Cancel Prime membership',
  'Missing package marked delivered',
  'Change delivery address',
  'Download invoice PDF',
  'Report damaged item',
  'Echo Wi-Fi troubleshooting'
];
