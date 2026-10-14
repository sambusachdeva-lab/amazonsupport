import React from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingCart, 
  Menu, 
  Headphones, 
  ChevronDown,
  Globe
} from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onOpenContact: () => void;
  onSelectCategory: (categoryId: string) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  onOpenContact,
  onSelectCategory,
  onGoHome
}) => {
  return (
    <header className="w-full text-white select-none">
      {/* Primary Amazon Squid Ink Header */}
      <div className="bg-[#131921] px-4 py-2 flex items-center justify-between gap-4 text-sm">
        {/* Left: Logo & Delivery address */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Amazon Brand Logo + Smile */}
          <button 
            onClick={onGoHome}
            className="flex flex-col items-start px-2 py-1 rounded hover:outline-1 hover:outline-white focus:outline-none transition cursor-pointer"
            title="Amazon Customer Service Home"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-white font-sans">amazon</span>
              <span className="text-xs text-[#febd69] font-medium tracking-tight">customer service</span>
            </div>
            {/* Amazon Smile Arc */}
            <svg className="w-14 h-2 -mt-0.5 text-[#febd69]" viewBox="0 0 60 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3C18 10 42 10 58 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M52 1L58 2L55 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Deliver to Alex */}
          <button 
            onClick={() => onSelectCategory('address-security')}
            className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded hover:outline-1 hover:outline-white cursor-pointer text-left transition"
          >
            <MapPin className="w-4 h-4 text-slate-300 mt-1 shrink-0" />
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-slate-400">Deliver to Alex</span>
              <span className="font-bold text-white whitespace-nowrap">Seattle 98101</span>
            </div>
          </button>
        </div>

        {/* Center: Search Amazon Help */}
        <div className="flex-1 max-w-2xl mx-2">
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center h-10 w-full rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#f08804]"
          >
            <div className="hidden sm:flex items-center gap-1 bg-[#f3f3f3] hover:bg-[#dadada] text-[#555] px-3 h-full border-r border-slate-300 text-xs font-medium cursor-pointer transition">
              <span>Help Library</span>
              <ChevronDown className="w-3 h-3 text-slate-600" />
            </div>
            <input 
              type="text" 
              placeholder="Search help topics, return an order, Prime, payments..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 h-full px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => onSearch('')}
                className="px-2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button 
              type="submit"
              className="bg-[#febd69] hover:bg-[#f3a847] text-slate-900 px-4 h-full flex items-center justify-center cursor-pointer transition shrink-0"
              title="Search Amazon Customer Service"
            >
              <Search className="w-5 h-5 text-slate-900" />
            </button>
          </form>
        </div>

        {/* Right: Language, Account, Orders, Cart, Contact */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Language selector */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded hover:outline-1 hover:outline-white cursor-pointer text-xs font-bold">
            <Globe className="w-4 h-4 text-slate-300" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* Account & Lists */}
          <button 
            onClick={() => onSelectCategory('address-security')}
            className="flex flex-col text-xs leading-tight px-2 py-1.5 rounded hover:outline-1 hover:outline-white text-left cursor-pointer transition"
          >
            <span className="text-slate-300">Hello, Alex</span>
            <span className="font-bold text-white flex items-center gap-0.5">
              Account & Lists
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </button>

          {/* Returns & Orders */}
          <button 
            onClick={() => onSelectCategory('delivery-returns')}
            className="hidden sm:flex flex-col text-xs leading-tight px-2 py-1.5 rounded hover:outline-1 hover:outline-white text-left cursor-pointer transition"
          >
            <span className="text-slate-300">Returns</span>
            <span className="font-bold text-white">& Orders</span>
          </button>

          {/* Cart with 2 items */}
          <div className="flex items-center gap-1 px-2 py-1.5 rounded hover:outline-1 hover:outline-white cursor-pointer transition">
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              <span className="absolute -top-1 left-3 text-xs font-bold text-[#f08804] tabular-nums">2</span>
            </div>
            <span className="hidden md:inline font-bold text-xs mt-3">Cart</span>
          </div>

          {/* Live Contact Quick CTA */}
          <button 
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#febd69] hover:bg-[#f3a847] text-slate-900 text-xs font-semibold cursor-pointer shadow-sm transition"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-900" />
            <span className="whitespace-nowrap">Contact Us</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar (#232f3e) */}
      <nav className="bg-[#232f3e] px-4 py-1.5 flex items-center gap-5 text-xs text-white overflow-x-auto whitespace-nowrap scrollbar-none border-t border-slate-700/40">
        <button 
          onClick={onGoHome}
          className="flex items-center gap-1 px-2 py-1 font-bold hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>All</span>
        </button>
        
        <button 
          onClick={onGoHome}
          className="px-2 py-1 font-bold text-[#febd69] border-b-2 border-[#febd69] cursor-pointer"
        >
          Customer Service
        </button>

        <button 
          onClick={() => onSelectCategory('delivery-returns')}
          className="px-2 py-1 text-slate-200 hover:text-white hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          Your Orders
        </button>

        <button 
          onClick={() => onSelectCategory('prime-memberships')}
          className="px-2 py-1 text-slate-200 hover:text-white hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          Prime & Memberships
        </button>

        <button 
          onClick={() => onSelectCategory('payments-giftcards')}
          className="px-2 py-1 text-slate-200 hover:text-white hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          Payment & Gift Cards
        </button>

        <button 
          onClick={() => onSelectCategory('digital-devices')}
          className="px-2 py-1 text-slate-200 hover:text-white hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          Digital Services & Device Support
        </button>

        <button 
          onClick={() => onSelectCategory('address-security')}
          className="px-2 py-1 text-slate-200 hover:text-white hover:outline-1 hover:outline-white rounded cursor-pointer"
        >
          Security & Privacy
        </button>

        <button 
          onClick={onOpenContact}
          className="ml-auto px-2 py-1 text-[#febd69] font-medium hover:underline cursor-pointer"
        >
          Need help right now? Talk to an Associate
        </button>
      </nav>
    </header>
  );
};
