import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from '@/store/interview/slice';
import { useChat } from '@/hooks/useChat';
import { useAIResponse } from '@/hooks/useAIResponse';
import { Layout, SidebarLayout, CategoryHeader } from '@/layouts';
import { SearchInput, HighlightText } from '@/components/ui';
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { ModelSelector } from '@/components/ui/model-selector';
import { AIResponseDisplay } from '@/components/ai/AIResponseDisplay';

export default function KnowledgeBase() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { knowledge } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const {
        loading,
        selectedModel,
        setSelectedModel,
        generateAnswer
    } = useChat({ type: 'knowledge' });

    const {
        handleGenerateAnswer,
        error
    } = useAIResponse({
        generateAnswer,
        onSuccess: (content) => {
            if (selectedItem) {
                setSelectedItem({ ...selectedItem, answer: content });
            }
        },
        onError: () => {
            setSelectedItem(null);
        }
    });

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
        try {
            await handleGenerateAnswer(item.content);
        } catch (error) {
            console.error('Failed to generate answer:', error);
        }
    };

    const handleRegenerateAnswer = async () => {
        if (!selectedItem) return;
        await generateAnswer(selectedItem.content);
    };

    const renderModelSelector = () => (
        <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onRegenerate={handleRegenerateAnswer}
            loading={loading}
            disabled={!selectedItem}
            type="knowledge"
        />
    );

    const renderSidebar = () => (
        <>
            <div className="sticky top-0 bg-white z-10 pb-4 pr-6 pl-6">
                <div className="space-y-2 mb-4">
                    <h2 className="text-xl font-semibold">
                        {t('knowledgeBase.title')}
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <SearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('knowledgeBase.searchPlaceholder')}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {knowledge.map((category, categoryIndex) => {
                    const filteredItems = filterItems(category.items || [], searchQuery);
                    if (filteredItems.length === 0 && searchQuery) return null;

                    return (
                        <div key={categoryIndex} className="space-y-2">
                            <CategoryHeader
                                isExpanded={expandedCategories[categoryIndex]}
                                title={category.category}
                                itemCount={filteredItems.length}
                                onClick={() => toggleCategory(categoryIndex)}
                            />
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
        </>
    );

    const renderContent = () => (
        <div className="py-6 overflow-y-auto">
            {selectedItem ? (
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h1 className="text-2xl font-semibold">
                            {selectedItem.content}
                        </h1>
                        {renderModelSelector()}
                    </div>
                    <div className="rounded-lg bg-white shadow">
                        <AIResponseDisplay
                            loading={loading}
                            content={selectedItem?.answer || null}
                            error={error}
                            emptyMessage={t('knowledge.selectTopic')}
                        />
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
            <SidebarLayout
                sidebar={renderSidebar()}
                content={renderContent()}
            />
        </Layout>
    );
}