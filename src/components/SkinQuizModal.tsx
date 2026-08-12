import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, RefreshCw, ShoppingBag, ShieldCheck, Heart, Droplets, Sun, Zap, ShieldAlert } from 'lucide-react';
import { QUIZ_QUESTIONS, calculateQuizResult } from '../data/quizQuestions';
import { Product, QuizResult } from '../types';
import { Logo } from './Logo';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, isSubscription?: boolean) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenProductDetail,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStepIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Calculate final diagnostic output
      const result = calculateQuizResult(updated);
      setQuizResult(result);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setQuizResult(null);
  };

  // Icon mapper helper
  const renderOptionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#7C9F8A]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#A9C3C2]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#7C9F8A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#212925]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#E2DBD0] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#F5F1E8] border-b border-[#E2DBD0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#7C9F8A] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#212925]">
                Skin Routine Diagnostic
              </h3>
              <p className="text-[11px] text-[#5C6760]">Yahreah Skin • As Within, So Without</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5C6760] hover:text-[#212925] hover:bg-[#E2DBD0]/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if in question mode) */}
        {!quizResult && (
          <div className="w-full bg-[#E2DBD0]/60 h-1.5">
            <div
              className="bg-[#7C9F8A] h-1.5 transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* QUESTION MODE */}
          {!quizResult ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Question Headline */}
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7C9F8A]">
                  Step {currentStepIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#212925]">
                  {currentQuestion.title}
                </h2>
                <p className="text-sm text-[#5C6760] font-sans">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group relative ${
                        isSelected
                          ? 'border-[#7C9F8A] bg-[#EEF4F0] ring-2 ring-[#7C9F8A]/30 shadow-sm'
                          : 'border-[#E2DBD0] bg-white hover:border-[#7C9F8A]/60 hover:bg-[#F5F1E8]/60'
                      }`}
                    >
                      {/* Icon or Radio dot */}
                      <div className="mt-0.5 shrink-0">
                        {opt.iconName ? (
                          renderOptionIcon(opt.iconName)
                        ) : (
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'border-[#7C9F8A] bg-[#7C9F8A] text-white'
                                : 'border-[#B7A79D] group-hover:border-[#7C9F8A]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="space-y-0.5">
                        <p className="font-serif font-bold text-sm text-[#212925] group-hover:text-[#2A3B30]">
                          {opt.label}
                        </p>
                        {opt.description && (
                          <p className="text-xs text-[#5C6760] leading-snug">
                            {opt.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back Button */}
              {currentStepIndex > 0 && (
                <div className="pt-4 flex justify-start">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6760] hover:text-[#212925] py-2 px-3 rounded-lg hover:bg-[#E2DBD0]/40 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            
            /* DIAGNOSTIC RESULT MODE */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Result Header */}
              <div className="text-center max-w-2xl mx-auto space-y-3 bg-[#EEF4F0] p-6 rounded-3xl border border-[#7C9F8A]/30">
                <div className="inline-flex items-center gap-2 bg-[#7C9F8A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your Diagnostic Protocol</span>
                </div>
                
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#212925]">
                  {quizResult.routineTitle}
                </h2>

                <p className="text-sm text-[#2A3B30]">
                  {quizResult.routineDescription}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-[#5C6760]">
                  <span className="bg-white/80 px-3 py-1 rounded-full border border-[#E2DBD0]">
                    Primary Concern: <strong>{quizResult.primaryConcern}</strong>
                  </span>
                  <span className="bg-white/80 px-3 py-1 rounded-full border border-[#E2DBD0]">
                    Skin Type: <strong>{quizResult.skinType.toUpperCase()}</strong>
                  </span>
                </div>
              </div>

              {/* Recommended Complete System Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#7C9F8A] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#7C9F8A] text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                  Recommended System (Save 20%)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 aspect-square rounded-2xl overflow-hidden bg-[#F5F1E8]">
                    <img
                      src={quizResult.recommendedBundle.image}
                      alt={quizResult.recommendedBundle.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <span className="text-xs font-semibold text-[#7C9F8A] uppercase tracking-wider">
                      {quizResult.recommendedBundle.categoryName}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#212925]">
                      {quizResult.recommendedBundle.name}
                    </h3>
                    <p className="text-xs text-[#5C6760] leading-relaxed">
                      {quizResult.recommendedBundle.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-2xl font-bold font-serif text-[#212925]">
                        ${quizResult.recommendedBundle.price}
                      </span>
                      <span className="text-xs font-bold text-[#7C9F8A] bg-[#EEF4F0] px-2.5 py-1 rounded-full">
                        Subscriber Price: ${quizResult.recommendedBundle.subscriptionPrice.toFixed(2)} / mo
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => {
                          onAddToCart(quizResult.recommendedBundle);
                          onClose();
                        }}
                        className="inline-flex items-center gap-2 bg-[#7C9F8A] hover:bg-[#6a8c78] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Complete System to Cart</span>
                      </button>

                      <button
                        onClick={() => onOpenProductDetail(quizResult.recommendedBundle)}
                        className="text-xs font-semibold text-[#212925] hover:text-[#7C9F8A] underline underline-offset-4 py-2"
                      >
                        View Full System Formula
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side-by-side Inside vs Outside Breakdown */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-[#212925] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C9F8A]"></span>
                  <span>Inside vs Outside Individual Components</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Inside Product */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E2DBD0] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#7C9F8A] px-2.5 py-0.5 rounded-full">
                          As Within (Inside)
                        </span>
                        <span className="text-xs font-serif font-bold text-[#212925]">
                          ${quizResult.recommendedInsideProduct.price}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#212925]">
                        {quizResult.recommendedInsideProduct.name}
                      </h4>
                      <p className="text-xs text-[#5C6760] line-clamp-2">
                        {quizResult.recommendedInsideProduct.insideBenefit}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E2DBD0]/60">
                      <button
                        onClick={() => onOpenProductDetail(quizResult.recommendedInsideProduct)}
                        className="text-xs font-semibold text-[#7C9F8A] hover:underline"
                      >
                        Details & Ingredients
                      </button>
                      <button
                        onClick={() => onAddToCart(quizResult.recommendedInsideProduct)}
                        className="bg-[#F5F1E8] hover:bg-[#EEF4F0] text-[#212925] text-xs font-bold px-3 py-1.5 rounded-full border border-[#E2DBD0]"
                      >
                        + Add Inside
                      </button>
                    </div>
                  </div>

                  {/* Outside Product */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E2DBD0] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#A9C3C2] px-2.5 py-0.5 rounded-full">
                          So Without (Outside)
                        </span>
                        <span className="text-xs font-serif font-bold text-[#212925]">
                          ${quizResult.recommendedOutsideProduct.price}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#212925]">
                        {quizResult.recommendedOutsideProduct.name}
                      </h4>
                      <p className="text-xs text-[#5C6760] line-clamp-2">
                        {quizResult.recommendedOutsideProduct.outsideBenefit || quizResult.recommendedOutsideProduct.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E2DBD0]/60">
                      <button
                        onClick={() => onOpenProductDetail(quizResult.recommendedOutsideProduct)}
                        className="text-xs font-semibold text-[#3B5A59] hover:underline"
                      >
                        Details & Ingredients
                      </button>
                      <button
                        onClick={() => onAddToCart(quizResult.recommendedOutsideProduct)}
                        className="bg-[#F5F1E8] hover:bg-[#E8F1F1] text-[#212925] text-xs font-bold px-3 py-1.5 rounded-full border border-[#E2DBD0]"
                      >
                        + Add Outside
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Personalized Tips */}
              <div className="bg-[#F5F1E8] p-5 rounded-2xl border border-[#E2DBD0] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#212925] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7C9F8A]" />
                  <span>Personalized Routine Guidance</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#5C6760] list-disc list-inside">
                  {quizResult.personalizedTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Retake Quiz */}
              <div className="text-center pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C6760] hover:text-[#212925]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
