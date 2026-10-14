import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';
import { HelpArticle } from '../types';

interface HelpTopicsDirectoryProps {
  articles: HelpArticle[];
  onSelectArticle: (article: HelpArticle) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
}

export const HelpTopicsDirectory: React.FC<HelpTopicsDirectoryProps> = ({
  articles,
  onSelectArticle,
  activeFilter,
  onFilterChange,
  searchQuery
}) => {
  const filterTabs = [
    { id: 'all', label: 'All Topics' },
    { id: 'delivery-returns', label: 'Delivery & Returns' },
    { id: 'prime-memberships', label: 'Prime' },
    { id: 'payments-giftcards', label: 'Payments & Balance' },
    { id: 'digital-devices', label: 'Devices' },
    { id: 'address-security', label: 'Security & Phishing' }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesFilter = activeFilter === 'all' || art.categoryId === activeFilter;
    const matchesSearch = !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.steps.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
      <div className="border-t border-slate-200 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Recommended Support Guides & Policies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Official step-by-step documentation for Amazon customer accounts and services.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-[#131921] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="amazon-card p-4 hover:border-[#999] hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#c7511f] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#c7511f] shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{article.readTime}</span>
                  <span className="font-semibold text-[#007185] group-hover:underline">Read guide →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center max-w-md mx-auto">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">No articles matched your query</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords, or connect with an associate directly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
