import React from 'react';
import { Search, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { POPULAR_SEARCH_SUGGESTIONS } from '../data/supportData';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectSuggestion: (q: string) => void;
  onOpenContact: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  onSelectSuggestion,
  onOpenContact
}) => {
  return (
    <section className="bg-gradient-to-b from-[#232f3e] to-[#1a222d] text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
      <div className="max-w-5xl mx-auto">
        {/* Notice banner */}
        <div className="mb-6 bg-slate-800/80 border border-slate-600/70 rounded-lg p-3 text-xs flex items-center justify-between gap-3 text-slate-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#febd69] shrink-0" />
            <span>
              <strong>Delivery update:</strong> Standard two-day Prime shipping is running normally. If an item arrives late, our Prime Guarantee applies.
            </span>
          </div>
          <button 
            onClick={() => onSelectSuggestion('Prime delivery guarantees')}
            className="text-[#febd69] hover:underline font-medium shrink-0 hidden sm:inline"
          >
            Learn more
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome to Amazon Customer Service
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Hello Alex, what can we help you with today?
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent focus-within:border-[#f08804] transition">
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search help topics, return an order, Prime, digital devices..."
              className="w-full py-3.5 pr-4 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-3 text-xs text-slate-500 hover:text-slate-900 font-medium"
              >
                Clear
              </button>
            )}
            <button 
              type="button"
              className="bg-[#febd69] hover:bg-[#f3a847] text-slate-900 font-semibold px-5 py-3.5 text-xs sm:text-sm cursor-pointer transition shrink-0"
            >
              Search
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="mt-3 flex items-center gap-2 flex-wrap justify-center text-xs text-slate-300">
            <span className="text-slate-400">Common searches:</span>
            {POPULAR_SEARCH_SUGGESTIONS.slice(0, 5).map((term) => (
              <button
                key={term}
                onClick={() => onSelectSuggestion(term)}
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white px-2.5 py-1 rounded text-xs transition border border-slate-700/80 cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Resolution Strip */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>A-to-z Safe Purchase Guarantee</span>
            </div>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline">24/7 Live Support via Messaging & Callback</span>
          </div>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1 text-[#febd69] hover:underline font-semibold cursor-pointer ml-auto"
          >
            <span>Connect with an Associate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
