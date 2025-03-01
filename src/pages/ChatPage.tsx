import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/layouts';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { ModelSelector } from '@/components/ui/model-selector';
import { SaveDialog } from '@/components/ui/save-dialog';
import { MessageItem } from '@/components/chat/message-item';
import { SendHorizontal, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

export default function ChatPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    loading,
    selectedModel,
    setSelectedModel,
    generateAnswer,
  } = useChat({ type: 'chat' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);

    try {
      const response = await generateAnswer(input, selectedModel);
      
      if (!response) {
        throw new Error(t('chat.errors.noResponse'));
      }

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        role: 'error',
        content: err instanceof Error ? err.message : t('chat.errors.unknown')
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(errorMessage.content);
    }
  };

  const handleSave = (message: Message) => {
    if (message.role === 'error') return;
    setSelectedMessage(message);
    setIsSaveDialogOpen(true);
  };

  const handleRetry = async () => {
    if (!messages.length) return;
    const lastUserMessage = [...messages].reverse()
      .find(m => m.role === 'user');
    
    if (lastUserMessage) {
      // Remove last error message if exists
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
      await handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onRegenerate={handleRetry}
            onClearCache={() => {
              setMessages([]);
              setError(null);
            }}
            loading={loading}
            disabled={loading}
            type="chat"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              message={message}
              onSave={() => handleSave(message)}
              loading={loading && index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.inputPlaceholder')}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim()}
              variant={loading ? "outline" : "default"}
            >
              <SendHorizontal className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </form>
      </div>

      <SaveDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        message={selectedMessage}
      />
    </Layout>
  );
}