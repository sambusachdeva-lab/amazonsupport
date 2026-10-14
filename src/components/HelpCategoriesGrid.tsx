import React from 'react';
import { 
  PackageCheck, 
  Crown, 
  CreditCard, 
  ShieldCheck, 
  Cpu, 
  Headphones, 
  ChevronRight 
} from 'lucide-react';
import { SupportCategory } from '../types';

interface HelpCategoriesGridProps {
  categories: SupportCategory[];
  onSelectCategory: (categoryId: string) => void;
  onActionClick: (categoryId: string, actionText: string) => void;
}

export const HelpCategoriesGrid: React.FC<HelpCategoriesGridProps> = ({
  categories,
  onSelectCategory,
  onActionClick
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 text-[#007185]" />;
      case 'Crown':
        return <Crown className="w-7 h-7 text-[#00a8e1]" />;
      case 'CreditCard':
        return <CreditCard className="w-7 h-7 text-[#c7511f]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-[#067d62]" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-[#3f51b5]" />;
      case 'Headphones':
        return <Headphones className="w-7 h-7 text-[#e47911]" />;
      default:
        return <PackageCheck className="w-7 h-7 text-[#007185]" />;
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Browse by topic or self-service hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Find answers, manage your account, or select a category to start immediate resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="amazon-card amazon-card-interactive p-5 flex flex-col justify-between group cursor-pointer"
            onClick={() => onSelectCategory(category.id)}
          >
            <div>
              {/* Header: Icon + Title */}
              <div className="flex items-start gap-4 mb-3">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform">
                  {getIcon(category.iconName)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#c7511f] transition-colors leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Popular quick actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Actions
                </div>
                {category.popularActions.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onActionClick(category.id, action);
                    }}
                    className="w-full text-left py-1 text-xs text-slate-700 hover:text-[#c7511f] flex items-center justify-between group/btn transition-colors cursor-pointer"
                  >
                    <span className="truncate pr-2">{action}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#c7511f] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#007185] group-hover:text-[#c7511f] flex items-center gap-1">
              <span>View all {category.title} guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
