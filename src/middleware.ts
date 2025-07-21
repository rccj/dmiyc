import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['zh-TW', 'zh-CN', 'en', 'ar'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 