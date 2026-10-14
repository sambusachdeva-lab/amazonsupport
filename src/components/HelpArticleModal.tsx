import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Check, Share2, ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { HelpArticle } from '../types';

interface HelpArticleModalProps {
  article: HelpArticle | null;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
}

export const HelpArticleModal: React.FC<HelpArticleModalProps> = ({
  article,
  onClose,
  onSelectArticle
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-300 my-6">
        {/* Top bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#007185]" />
            <span>Amazon Help Library</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 hover:text-slate-900 cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">{article.lastUpdated}</p>
          </div>

          {/* Summary Box */}
          <div className="bg-[#f0f8ff] border-l-4 border-[#007185] p-3.5 rounded-r text-xs text-slate-700 leading-relaxed">
            {article.summary}
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Step-by-Step Instructions:
            </h3>
            <ol className="space-y-3">
              {article.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips / Notes */}
          {article.tips && article.tips.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-2">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Helpful Tips</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                {article.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Was this helpful? feedback widget */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-semibold text-slate-800">
              Was this information helpful?
            </div>

            {feedbackGiven === null ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFeedbackGiven('yes')}
                  className="px-3.5 py-1.5 text-xs amazon-btn-secondary flex items-center gap-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-slate-600" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven('no')}
                  className="px-3.5 py-1.5 text-xs amazon-btn-secondary flex items-center gap-1.5"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-slate-600" />
                  <span>No</span>
                </button>
              </div>
            ) : (
              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you for your feedback!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs amazon-btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
