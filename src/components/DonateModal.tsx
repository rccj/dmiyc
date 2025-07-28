'use client';

import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
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
  const { t } = useTranslations();
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
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 backdrop-enter">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-8 modal-enter">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Heart className="w-5 h-5 mr-3 text-red-400" />
            {t('donateNow')}
          </h2>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 目標用戶 */}
          <div className="text-center p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/30">
            <p className="text-sm text-gray-500 mb-1">Donating to</p>
            <p className="text-lg font-semibold text-gray-800">@{targetUsername}</p>
          </div>

          {/* 預設金額 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-4">
              {t('amount')}
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((predefinedAmount) => (
                <button
                  key={predefinedAmount}
                  type="button"
                  onClick={() => {
                    setAmount(predefinedAmount.toString());
                    // 添加點擊動畫
                    const button = document.activeElement as HTMLElement;
                    button?.classList.add('button-click');
                    setTimeout(() => button?.classList.remove('button-click'), 150);
                  }}
                  className={`p-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 font-medium ${
                    amount === predefinedAmount.toString()
                      ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900'
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
            <label className="block text-sm font-medium text-gray-900 mb-4">
              {t('currency')}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => {
                    setCurrency(curr.code);
                    // 添加點擊動畫
                    const button = document.activeElement as HTMLElement;
                    button?.classList.add('button-click');
                    setTimeout(() => button?.classList.remove('button-click'), 150);
                  }}
                  className={`p-2.5 rounded-xl border transition-all text-sm hover:scale-105 active:scale-95 font-medium ${
                    currency === curr.code
                      ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900'
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
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
            />
            <label htmlFor="anonymous" className="ml-3 text-sm text-gray-900">
              {t('anonymous')}
            </label>
          </div>

          {/* 按鈕 */}
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl border border-gray-400 text-gray-900 hover:bg-gray-50 hover:border-gray-500 transition-all duration-200 font-medium active:scale-95"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0 || loading}
              className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                t('submit')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 