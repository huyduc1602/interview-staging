import { ReactNode } from 'react';

interface SidebarLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export function SidebarLayout({ sidebar, content }: SidebarLayoutProps) {
  return (
    <div className="container-fluid h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-[320px,1fr] h-full gap-6">
        {/* Sidebar */}
        <div className="border-r overflow-y-auto">
          {sidebar}
        </div>
        
        {/* Content */}
        <div className="py-6 overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
}