import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RecentOrdersSection } from './components/RecentOrdersSection';
import { HelpCategoriesGrid } from './components/HelpCategoriesGrid';
import { HelpTopicsDirectory } from './components/HelpTopicsDirectory';
import { OrderResolutionModal } from './components/OrderResolutionModal';
import { ContactUsModal } from './components/ContactUsModal';
import { DeviceTroubleshooterModal } from './components/DeviceTroubleshooterModal';
import { HelpArticleModal } from './components/HelpArticleModal';
import { Footer } from './components/Footer';

import { RECENT_ORDERS, SUPPORT_CATEGORIES, HELP_ARTICLES } from './data/supportData';
import { OrderItem, HelpArticle } from './types';

export default function App() {
  const [orders, setOrders] = useState<OrderItem[]>(RECENT_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Modal States
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [resolutionTab, setResolutionTab] = useState<'track' | 'return' | 'problem'>('track');
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers for orders
  const handleTrackOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setResolutionTab('track');
    setIsResolutionModalOpen(true);
  };

  const handleReturnOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setResolutionTab('return');
    setIsResolutionModalOpen(true);
  };

  const handleReportProblem = (order: OrderItem) => {
    setSelectedOrder(order);
    setResolutionTab('problem');
    setIsResolutionModalOpen(true);
  };

  const handleGetDeviceHelp = (order: OrderItem) => {
    setSelectedOrder(order);
    setIsDeviceModalOpen(true);
  };

  const handleReturnCompleted = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, deliveryStatus: 'Return Initiated' as const }
          : ord
      )
    );
    triggerToast('Return authorization generated! Drop off your item at any UPS Store or Amazon Locker.');
  };

  // Handlers for Category / Actions
  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'contact-associate') {
      setIsContactModalOpen(true);
    } else if (categoryId === 'digital-devices') {
      setActiveFilter('digital-devices');
      setIsDeviceModalOpen(true);
    } else {
      setActiveFilter(categoryId);
      // Smooth scroll to articles section
      const target = document.getElementById('knowledge-base-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleActionClick = (categoryId: string, actionText: string) => {
    const lower = actionText.toLowerCase();

    if (lower.includes('track')) {
      handleTrackOrder(orders[0]);
    } else if (lower.includes('return') || lower.includes('replace')) {
      handleReturnOrder(orders[0]);
    } else if (lower.includes('wi-fi') || lower.includes('device') || lower.includes('echo') || lower.includes('remote')) {
      setIsDeviceModalOpen(true);
    } else if (lower.includes('chat') || lower.includes('call') || lower.includes('associate') || lower.includes('support')) {
      setIsContactModalOpen(true);
    } else {
      // Find matching article or filter
      const found = HELP_ARTICLES.find(
        (a) => a.title.toLowerCase().includes(lower) || a.categoryId === categoryId
      );
      if (found) {
        setSelectedArticle(found);
      } else {
        setActiveFilter(categoryId);
      }
    }
  };

  const handleGoHome = () => {
    setSearchQuery('');
    setActiveFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] text-[#0f1111]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#067d62] text-white px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <span>✓</span>
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Amazon Header */}
      <Header
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onOpenContact={() => setIsContactModalOpen(true)}
        onSelectCategory={handleSelectCategory}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {/* Hero Section with Search & Instant Suggestions */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectSuggestion={(suggestion) => {
            setSearchQuery(suggestion);
            const found = HELP_ARTICLES.find((a) =>
              a.title.toLowerCase().includes(suggestion.toLowerCase())
            );
            if (found) {
              setSelectedArticle(found);
            }
          }}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        {/* Section 1: Recent Orders Quick Resolution */}
        <RecentOrdersSection
          orders={orders}
          onTrackOrder={handleTrackOrder}
          onReturnOrder={handleReturnOrder}
          onReportProblem={handleReportProblem}
          onGetDeviceHelp={handleGetDeviceHelp}
        />

        {/* Section 2: 6 Amazon Help Pillars */}
        <HelpCategoriesGrid
          categories={SUPPORT_CATEGORIES}
          onSelectCategory={handleSelectCategory}
          onActionClick={handleActionClick}
        />

        {/* Section 3: Recommended Support Guides & Policies */}
        <div id="knowledge-base-section">
          <HelpTopicsDirectory
            articles={HELP_ARTICLES}
            onSelectArticle={(article) => setSelectedArticle(article)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* Amazon Multi-Column Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Interactive Modals */}
      {isResolutionModalOpen && (
        <OrderResolutionModal
          order={selectedOrder}
          initialTab={resolutionTab}
          onClose={() => setIsResolutionModalOpen(false)}
          onReturnCompleted={handleReturnCompleted}
        />
      )}

      {isContactModalOpen && (
        <ContactUsModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          orders={orders}
          preselectedOrder={selectedOrder}
        />
      )}

      {isDeviceModalOpen && (
        <DeviceTroubleshooterModal
          isOpen={isDeviceModalOpen}
          onClose={() => setIsDeviceModalOpen(false)}
          selectedOrder={selectedOrder}
          onOpenContact={() => {
            setIsDeviceModalOpen(false);
            setIsContactModalOpen(true);
          }}
        />
      )}

      {selectedArticle && (
        <HelpArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(id) => {
            const found = HELP_ARTICLES.find((a) => a.id === id);
            if (found) setSelectedArticle(found);
          }}
        />
      )}
    </div>
  );
}
