'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Heart } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Card from './ui/Card';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUsername: string;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'USD' },
  { code: 'TWD', symbol: 'NT$', name: 'TWD' },
  { code: 'CNY', symbol: '¥', name: 'CNY' },
  { code: 'AED', symbol: 'د.إ', name: 'AED' },
  { code: 'USDT', symbol: '₮', name: 'USDT' }
];

const predefinedAmounts = [1, 5, 10];

export default function DonateModal({ isOpen, onClose, targetUsername }: DonateModalProps) {
  const t = useTranslations('common');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    
    // TODO: 實作金流串接
    console.log('Donation:', {
      amount: parseFloat(amount),
      currency,
      message,
      isAnonymous,
      targetUsername
    });

    // 模擬 API 呼叫
    setTimeout(() => {
      setLoading(false);
      onClose();
      // TODO: 導向成功頁面
    }, 2000);
  };

  const selectedCurrency = currencies.find(c => c.code === currency);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            {t('donateNow')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 目標用戶 */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Donating to</p>
            <p className="text-lg font-semibold text-gray-900">@{targetUsername}</p>
          </div>

          {/* 預設金額 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('amount')}
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {predefinedAmounts.map((predefinedAmount) => (
                <button
                  key={predefinedAmount}
                  type="button"
                  onClick={() => setAmount(predefinedAmount.toString())}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    amount === predefinedAmount.toString()
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {selectedCurrency?.symbol}{predefinedAmount}
                </button>
              ))}
            </div>
            
            <Input
              type="number"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
            />
          </div>

          {/* 幣別選擇 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('currency')}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => setCurrency(curr.code)}
                  className={`p-2 rounded-lg border-2 transition-all text-sm ${
                    currency === curr.code
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {curr.name}
                </button>
              ))}
            </div>
          </div>

          {/* 留言 */}
          <div>
            <Textarea
              label={t('yourMessage')}
              placeholder="Say something nice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
              rows={3}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {message.length}/100
            </div>
          </div>

          {/* 匿名選項 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
              {t('anonymous')}
            </label>
          </div>

          {/* 按鈕 */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1"
            >
              {t('submit')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 