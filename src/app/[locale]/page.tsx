'use client';

import Card from '@/components/ui/Card';
import DonationHistory from '@/components/DonationHistory';
import DonateModal from '@/components/DonateModal';
import Button from '@/components/ui/Button';
import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';
import { Heart, TrendingUp } from 'lucide-react';

export default function Home() {
  const { t } = useTranslations();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  
  // 測試數據
  const donations = [
    {
      id: '1',
      from: 'user***@gmail.com',
      amount: 100,
      currency: 'USD',
      message: 'Good luck!',
      time: '2 hours ago'
    },
    {
      id: '2',
      from: 'Anonymous',
      amount: 50,
      currency: 'USD',
      message: '',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50/50 via-white to-gray-100/30">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section - 金額為主要焦點 */}
        <div className="text-center py-16">
          {/* 震撼的金額顯示 */}
          <div className="mb-8">
            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 mb-4 tracking-tight hover:scale-105 transition-transform duration-500 cursor-default">
              $1,234.56
            </div>
            <div className="text-lg md:text-xl text-gray-500 font-medium tracking-wide">
              USD RAISED
            </div>
          </div>

          {/* 淡化的標題和標語 */}
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-lg md:text-xl text-gray-600 mb-2 font-medium">
              {t('siteTitle')}
            </h1>
            <p className="text-sm md:text-base text-gray-400 italic mb-8">
              {t('tagline')}
            </p>
            
            {/* 自然融入的捐款按鈕 */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsDonateModalOpen(true)}
                className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 donate-button-pulse donate-button-glow"
              >
                <Heart className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
                <span className="font-medium">Support</span>
                <TrendingUp className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* 實時更新指示器 */}
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-8">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span>Live updates</span>
          </div>

          {/* 實時捐款流動名單 */}
          <div className="relative overflow-hidden bg-gradient-to-r from-transparent via-gray-50/50 to-transparent rounded-2xl p-4">
            <div className="flex animate-marquee space-x-8 text-sm text-gray-500">
              <span className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>user***@gmail.com donated $100</span>
              </span>
              <span className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Anonymous donated $50</span>
              </span>
              <span className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>john_doe donated $25</span>
              </span>
              <span className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>supporter123 donated $75</span>
              </span>
            </div>
          </div>
        </div>

        {/* 捐款歷史區域 */}
        <div className="max-w-2xl mx-auto">
          <DonationHistory donations={donations} />
        </div>

        {/* 浮動捐款按鈕 - 在較小螢幕上顯示 */}
        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="group w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center donate-button-pulse donate-button-glow"
          >
            <Heart className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
          </button>
        </div>
      </div>

      {/* 捐款彈窗 */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        targetUsername="dmiyc"
      />
    </div>
  );
} 