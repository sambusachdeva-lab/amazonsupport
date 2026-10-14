import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  RotateCcw, 
  AlertTriangle, 
  Camera, 
  QrCode, 
  ArrowRight, 
  Printer, 
  Check, 
  Clock,
  ShieldCheck,
  Building
} from 'lucide-react';
import { OrderItem } from '../types';

interface OrderResolutionModalProps {
  order: OrderItem | null;
  initialTab?: 'track' | 'return' | 'problem';
  onClose: () => void;
  onReturnCompleted: (orderId: string) => void;
}

export const OrderResolutionModal: React.FC<OrderResolutionModalProps> = ({
  order,
  initialTab = 'track',
  onClose,
  onReturnCompleted
}) => {
  const [activeTab, setActiveTab] = useState<'track' | 'return' | 'problem'>(initialTab);
  
  // Return Flow States
  const [returnStep, setReturnStep] = useState<1 | 2 | 3 | 4>(1);
  const [returnReason, setReturnReason] = useState('Item defective or doesn\'t work as expected');
  const [returnComment, setReturnComment] = useState('');
  const [refundMethod, setRefundMethod] = useState<'gift_card' | 'original'>('gift_card');
  const [dropoffChoice, setDropoffChoice] = useState('ups_store');
  const [returnAuthId, setReturnAuthId] = useState('');

  // Delivery Instructions State
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsText, setInstructionsText] = useState('Please leave behind large flower pot on front porch.');
  const [instructionsSaved, setInstructionsSaved] = useState(false);

  // Delivery photo modal
  const [showPhoto, setShowPhoto] = useState(false);

  // Problem flow state
  const [problemSubmitted, setProblemSubmitted] = useState(false);
  const [problemType, setProblemType] = useState('Damaged packaging or item');

  if (!order) return null;

  const handleStartReturn = () => {
    const generatedId = `RMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setReturnAuthId(generatedId);
    setReturnStep(4);
    onReturnCompleted(order.id);
  };

  const handleSaveInstructions = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructionsSaved(true);
    setTimeout(() => {
      setShowInstructions(false);
      setInstructionsSaved(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-300 my-8">
        {/* Header */}
        <div className="bg-[#131921] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#232f3e] flex items-center justify-center text-[#febd69]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Order Resolution Center</h2>
              <p className="text-xs text-slate-400 font-mono">Order #{order.orderNumber}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product mini summary bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={order.image} 
              alt={order.title} 
              className="w-12 h-12 object-contain bg-white rounded border border-slate-200 p-1 shrink-0" 
            />
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">{order.title}</h4>
              <div className="text-[11px] text-slate-500">
                Purchased on {order.orderDate} · <span className="font-mono">${order.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
              order.deliveryStatus === 'Delivered' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              {order.deliveryStatus}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('track')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'track'
                ? 'border-[#f08804] text-[#0f1111]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Track Shipment
          </button>
          <button
            onClick={() => {
              setActiveTab('return');
              if (returnStep === 4) setReturnStep(1);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'return'
                ? 'border-[#f08804] text-[#0f1111]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Return or Replace
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'problem'
                ? 'border-[#f08804] text-[#0f1111]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Problem with Order
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* TAB 1: TRACKING */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <div className="bg-[#f0f8ff] border border-[#bee3f8] rounded-lg p-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {order.deliveryStatus === 'Delivered' 
                      ? 'Package was delivered to your residence' 
                      : 'Package is in transit to your area'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Carrier: <span className="font-semibold text-slate-800">{order.carrier}</span> · Tracking ID: <span className="font-mono text-slate-800 font-semibold">{order.trackingNumber}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Location: {order.deliveryLocation}
                  </p>
                </div>

                {order.deliveryStatus === 'Delivered' && (
                  <button
                    onClick={() => setShowPhoto(true)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs amazon-btn-secondary cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-700" />
                    <span>View delivery photo</span>
                  </button>
                )}
              </div>

              {/* Visual Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Tracking Progress
                </h4>

                <div className="relative pl-6 border-l-2 border-emerald-500 space-y-6 ml-3">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-200"></span>
                    <div className="text-xs font-bold text-slate-900">
                      {order.deliveryStatus === 'Delivered' ? 'Delivered' : 'Estimated Delivery Tomorrow'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {order.deliveryDate} · Signed/Left at front entrance
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                    <div className="text-xs font-bold text-slate-900">Out for delivery</div>
                    <div className="text-[11px] text-slate-500">
                      Carrier vehicle departed local distribution center
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                    <div className="text-xs font-bold text-slate-900">Shipped</div>
                    <div className="text-[11px] text-slate-500">
                      Package arrived at Amazon Seattle Sortation Facility
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                    <div className="text-xs font-bold text-slate-900">Order placed</div>
                    <div className="text-[11px] text-slate-500">
                      {order.orderDate} · Payment authorized
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery photo preview popup */}
              {showPhoto && (
                <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-slate-600" />
                      Amazon Driver Delivery Proof Photo
                    </span>
                    <button 
                      onClick={() => setShowPhoto(false)}
                      className="text-xs text-slate-500 hover:text-slate-900"
                    >
                      Hide
                    </button>
                  </div>
                  <div className="aspect-video bg-slate-800 rounded flex flex-col items-center justify-center text-slate-300 p-6 text-center border border-slate-700">
                    <MapPin className="w-10 h-10 text-[#febd69] mb-2 animate-bounce" />
                    <div className="text-sm font-semibold text-white">Front Door Entry / Porch</div>
                    <div className="text-xs text-slate-400 mt-1">Photo captured by AMZL Driver at 2:14 PM · Oct 13</div>
                    <div className="mt-3 text-[11px] bg-slate-700/80 px-3 py-1 rounded text-slate-200">
                      GPS Geofence Match: Verified at Alex residence
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Instructions */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Delivery Instructions</h5>
                    <p className="text-xs text-slate-500">{instructionsText}</p>
                  </div>
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="text-xs amazon-link font-semibold"
                  >
                    {showInstructions ? 'Cancel' : 'Update instructions'}
                  </button>
                </div>

                {showInstructions && (
                  <form onSubmit={handleSaveInstructions} className="mt-3 bg-slate-50 p-3 rounded border border-slate-200">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Safe place or gate code for delivery driver:
                    </label>
                    <input 
                      type="text"
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#f08804]"
                      placeholder="e.g. Leave with doorman, rear patio, gate code #1234"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button type="submit" className="px-3 py-1 text-xs amazon-btn-primary">
                        Save instructions
                      </button>
                      {instructionsSaved && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Updated for future deliveries!
                        </span>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: RETURN OR REPLACE WIZARD */}
          {activeTab === 'return' && (
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                <div className={`flex items-center gap-1 ${returnStep >= 1 ? 'font-bold text-slate-900' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">1</span>
                  <span>Reason</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-300" />
                <div className={`flex items-center gap-1 ${returnStep >= 2 ? 'font-bold text-slate-900' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">2</span>
                  <span>Refund Method</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-300" />
                <div className={`flex items-center gap-1 ${returnStep >= 3 ? 'font-bold text-slate-900' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">3</span>
                  <span>Drop-off</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-300" />
                <div className={`flex items-center gap-1 ${returnStep === 4 ? 'font-bold text-emerald-700' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">4</span>
                  <span>Confirmation</span>
                </div>
              </div>

              {/* STEP 1: REASON */}
              {returnStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Why are you returning this item?</h3>
                  <div className="space-y-2">
                    {[
                      'Item defective or doesn\'t work as expected',
                      'Performance or quality not adequate',
                      'Missing parts or accessories',
                      'Wrong item was sent',
                      'Bought by mistake / no longer needed',
                      'Found a better price elsewhere'
                    ].map((reason) => (
                      <label 
                        key={reason}
                        className={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition ${
                          returnReason === reason 
                            ? 'border-[#f08804] bg-amber-50/50' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="returnReason"
                          checked={returnReason === reason}
                          onChange={() => setReturnReason(reason)}
                          className="mt-0.5 text-[#f08804] focus:ring-[#f08804]"
                        />
                        <span className="text-slate-800">{reason}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Comments (optional):
                    </label>
                    <textarea
                      rows={2}
                      value={returnComment}
                      onChange={(e) => setReturnComment(e.target.value)}
                      placeholder="Provide any details to help us process your return faster..."
                      className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#f08804]"
                    />
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setReturnStep(2)}
                      className="px-5 py-2 text-xs amazon-btn-primary flex items-center gap-1"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: REFUND METHOD */}
              {returnStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">How would you like to receive your refund?</h3>
                  <div className="space-y-3">
                    <label 
                      className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition ${
                        refundMethod === 'gift_card' 
                          ? 'border-[#f08804] bg-amber-50/50' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="refundMethod"
                        checked={refundMethod === 'gift_card'}
                        onChange={() => setRefundMethod('gift_card')}
                        className="mt-0.5 text-[#f08804] focus:ring-[#f08804]"
                      />
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>Amazon Gift Card Balance</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Fastest</span>
                        </div>
                        <p className="text-slate-500 mt-0.5">
                          Refund credited to your Amazon balance within 2 to 3 hours of carrier drop-off scan.
                        </p>
                        <div className="text-slate-700 font-mono font-semibold mt-1">
                          Amount: ${order.price.toFixed(2)}
                        </div>
                      </div>
                    </label>

                    <label 
                      className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition ${
                        refundMethod === 'original' 
                          ? 'border-[#f08804] bg-amber-50/50' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="refundMethod"
                        checked={refundMethod === 'original'}
                        onChange={() => setRefundMethod('original')}
                        className="mt-0.5 text-[#f08804] focus:ring-[#f08804]"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Original Payment Method (Visa ending in 4092)</div>
                        <p className="text-slate-500 mt-0.5">
                          Refund sent to your bank. Takes 3-5 business days after item inspection.
                        </p>
                        <div className="text-slate-700 font-mono font-semibold mt-1">
                          Amount: ${order.price.toFixed(2)}
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setReturnStep(1)}
                      className="px-4 py-2 text-xs amazon-btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setReturnStep(3)}
                      className="px-5 py-2 text-xs amazon-btn-primary flex items-center gap-1"
                    >
                      <span>Continue to Drop-off</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DROP-OFF SELECTION */}
              {returnStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Choose a convenient drop-off location</h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: 'ups_store',
                        title: 'The UPS Store (No Box or Label Required)',
                        address: '1420 5th Ave Ste 100, Seattle, WA (0.4 mi)',
                        desc: 'Simply bring your unboxed item and present the scannable QR code on your phone. They will pack and ship it for free.'
                      },
                      {
                        id: 'whole_foods',
                        title: 'Whole Foods Market Customer Service Desk',
                        address: '2210 Westlake Ave, Seattle, WA (0.8 mi)',
                        desc: 'Drop off at the customer service counter. Free packaging and label printing included.'
                      },
                      {
                        id: 'amazon_locker',
                        title: 'Amazon Locker - Beacon (Self-service kiosk)',
                        address: '800 5th Ave, Seattle, WA (0.2 mi)',
                        desc: 'Requires your item to be in a box. Scan code to open secure locker compartment.'
                      }
                    ].map((loc) => (
                      <label 
                        key={loc.id}
                        className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition ${
                          dropoffChoice === loc.id 
                            ? 'border-[#f08804] bg-amber-50/50' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dropoffChoice"
                          checked={dropoffChoice === loc.id}
                          onChange={() => setDropoffChoice(loc.id)}
                          className="mt-0.5 text-[#f08804] focus:ring-[#f08804]"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{loc.title}</div>
                          <div className="text-slate-600 font-medium text-[11px] mt-0.5">{loc.address}</div>
                          <p className="text-slate-500 mt-1 text-[11px]">{loc.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setReturnStep(2)}
                      className="px-4 py-2 text-xs amazon-btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleStartReturn}
                      className="px-5 py-2 text-xs amazon-btn-primary font-bold flex items-center gap-1.5"
                    >
                      <span>Confirm Return & Generate Code</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRMATION WITH QR CODE & RMA */}
              {returnStep === 4 && (
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-5 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">Return Authorization Confirmed</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Return ID: <span className="font-mono font-bold text-slate-900">{returnAuthId}</span> · Drop off before <span className="font-bold">{order.canReturnUntil}</span>
                    </p>
                  </div>

                  {/* Scannable Return Card */}
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-4 max-w-sm mx-auto shadow-sm">
                    <div className="text-xs font-bold text-slate-800 mb-2">Amazon Drop-Off QR Code</div>
                    <div className="w-36 h-36 bg-slate-900 text-white mx-auto flex flex-col items-center justify-center rounded p-2">
                      <QrCode className="w-28 h-28 text-white" />
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-slate-800">{returnAuthId}</div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      No box or tape needed. Show this QR code to the associate at your drop-off location.
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 max-w-md mx-auto">
                    Refund of <span className="font-bold">${order.price.toFixed(2)}</span> will be applied to your {refundMethod === 'gift_card' ? 'Amazon Gift Card Balance' : 'original payment method'} once scanned.
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 text-xs amazon-btn-secondary flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print return receipt</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 text-xs amazon-btn-primary"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROBLEM WITH ORDER */}
          {activeTab === 'problem' && (
            <div className="space-y-4">
              {!problemSubmitted ? (
                <>
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      All Amazon purchases are backed by the <strong>A-to-z Safe Purchase Guarantee</strong>. We will make it right.
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">Select what went wrong:</h3>

                  <div className="space-y-2">
                    {[
                      'Damaged packaging or item',
                      'Package marked as delivered, but cannot be found',
                      'Missing parts, manual, or accessories',
                      'Wrong product or variant was delivered',
                      'Suspected counterfeit or unauthorized item'
                    ].map((prob) => (
                      <label 
                        key={prob}
                        className={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition ${
                          problemType === prob 
                            ? 'border-[#f08804] bg-amber-50/50' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="problemType"
                          checked={problemType === prob}
                          onChange={() => setProblemType(prob)}
                          className="mt-0.5 text-[#f08804] focus:ring-[#f08804]"
                        />
                        <span className="text-slate-800">{prob}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setProblemSubmitted(true)}
                      className="w-full py-2.5 text-xs amazon-btn-primary font-bold cursor-pointer"
                    >
                      Submit for Instant Resolution
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Claim Approved Under A-to-z Guarantee</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    We have noted the issue ({problemType}) for Order #{order.orderNumber}. A replacement or refund ticket #AZ-{Math.floor(100000 + Math.random() * 900000)} has been generated and sent to alex@example.com.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs amazon-btn-primary"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
