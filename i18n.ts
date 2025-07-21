import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['zh-TW', 'zh-CN', 'en', 'ar'] as const;

export default getRequestConfig(async ({locale}) => {
  if (!locale || !locales.includes(locale as typeof locales[number])) notFound();

  return {
    locale,
    messages: (await import(`./src/locales/${locale}/common.json`)).default
  };
}); 