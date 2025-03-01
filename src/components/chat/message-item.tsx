import { MarkdownContent } from '@/components/ui/markdown-content';
import { Button } from '@/components/ui/button';
import { Save, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageItemProps {
  message: {
    role: 'user' | 'assistant' | 'error';
    content: string;
  };
  onSave: () => void;
  loading?: boolean;
}

export function MessageItem({ message, onSave, loading }: MessageItemProps) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  if (loading) {
    return (
      <div className="flex gap-4">
        <div className="flex-1">
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex gap-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex-1 rounded-lg p-4",
        isUser ? "bg-blue-500 text-white" : 
        isError ? "bg-red-50 border border-red-200" :
        "bg-gray-100"
      )}>
        <div className="flex justify-between items-start gap-4">
          {isError ? (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{message.content}</span>
            </div>
          ) : (
            <MarkdownContent content={message.content} />
          )}
          {!isUser && !isError && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className="shrink-0"
            >
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}