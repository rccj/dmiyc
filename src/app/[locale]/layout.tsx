import '../globals.css';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
          {/* Header */}
          <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">D</span>
                    </div>
                    <h1 className="text-lg font-medium text-gray-800 tracking-tight">
                      Donate me if you can
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main>{children}</main>
          
          {/* Footer */}
          <footer className="bg-white/70 backdrop-blur-xl border-t border-gray-200/50 mt-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
              <div className="text-center text-gray-500">
                <p className="text-sm font-medium">&copy; 2024 Donate me if you can. You get nothing.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 