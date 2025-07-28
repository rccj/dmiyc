'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // 從路徑中提取當前語言
  const currentLocale = pathname.split('/')[1] || 'en';
  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/70 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 active:scale-95"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{currentLanguage?.flag}</span>
        <span className="text-sm text-gray-600 hidden sm:block">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-3 z-50">
          {languages.map((language) => {
            const href = pathname.replace(`/${currentLocale}`, `/${language.code}`);
            return (
              <Link
                key={language.code}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50/80 transition-all duration-150 active:scale-95 ${
                  currentLocale === language.code ? 'bg-gray-100/80 text-gray-900 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-xs text-gray-500">{language.code.toUpperCase()}</span>
                </div>
                {currentLocale === language.code && (
                  <div className="ml-auto w-2 h-2 bg-gray-600 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
} 