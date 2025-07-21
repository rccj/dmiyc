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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Donate me if you can
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="p-8">{children}</main>
          
          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2024 Donate me if you can. You get nothing.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 