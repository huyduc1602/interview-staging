import { LogOut, User, Github } from 'lucide-react';
import { Mail, Laptop } from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ButtonBase } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Helper function to get provider icon
const ProviderIcon = ({ provider }: { provider?: string }) => {
  switch (provider?.toLowerCase()) {
    case 'github':
      return <Github className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-300" />;
    case 'google':
      return <Mail className="h-4 w-4 mr-1 text-red-500" />;
    default:
      return <Laptop className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />;
  }
};

export function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [currentProvider, setCurrentProvider] = useState<string | undefined>(user?.provider);

  // Update currentProvider when user.provider changes
  useEffect(() => {
    setCurrentProvider(user?.provider);
  }, [user?.provider]);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonBase variant="ghost" size="sm" className="flex items-center gap-2 px-0 w-fit sm:px-0 sm-w-full">
          <User className="h-4 w-4" />
          <div className="flex items-center max-w-[150px]">
            {currentProvider && <ProviderIcon provider={currentProvider} />}
            <span className="md:hidden">{user.email}</span>
          </div>
        </ButtonBase>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 md:w-auto p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
        <DropdownMenuItem
          onClick={logout}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-sm",
            "text-red-600 dark:text-red-400",
            "hover:bg-red-50 dark:hover:bg-red-900/50",
            "focus:bg-red-50 dark:focus:bg-red-900/50",
            "cursor-pointer"
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('auth.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}