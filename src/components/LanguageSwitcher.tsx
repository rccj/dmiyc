'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
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
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:block">{currentLanguage?.flag}</span>
        <span className="hidden md:block">{currentLanguage?.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {languages.map((language) => {
              const href = pathname.replace(`/${currentLocale}`, `/${language.code}`);
              return (
                <Link
                  key={language.code}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                    currentLocale === language.code ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 