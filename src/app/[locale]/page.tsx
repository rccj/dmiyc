'use client';

import Card from '@/components/ui/Card';
import DonationHistory from '@/components/DonationHistory';
import { useTranslations } from '@/hooks/useTranslations';

export default function Home() {
  const { t } = useTranslations();
  
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
            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 mb-4 tracking-tight">
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
            <p className="text-sm md:text-base text-gray-400 italic">
              {t('tagline')}
            </p>
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
      </div>
    </div>
  );
} 