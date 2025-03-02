import { LoadingSpinner } from '@/components/ui';
import { MarkdownContent } from '@/components/ui/markdownContent';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface AIResponseDisplayProps {
    loading: boolean;
    content: string | null;
    error: string | null;
    emptyMessage?: string;
    className?: string;
}

export function AIResponseDisplay({
    loading,
    content,
    error,
    emptyMessage,
    className
}: AIResponseDisplayProps) {

    // Show loading state
    if (loading) {
        return (
            <div className={cn("flex items-center justify-center p-4", className)}>
                <LoadingSpinner />
            </div>
        );
    }

    // Show error if present
    if (error) {
        return (
            <div className={cn("text-red-500 p-4", className)}>
                {error}
            </div>
        );
    }

    // Show content if available
    if (content) {
        return (
            <div className={cn("prose dark:prose-invert max-w-none p-4", className)}>
                <MarkdownContent content={content} />
            </div>
        );
    }

    // Show empty message
    return (
        <div className={cn("text-gray-500 p-4", className)}>
            {emptyMessage || 'No content to display'}
        </div>
    );
}