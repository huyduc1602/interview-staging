import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHome && (
        <header className="sticky top-0 z-50 bg-white border-b">
          <div className="container-fluid h-16 flex items-center">
            {/* Header content */}
          </div>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}