'use client';

import { usePathname } from 'next/navigation';

// 簡化的翻譯字典
const translations: Record<string, Record<string, string>> = {
  'en': {
    'siteTitle': 'Donate me if you can',
    'tagline': 'You get nothing. They get glory.',
    'totalDonated': 'Total donated: {{amount}} USD',
    'recentDonations': 'Recent donations',
    'noDonationsYet': 'No donations yet',
    'anonymous': 'Anonymous',
  },
  'zh-TW': {
    'siteTitle': '如果可以請捐給我',
    'tagline': '你什麼都得不到。他們得到榮耀。',
    'totalDonated': '總捐款: {{amount}} USD',
    'recentDonations': '最近捐款',
    'noDonationsYet': '暫無捐款',
    'anonymous': '匿名',
  },
  'zh-CN': {
    'siteTitle': '如果可以请捐给我',
    'tagline': '你什么都得不到。他们得到荣耀。',
    'totalDonated': '总捐款: {{amount}} USD',
    'recentDonations': '最近捐款',
    'noDonationsYet': '暂无捐款',
    'anonymous': '匿名',
  },
  'ar': {
    'siteTitle': 'تبرع لي إذا كنت تستطيع',
    'tagline': 'لن تحصل على شيء. سيحصلون على المجد.',
    'totalDonated': 'إجمالي التبرعات: {{amount}} USD',
    'recentDonations': 'التبرعات الأخيرة',
    'noDonationsYet': 'لا توجد تبرعات بعد',
    'anonymous': 'مجهول',
  }
};

export function useTranslations() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  function t(key: string, params?: Record<string, string>): string {
    let text = translations[locale]?.[key] || translations['en'][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{{${paramKey}}}`, value);
      });
    }
    
    return text;
  }
  
  return { t, locale };
}