'use client';

import { Clock, User } from 'lucide-react';
import Card from './ui/Card';
import { useTranslations } from '@/hooks/useTranslations';

interface Donation {
  id: string;
  from: string;
  amount: number;
  currency: string;
  message?: string;
  time: string;
}

interface DonationHistoryProps {
  donations: Donation[];
  loading?: boolean;
}

export default function DonationHistory({ donations, loading = false }: DonationHistoryProps) {
  const { t } = useTranslations();

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (donations.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t('noDonationsYet')}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        {t('recentDonations')}
      </h3>
      
      <div className="space-y-4">
        {donations.map((donation) => (
          <div key={donation.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {donation.from}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium text-purple-600">
                    ${donation.amount} {donation.currency}
                  </span>
                  {donation.message && (
                    <span>said: {donation.message}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {donation.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 