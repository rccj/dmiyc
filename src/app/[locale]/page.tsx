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
    <div className="max-w-2xl mx-auto space-y-8">
      <Card variant="elevated" className="text-center py-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          {t('siteTitle')}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{t('tagline')}</p>
        <p className="text-2xl font-bold text-purple-700">
          {t('totalDonated', { amount: '1,234.56' })}
        </p>
      </Card>

      <DonationHistory donations={donations} />
    </div>
  );
} 