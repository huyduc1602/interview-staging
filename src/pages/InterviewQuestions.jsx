import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from '@/store/interview/slice';
import { Layout, SidebarLayout, CategoryHeader } from '@/layouts';
import { chatWithGPT } from '@/api/chat';
import { SearchInput, HighlightText, LoadingSpinner, MarkdownContent } from '@/components/ui';
import { cn } from "@/lib/utils";

export default function InterviewQuestions() {
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");

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

    const renderSidebar = () => (
        <>
            <div className="sticky top-0 bg-white z-10 pb-4 pr-6 pl-6">
                <div className="space-y-2 mb-4">
                    <h2 className="text-xl font-semibold">Interview Questions</h2>
                    <SearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search questions..."
                    />
                </div>
            </div>

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
        <Layout>
            <SidebarLayout
                sidebar={renderSidebar()}
                content={renderContent()}
            />
        </Layout>
    );
}