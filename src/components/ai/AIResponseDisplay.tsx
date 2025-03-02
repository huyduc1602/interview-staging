import { LoadingSpinner } from '@/components/ui';
import { MarkdownContent } from '@/components/ui/markdown-content';
import { useTranslation } from 'react-i18next';

interface AIResponseDisplayProps {
  loading: boolean;
  content: string | null;
  error: string | null;
  emptyMessage?: string;
}

export function AIResponseDisplay({ 
  loading, 
  content, 
  error,
  emptyMessage 
}: AIResponseDisplayProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!content) {
    return (
      <p className="p-6 text-gray-500">
        {emptyMessage || t('common.selectTopic')}
      </p>
    );
  }

  return (
    <MarkdownContent
      content={content}
      className="p-6"
    />
  );
}