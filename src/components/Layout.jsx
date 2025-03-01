import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
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