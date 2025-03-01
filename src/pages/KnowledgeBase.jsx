import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest, setCachedAnswer, clearCachedAnswers } from '@/store/interview/slice';
import { Layout } from '@/layouts';
import { chatWithGPT } from '@/api/chat';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search, RefreshCw, Zap, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarkdownContent } from '@/components/ui/markdown-content';
import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function KnowledgeBase() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { knowledge, cachedAnswers } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

    const toggleCategory = (categoryIndex) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex]
        }));
    };

    const filterItems = (items, query) => {
        if (!query) return items;
        return items.filter(item =>
            item.content.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleItemClick = async (item) => {
        setSelectedItem(item);
        setLoading(true);
        setAnswer("");

        const itemId = item.content.toLowerCase().trim();
        const currentLanguage = i18n.language;
        const cachedAnswer = cachedAnswers[currentLanguage]?.knowledge?.[itemId];

        if (cachedAnswer) {
            setAnswer(cachedAnswer);
            setLoading(false);
            return;
        }

        try {
            const prompt = t('knowledgeBase.prompts.chatInstruction', {
                topic: item.content
            });

            const response = await chatWithGPT(prompt, {
                language: currentLanguage,
                modelType: selectedModel
            });

            dispatch(setCachedAnswer({
                language: currentLanguage,
                questionId: itemId,
                answer: response,
                type: 'knowledge'
            }));

            setAnswer(response);
        } catch (error) {
            console.error('Failed to fetch answer:', error);
            if (error.message === 'API_RATE_LIMIT') {
                setAnswer(t('knowledgeBase.messages.rateLimitError'));
            } else {
                setAnswer(t('knowledgeBase.messages.error'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateAnswer = async () => {
        if (!selectedItem) return;
        setLoading(true);
        setAnswer("");

        try {
            const prompt = t('knowledgeBase.prompts.chatInstruction', {
                topic: selectedItem.content
            });

            const response = await chatWithGPT(prompt, {
                language: i18n.language,
                modelType: selectedModel
            });

            dispatch(setCachedAnswer({
                language: i18n.language,
                questionId: selectedItem.content.toLowerCase().trim(),
                answer: response
            }));

            setAnswer(response);
        } catch (error) {
            console.error('Failed to regenerate answer:', error);
            if (error.message === 'API_RATE_LIMIT') {
                setAnswer(t('knowledgeBase.messages.rateLimitError'));
            } else {
                setAnswer(t('knowledgeBase.messages.error'));
            }
        } finally {
            setLoading(false);
        }
    };

    const renderModelSelector = () => (
        <div className="flex items-center gap-2 mb-4">
            <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={loading}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('knowledgeBase.models.select')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>GPT-3.5 Turbo</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="gpt-4-turbo-preview">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>GPT-4 Turbo</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button
                variant="outline"
                size="icon"
                onClick={handleRegenerateAnswer}
                disabled={!selectedItem || loading}
                className="h-10 w-10"
                title={t('knowledgeBase.actions.regenerate')}
            >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    dispatch(clearCachedAnswers());
                    setAnswer("");
                }}
                className="h-10 w-10"
                title={t('knowledgeBase.actions.clearCache')}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );

    const renderContent = () => (
        <div className="py-6 overflow-y-auto">
            {selectedItem ? (
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h1 className="text-2xl font-semibold">
                            {selectedItem.content}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant={
                                selectedItem.status === t('knowledgeBase.status.completed')
                                    ? "success"
                                    : "secondary"
                            }>
                                {t(`knowledgeBase.status.${selectedItem.status.toLowerCase()}`)}
                            </Badge>
                        </div>
                        {renderModelSelector()}
                    </div>

                    <div className="rounded-lg bg-white shadow">
                        {loading ? (
                            <div className="p-6 flex items-center gap-2 text-gray-500">
                                <span className="animate-spin">⏳</span>
                                {t('knowledgeBase.messages.loading')}
                            </div>
                        ) : answer ? (
                            <MarkdownContent
                                content={answer}
                                className="p-6"
                            />
                        ) : (
                            <p className="p-6 text-gray-500">
                                {t('knowledgeBase.messages.selectTopic')}
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>{t('knowledgeBase.messages.selectFromSidebar')}</p>
                </div>
            )}
        </div>
    );

    return (
        <Layout>
            <div className="container-fluid h-[calc(100vh-4rem)]">
                <div className="grid grid-cols-[320px,1fr] h-full gap-6">
                    {/* Sidebar */}
                    <div className="border-r overflow-y-auto">
                        <div className="sticky top-0 bg-white z-10 pb-4 pr-6 pl-6">
                            <div className="space-y-2 mb-4">
                                <h2 className="text-xl font-semibold">
                                    {t('knowledgeBase.title')}
                                </h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="text"
                                        placeholder={t('knowledgeBase.searchPlaceholder')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {knowledge.map((category, categoryIndex) => {
                                const filteredItems = filterItems(category.items, searchQuery);
                                if (filteredItems.length === 0 && searchQuery) return null;

                                return (
                                    <div key={categoryIndex} className="space-y-2">
                                        <button
                                            onClick={() => toggleCategory(categoryIndex)}
                                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                                        >
                                            {expandedCategories[categoryIndex] ?
                                                <ChevronDown className="h-4 w-4" /> :
                                                <ChevronRight className="h-4 w-4" />
                                            }
                                            {category.category}
                                        </button>

                                        {expandedCategories[categoryIndex] && (
                                            <div className="ml-6 space-y-1">
                                                {filteredItems.map((item, itemIndex) => (
                                                    <button
                                                        key={itemIndex}
                                                        onClick={() => handleItemClick(item)}
                                                        className={cn(
                                                            "w-full text-left px-2 py-1 rounded text-sm",
                                                            selectedItem?.content === item.content
                                                                ? "bg-purple-100 text-purple-900"
                                                                : "hover:bg-gray-100"
                                                        )}
                                                    >
                                                        {searchQuery ? (
                                                            <HighlightText
                                                                text={item.content}
                                                                search={searchQuery}
                                                            />
                                                        ) : (
                                                            item.content
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    {renderContent()}
                </div>
            </div>
        </Layout>
    );
}

function HighlightText({ text, search }) {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <span key={i} className="bg-yellow-100 px-1 rounded">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
}