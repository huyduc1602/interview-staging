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
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className={cn("flex items-center justify-center p-6", className)}>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn("p-6", className)}>
                <div className="text-red-500 whitespace-pre-wrap">{error}</div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className={cn("p-6", className)}>
                <div className="text-gray-500">
                    {emptyMessage || t('common.selectTopic')}
                </div>
            </div>
        );
    }

    return (
        <article className={cn("p-6", className)}>
            <div className="prose prose-slate dark:prose-invert prose-pre:bg-gray-800 prose-pre:text-gray-100 max-w-none">
                <MarkdownContent content={content} />
            </div>
        </article>
    );
}