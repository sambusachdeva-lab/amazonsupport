import React from 'react';
import { Package, Truck, ArrowRight, RotateCcw, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { OrderItem } from '../types';

interface RecentOrdersSectionProps {
  orders: OrderItem[];
  onTrackOrder: (order: OrderItem) => void;
  onReturnOrder: (order: OrderItem) => void;
  onReportProblem: (order: OrderItem) => void;
  onGetDeviceHelp: (order: OrderItem) => void;
}

export const RecentOrdersSection: React.FC<RecentOrdersSectionProps> = ({
  orders,
  onTrackOrder,
  onReturnOrder,
  onReportProblem,
  onGetDeviceHelp
}) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Need help with a recent item?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select an order below to track delivery, start a return, or request a replacement.
          </p>
        </div>
        <button 
          onClick={() => onTrackOrder(orders[0])}
          className="amazon-link text-xs sm:text-sm font-semibold flex items-center gap-1 shrink-0"
        >
          <span>View all orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of recent items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order) => {
          const isDelivered = order.deliveryStatus === 'Delivered';
          const isReturnInitiated = order.deliveryStatus === 'Return Initiated';

          return (
            <div 
              key={order.id}
              className="amazon-card p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-white"
            >
              <div>
                {/* Status indicator */}
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold">
                  {isDelivered ? (
                    <span className="flex items-center gap-1 text-[#067d62]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {order.deliveryDate}
                    </span>
                  ) : isReturnInitiated ? (
                    <span className="flex items-center gap-1 text-[#b12704]">
                      <RotateCcw className="w-3.5 h-3.5" />
                      Return Started · Drop off by {order.canReturnUntil}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#007185]">
                      <Truck className="w-3.5 h-3.5 animate-pulse" />
                      {order.deliveryDate}
                    </span>
                  )}
                </div>

                {/* Product thumbnail + details */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 bg-slate-50 border border-slate-200 rounded p-1 flex items-center justify-center overflow-hidden">
                    <img 
                      src={order.image} 
                      alt={order.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback icon container
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug hover:text-[#c7511f] cursor-pointer">
                      {order.title}
                    </h3>
                    <div className="mt-1 text-xs text-slate-500 font-mono tabular-nums">
                      ${order.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      Order #{order.orderNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onTrackOrder(order)}
                  className="w-full py-1.5 px-3 text-xs amazon-btn-primary flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-slate-900" />
                  <span>Track package</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onReturnOrder(order)}
                    className="py-1.5 px-2 text-xs amazon-btn-secondary flex items-center justify-center gap-1 cursor-pointer truncate"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-700" />
                    <span>Return / Replace</span>
                  </button>

                  <button
                    onClick={() => {
                      if (order.id === 'ord-102' || order.id === 'ord-103') {
                        onGetDeviceHelp(order);
                      } else {
                        onReportProblem(order);
                      }
                    }}
                    className="py-1.5 px-2 text-xs amazon-btn-secondary flex items-center justify-center gap-1 cursor-pointer truncate"
                  >
                    <HelpCircle className="w-3 h-3 text-slate-700" />
                    <span>Get support</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
