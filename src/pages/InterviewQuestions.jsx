import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from '@/store/interview/slice';
import { Layout, SidebarLayout, CategoryHeader } from '@/layouts';
import { chatWithGPT } from '@/api/chat';
import { SearchInput, HighlightText, LoadingSpinner, MarkdownContent } from '@/components/ui';
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, ChevronUp, Shuffle, Tag, X } from "lucide-react";
import { TooltipProvider, Tooltip } from "@/components/ui/tooltip";

export default function InterviewQuestions() {
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [isTagsExpanded, setIsTagsExpanded] = useState(false);

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

    const toggleCategory = (categoryIndex) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex]
        }));
    };

    const filterQuestions = (items, query) => {
        if (!query) return items;
        return items.filter(item =>
            item.question.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleQuestionClick = async (question) => {
        setSelectedQuestion(question);
        setLoading(true);
        setAnswer("");

        try {
            const prompt = `Answer this interview question in detail: ${question.question}\nProvide a comprehensive explanation with examples if applicable.`;
            const response = await chatWithGPT(prompt);
            setAnswer(response);
        } catch (error) {
            console.error('Failed to fetch answer:', error);
            setAnswer("Sorry, failed to generate response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategories(prev => {
            const isSelected = prev.includes(category);
            if (isSelected) {
                return prev.filter(c => c !== category);
            }
            return [...prev, category];
        });
    };

    const shuffleQuestions = () => {
        const allQuestions = questions
            .filter(category => selectedCategories.includes(category.category))
            .flatMap(category =>
                category.items.map(item => ({
                    ...item,
                    category: category.category
                }))
            );

        const shuffled = [...allQuestions]
            .sort(() => Math.random() - 0.5)
            .map((question, index) => ({
                ...question,
                orderNumber: index + 1
            }));

        setShuffledQuestions(shuffled);
        setSelectedQuestion(null);
        setAnswer("");
    };

    const renderCategoryTags = () => {
        const selectedCount = selectedCategories.length;
        const totalCount = questions.length;

        if (!isTagsExpanded) {
            return (
                <div className="flex items-center gap-2">
                    {selectedCategories.slice(0, 2).map((category, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-gray-200"
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category} ×
                        </Badge>
                    ))}
                    {selectedCount > 2 && (
                        <Badge variant="outline">
                            +{selectedCount - 2} more
                        </Badge>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => setIsTagsExpanded(true)}
                    >
                        <Tag className="h-4 w-4 mr-2" />
                        {selectedCount}/{totalCount} categories
                    </Button>
                </div>
            );
        }

        return (
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Select Categories ({selectedCount}/{totalCount})
                    </span>
                    <Tooltip content="Collapse category selection">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsTagsExpanded(false)}
                        >
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                    </Tooltip>
                </div>
                <div className="flex flex-wrap gap-2">
                    {questions.map((category, index) => (
                        <Badge
                            key={index}
                            variant={selectedCategories.includes(category.category) ? "default" : "outline"}
                            className={cn(
                                "cursor-pointer transition-colors",
                                selectedCategories.includes(category.category)
                                    ? "hover:bg-primary/80"
                                    : "hover:bg-gray-100"
                            )}
                            onClick={() => handleCategorySelect(category.category)}
                        >
                            {category.category}
                            {selectedCategories.includes(category.category) && (
                                <X className="h-3 w-3 ml-1 inline-block" />
                            )}
                        </Badge>
                    ))}
                </div>
            </div>
        );
    };

    const renderSidebar = () => (
        <>
            <div className="sticky top-0 bg-white z-10 pb-4 pr-6 pl-6">
                <div className="space-y-4 mb-4">
                    <h2 className="text-xl font-semibold">Interview Questions</h2>
                    <div className="flex items-center justify-between">
                        <Tooltip content="Search through all questions">
                            <div>
                                <SearchInput
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search questions..."
                                />
                            </div>
                        </Tooltip>
                        <Tooltip content="Randomly shuffle selected category questions">
                            <span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={shuffleQuestions}
                                    disabled={selectedCategories.length === 0}
                                    className="ml-2"
                                >
                                    <Shuffle className="h-4 w-4" />
                                </Button>
                            </span>
                        </Tooltip>
                    </div>
                    {renderCategoryTags()}
                </div>
            </div>

            <div className="space-y-4">
                {shuffledQuestions.length > 0 ? (
                    <div className="space-y-2">
                        {shuffledQuestions.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestionClick(item)}
                                className={cn(
                                    "w-full text-left px-4 py-2 rounded text-sm",
                                    selectedQuestion?.question === item.question
                                        ? "bg-purple-100 text-purple-900"
                                        : "hover:bg-gray-100"
                                )}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-500">
                                        {item.orderNumber}.
                                    </span>
                                    {searchQuery ? (
                                        <HighlightText
                                            text={item.question}
                                            search={searchQuery}
                                        />
                                    ) : (
                                        item.question
                                    )}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {item.category}
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((category, categoryIndex) => {
                            const filteredItems = filterQuestions(category.items || [], searchQuery);
                            if (filteredItems.length === 0 && searchQuery) return null;

                            return (
                                <div key={categoryIndex} className="space-y-2">
                                    <CategoryHeader
                                        isExpanded={expandedCategories[categoryIndex]}
                                        title={category.category}
                                        itemCount={filteredItems.length}
                                        onClick={() => toggleCategory(categoryIndex)}
                                    />
                                    <div className="ml-6 space-y-1">
                                        {filteredItems.map((item, itemIndex) => (
                                            <button
                                                key={itemIndex}
                                                onClick={() => handleQuestionClick(item, category.category)}
                                                className={cn(
                                                    "w-full text-left px-2 py-1 rounded text-sm",
                                                    selectedQuestion?.question === item.question
                                                        ? "bg-purple-100 text-purple-900"
                                                        : "hover:bg-gray-100"
                                                )}
                                            >
                                                {searchQuery ? (
                                                    <HighlightText
                                                        text={item.question}
                                                        search={searchQuery}
                                                    />
                                                ) : (
                                                    item.question
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );

    const renderContent = () => (
        selectedQuestion ? (
            <div className="space-y-6" >
                <div className="border-b pb-4">
                    <h1 className="text-2xl font-semibold">
                        {selectedQuestion.question}
                    </h1>
                </div>

                <div className="prose max-w-none">
                    {loading ? (
                        <LoadingSpinner />
                    ) : answer ? (
                        <MarkdownContent content={answer} />
                    ) : (
                        <p className="text-gray-500">
                            Select a question to view the answer.
                        </p>
                    )}
                </div>
            </div>
        ) : (
            <div className="text-center text-gray-500">
                <p>Select a question from the sidebar to view the answer.</p>
            </div>
        )
    );

    return (
        <TooltipProvider>
            <Layout>
                <SidebarLayout
                    sidebar={renderSidebar()}
                    content={renderContent()}
                />
            </Layout>
        </TooltipProvider>
    );
}