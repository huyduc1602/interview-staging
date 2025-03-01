import { Zap, RefreshCw, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onRegenerate: () => void;
  onClearCache: () => void;
  loading: boolean;
  disabled: boolean;
  type?: 'questions' | 'knowledge' | 'chat';
}

export function ModelSelector({
  selectedModel,
  onModelChange,
  onRegenerate,
  onClearCache,
  loading,
  disabled,
  type
}: ModelSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 mb-4">
      <Select
        value={selectedModel}
        onValueChange={onModelChange}
        disabled={loading}
      >
        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950">
          <SelectValue placeholder={t(`${type}.models.select`)} />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-950">
          <SelectItem value="gpt-3.5-turbo-0125" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>GPT-3.5 Turbo</span>
            </div>
          </SelectItem>
          <SelectItem value="gpt-4-turbo-preview" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>GPT-4 Turbo</span>
              <span className="ml-auto text-xs text-muted-foreground">Premium</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={onRegenerate}
        disabled={disabled || loading}
        className="h-10 w-10"
        title={t(`${type}.actions.regenerate`)}
      >
        <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onClearCache}
        className="h-10 w-10"
        title={t(`${type}.actions.clearCache`)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}