import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  User, 
  Bot, 
  Headphones, 
  ArrowRight,
  PhoneForwarded,
  PhoneOff
} from 'lucide-react';
import { OrderItem } from '../types';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  preselectedOrder?: OrderItem | null;
}

interface ChatMessageItem {
  id: string;
  sender: 'bot' | 'agent' | 'user';
  text: string;
  time: string;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
  orders,
  preselectedOrder
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'email'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "Hello Alex, I'm the Amazon Customer Service Assistant. I can help you track an order, initiate a return, or connect you with a live specialist. What would you like to do?",
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Call me now state
  const [phoneNumber, setPhoneNumber] = useState('+1 (206) 555-0199');
  const [callTopic, setCallTopic] = useState('An order I placed recently');
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [callSeconds, setCallSeconds] = useState(25);

  // Email inquiry state
  const [emailSubject, setEmailSubject] = useState('Question about recent delivery or charge');
  const [emailOrder, setEmailOrder] = useState(orders[0]?.orderNumber || '');
  const [emailBody, setEmailBody] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle call timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'calling' && callSeconds > 0) {
      timer = setTimeout(() => {
        setCallSeconds((prev) => prev - 1);
      }, 1000);
    } else if (callState === 'calling' && callSeconds === 0) {
      setCallState('connected');
    }
    return () => clearTimeout(timer);
  }, [callState, callSeconds]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessageItem = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulated response
    setTimeout(() => {
      let botResponse = "I can certainly assist with that. Let me look up your account details.";
      const lower = text.toLowerCase();

      if (lower.includes('track') || lower.includes('where is')) {
        botResponse = `Looking up your recent orders... Your Sony WH-1000XM5 headphones were delivered yesterday via AMZL (TBA309481928001). Your Kindle Paperwhite is on schedule to arrive tomorrow by 8:00 PM. Would you like me to open the tracking map for either item?`;
      } else if (lower.includes('return') || lower.includes('refund')) {
        botResponse = "All 3 of your recent purchases are within the return window. You can return items for free at any UPS Store or Whole Foods Market with no box or label required. Would you like me to initiate a return now?";
      } else if (lower.includes('prime') || lower.includes('cancel')) {
        botResponse = "Your Prime membership is currently active and set to renew on Dec 14, 2026. If you prefer, I can help you pause benefits or adjust your auto-renewal settings without losing your saved photos or video watchlist.";
      } else if (lower.includes('agent') || lower.includes('human') || lower.includes('person')) {
        botResponse = "I'm transferring you to a dedicated Amazon Customer Support Associate right now. Estimated wait time is under 1 minute. Associate Sarah J. has joined the session.";
      } else {
        botResponse = `Thank you for the details. I have logged this inquiry under case #CS-${Math.floor(100000 + Math.random() * 900000)}. Is there a specific order or topic you'd like me to resolve right now?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: lower.includes('agent') ? 'agent' : 'bot',
          text: botResponse,
          time: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleStartCall = () => {
    setCallState('calling');
    setCallSeconds(15);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(`AMZ-${Math.floor(100000 + Math.random() * 900000)}`);
    setEmailSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-300 my-6 flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#131921] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#232f3e] flex items-center justify-center text-[#febd69]">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Contact Amazon Customer Service</h2>
              <p className="text-xs text-slate-400">24/7 dedicated support for Alex</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channels Tab Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'chat'
                ? 'border-[#f08804] text-[#0f1111] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#007185]" />
            <span>Live Chat</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">Instant</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'call'
                ? 'border-[#f08804] text-[#0f1111] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-[#c7511f]" />
            <span>Call Me Now</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.2 rounded">~1 min wait</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'email'
                ? 'border-[#f08804] text-[#0f1111] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-slate-600" />
            <span>Inquiry Ticket</span>
          </button>
        </div>

        {/* Channel 1: Live Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
            {/* Chat Messages scroll area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-[#232f3e] text-white flex items-center justify-center shrink-0 mt-0.5">
                        {msg.sender === 'agent' ? (
                          <User className="w-4 h-4 text-[#febd69]" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}

                    <div className={`max-w-[80%] rounded-lg p-3 text-xs shadow-xs ${
                      isUser 
                        ? 'bg-[#131921] text-white rounded-tr-none' 
                        : msg.sender === 'agent'
                          ? 'bg-amber-50/90 border border-amber-200 text-slate-900 rounded-tl-none'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                    }`}>
                      {!isUser && (
                        <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center justify-between gap-2">
                          <span>{msg.sender === 'agent' ? 'Associate Sarah J.' : 'Amazon Assistant'}</span>
                          <span>{msg.time}</span>
                        </div>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-full bg-[#febd69] text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-10">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>Amazon Assistant is researching...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick response suggestions */}
            <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs">
              <span className="text-slate-400 text-[11px] shrink-0 pl-1">Ask:</span>
              {[
                'Where is my headphones order?',
                'Start a return',
                'Question about Prime charge',
                'Speak to human associate'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition border border-slate-200 shrink-0 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your question or request..."
                className="flex-1 text-xs py-2 px-3 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#f08804]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-2 text-xs amazon-btn-primary flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Channel 2: Call Me Now */}
        {activeTab === 'call' && (
          <div className="flex-1 p-6 overflow-y-auto">
            {callState === 'idle' && (
              <div className="max-w-md mx-auto space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-50 text-[#c7511f] rounded-full flex items-center justify-center mx-auto mb-2">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">We will call your phone right now</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    An Amazon customer support associate will phone you directly. Average wait time is currently under 1 minute.
                  </p>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Phone Number:
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded font-mono font-medium focus:ring-1 focus:ring-[#f08804] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reason for call:
                    </label>
                    <select
                      value={callTopic}
                      onChange={(e) => setCallTopic(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-[#f08804] focus:outline-none"
                    >
                      <option>An order I placed recently</option>
                      <option>Returns, refunds, or replacement item</option>
                      <option>Prime membership & digital subscriptions</option>
                      <option>Unauthorized charge or gift card issue</option>
                      <option>Device or digital content assistance</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleStartCall}
                  className="w-full py-3 text-sm amazon-btn-primary font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <PhoneForwarded className="w-4 h-4 text-slate-900" />
                  <span>Call me now</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Free call within the US and Canada. International rates may apply if using non-US cellular roaming.
                </p>
              </div>
            )}

            {callState === 'calling' && (
              <div className="max-w-md mx-auto text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-amber-100 text-[#f08804] rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Calling your phone now...</h3>
                <p className="text-xs text-slate-600">
                  Dialing <span className="font-mono font-bold text-slate-900">{phoneNumber}</span>. Please pick up when your phone rings.
                </p>
                <div className="text-2xl font-bold font-mono text-[#007185] tabular-nums">
                  Connecting in {callSeconds}s
                </div>
                <button
                  onClick={() => setCallState('idle')}
                  className="px-4 py-2 text-xs amazon-btn-secondary text-slate-600 hover:text-red-600 flex items-center gap-1 mx-auto"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  <span>Cancel callback</span>
                </button>
              </div>
            )}

            {callState === 'connected' && (
              <div className="max-w-md mx-auto text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Call Connected</h3>
                <p className="text-xs text-slate-600">
                  You are now connected with Amazon Support Specialist Michael in Seattle, WA.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-500 font-mono">
                  Call Reference: #CALL-849201 · Topic: {callTopic}
                </div>
                <button
                  onClick={() => setCallState('idle')}
                  className="px-5 py-2 text-xs amazon-btn-secondary"
                >
                  End Call / Reset
                </button>
              </div>
            )}
          </div>
        )}

        {/* Channel 3: Email Ticket */}
        {activeTab === 'email' && (
          <div className="flex-1 p-6 overflow-y-auto">
            {!emailSent ? (
              <form onSubmit={handleSendEmail} className="max-w-lg mx-auto space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Submit an Inquiry to Customer Service</h3>
                  <p className="text-xs text-slate-500">We typically reply within 6 hours to alex@example.com.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject:</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#f08804] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Related Order:</label>
                  <select
                    value={emailOrder}
                    onChange={(e) => setEmailOrder(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#f08804] focus:outline-none"
                  >
                    {orders.map((ord) => (
                      <option key={ord.id} value={ord.orderNumber}>
                        {ord.title.substring(0, 45)}... (#{ord.orderNumber})
                      </option>
                    ))}
                    <option value="none">General / Not related to a specific order</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message:</label>
                  <textarea
                    rows={4}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    required
                    placeholder="Describe your issue with as much detail as possible..."
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#f08804] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs amazon-btn-primary font-bold cursor-pointer"
                >
                  Send Inquiry Ticket
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Inquiry Received</h3>
                <p className="text-xs text-slate-600">
                  Your support ticket <span className="font-mono font-bold text-slate-900">{ticketId}</span> has been logged. An associate will respond to alex@example.com within 6 hours.
                </p>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmailBody('');
                    onClose();
                  }}
                  className="px-5 py-2 text-xs amazon-btn-primary"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
