import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  className?: string;
}

export function SidebarLayout({ sidebar, content, className }: SidebarLayoutProps) {
  return (
    <div className={cn("container-fluid h-[calc(100vh-4rem)]", className)}>
      <div className="grid grid-cols-[320px,1fr] h-full gap-6">
        {/* Sidebar */}
        <aside className={cn(
          "border-r border-gray-200 dark:border-gray-800",
          "bg-gray-50 dark:bg-gray-900",
          "overflow-y-auto",
          "transition-all duration-300 ease-in-out",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
          "scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
          "shadow-sm dark:shadow-gray-800/30"
        )}>
          <div className="h-full p-4 space-y-4">
            {sidebar}
          </div>
        </aside>

        {/* Content */}
        <main className={cn(
          "py-6 px-4",
          "overflow-y-auto",
          "transition-all duration-300 ease-in-out",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
          "scrollbar-track-transparent"
        )}>
          {content}
        </main>
      </div>
    </div>
  );
}