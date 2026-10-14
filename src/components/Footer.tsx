import React from 'react';
import { Globe, DollarSign } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (id: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-white select-none">
      {/* Back to top bar */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#37475a] hover:bg-[#485769] text-xs font-semibold text-center text-white transition cursor-pointer"
      >
        Back to top
      </button>

      {/* Directory Columns */}
      <div className="bg-[#232f3e] py-10 px-6 sm:px-12 border-b border-slate-700">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#about" className="hover:underline">About Amazon</a></li>
              <li><a href="#careers" className="hover:underline">Careers</a></li>
              <li><a href="#sustainability" className="hover:underline">Sustainability</a></li>
              <li><a href="#press" className="hover:underline">Press Center</a></li>
              <li><a href="#investor" className="hover:underline">Investor Relations</a></li>
              <li><a href="#devices" className="hover:underline">Amazon Devices</a></li>
              <li><a href="#science" className="hover:underline">Amazon Science</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#sell" className="hover:underline">Sell products on Amazon</a></li>
              <li><a href="#business" className="hover:underline">Sell on Amazon Business</a></li>
              <li><a href="#affiliates" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#fba" className="hover:underline">Fulfillment by Amazon</a></li>
              <li><a href="#advertise" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#publish" className="hover:underline">Self-Publish with Us</a></li>
              <li><a href="#hub" className="hover:underline">Host an Amazon Hub</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Amazon Payment Products</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#visa" className="hover:underline">Amazon Visa & Prime Store Card</a></li>
              <li><a href="#points" className="hover:underline">Shop with Points</a></li>
              <li><a href="#reload" className="hover:underline">Reload Your Balance</a></li>
              <li><a href="#currency" className="hover:underline">Amazon Currency Converter</a></li>
              <li><a href="#credit" className="hover:underline">Credit Card Marketplace</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onSelectCategory('delivery-returns')} className="hover:underline cursor-pointer">
                  Your Account & Orders
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('delivery-returns')} className="hover:underline cursor-pointer">
                  Shipping Rates & Policies
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('delivery-returns')} className="hover:underline cursor-pointer">
                  Returns & Replacements
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('digital-devices')} className="hover:underline cursor-pointer">
                  Manage Your Content and Devices
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('prime-memberships')} className="hover:underline cursor-pointer">
                  Your Prime Membership
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('address-security')} className="hover:underline cursor-pointer">
                  Security & Report Suspicious Activity
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="text-[#febd69] font-bold hover:underline cursor-pointer">
                  Contact Customer Service Associate
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand & Language selector strip */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-1 font-bold text-white text-lg">
            <span>amazon</span>
          </div>

          <div className="flex items-center gap-2 border border-slate-600 rounded px-3 py-1.5 hover:border-slate-400 cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </div>

          <div className="flex items-center gap-2 border border-slate-600 rounded px-3 py-1.5 hover:border-slate-400 cursor-pointer">
            <span>$ USD - U.S. Dollar</span>
          </div>

          <div className="flex items-center gap-2 border border-slate-600 rounded px-3 py-1.5 hover:border-slate-400 cursor-pointer">
            <span>United States</span>
          </div>
        </div>
      </div>

      {/* Legal & Copyright (#131921) */}
      <div className="bg-[#131921] py-8 px-6 text-center text-slate-400 text-[11px] space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
          <a href="#conditions" className="hover:underline">Conditions of Use</a>
          <a href="#privacy" className="hover:underline">Privacy Notice</a>
          <a href="#consumer" className="hover:underline">Consumer Health Data Privacy Disclosure</a>
          <a href="#ads" className="hover:underline">Your Ads Privacy Choices</a>
        </div>
        <p className="text-slate-500">
          © 1996-2026, Amazon.com, Inc. or its affiliates. Amazon Customer Service design system.
        </p>
      </div>
    </footer>
  );
};
