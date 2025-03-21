import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from '../button';
import SelectCategory from '@/components/ui/select/selectMenu';

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: { content: string } | null;
}

export function SaveDialog({ isOpen, onClose, message }: SaveDialogProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  if (!isOpen || !message) return null;

  const handleSave = () => {
    if (!category) return;
    // Dispatch action to add question
    dispatch({
      type: 'interview/addQuestion',
      payload: {
        category,
        question: message.content
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {t('chat.saveAsQuestion')}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <SelectCategory
            value={category}
            onValueChange={setCategory}
            placeholder={t('chat.selectCategory')}
            className="w-[95%] max-w-md"
          />

          <div className="border rounded p-4 bg-gray-50">
            <p className="text-sm text-gray-600">{message.content}</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave} disabled={!category}>
              {t('common.save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}