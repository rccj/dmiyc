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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-gray-500" />
        {t('recentDonations')}
      </h3>
      
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <div 
            key={donation.id} 
            className="group hover:bg-gray-50/80 rounded-lg p-3 -m-3 transition-all duration-200 border-l-2 border-transparent hover:border-gray-400 cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-xs font-semibold text-gray-700">
                      {donation.from.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {donation.from}
                  </span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-500">
                    {donation.time}
                  </span>
                </div>
                
                <div className="ml-10 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors duration-200">
                      ${donation.amount} {donation.currency}
                    </span>
                  </div>
                  {donation.message && (
                    <p className="text-sm text-gray-600 italic">
                      "{donation.message}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 實時捐款流動效果 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span>More donations coming in...</span>
        </div>
      </div>
    </div>
  );
} 