import { Zap, RefreshCw, Trash2, Stars, Bot, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
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
        <SelectTrigger className="w-[200px] bg-white dark:bg-gray-950">
          <SelectValue placeholder={t(`${type}.models.select`)} />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-950">
          {/* OpenAI Models */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              OpenAI
            </SelectLabel>
            <SelectItem value="gpt-3.5-turbo-0125">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>GPT-3.5 Turbo</span>
              </div>
            </SelectItem>
            <SelectItem value="gpt-4-turbo-preview">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>GPT-4 Turbo</span>
                <span className="ml-auto text-xs text-muted-foreground">Premium</span>
              </div>
            </SelectItem>
          </SelectGroup>

          {/* Free Alternative Models */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              Free Alternatives
            </SelectLabel>
            <SelectItem value="gemini-pro">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-500" />
                <span>Gemini Pro</span>
                <span className="ml-auto text-xs text-green-500">Google</span>
              </div>
            </SelectItem>
            <SelectItem value="mistral-small">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />
                <span>Mistral Small</span>
                <span className="ml-auto text-xs text-purple-500">Mistral</span>
              </div>
            </SelectItem>
            <SelectItem value="openchat-3.5">
              <div className="flex items-center gap-2">
                <Stars className="w-4 h-4 text-orange-500" />
                <span>OpenChat 3.5</span>
                <span className="ml-auto text-xs text-orange-500">Free</span>
              </div>
            </SelectItem>
          </SelectGroup>
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