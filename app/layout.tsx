import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CTO Security Dashboard",
  description: "Private security monitoring for CTO oversight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            {/* CTO Only Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm font-medium">
              🔒 CTO EYES ONLY — Classified Security Information
            </div>
            
            {/* Main Navigation */}
            <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        CTO Dashboard<span className="text-blue-500 ml-1">•</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Senior VP Global Ops
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>© 2026 Company Operations. All security information classified.</p>
                  <p className="mt-1">Access monitored and logged.</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}