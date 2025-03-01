import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fetchDataRequest } from '@/store/interview/slice';
import Layout from '@/components/Layout';
import { chatWithGPT } from '@/api/chat';
import ReactMarkdown from 'react-markdown';

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

    const handleQuestionClick = async (question, category) => {
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

    return (
        <Layout>
            <div className="container-fluid h-[calc(100vh-4rem)]">
                <div className="grid grid-cols-[320px,1fr] h-full gap-6">
                    {/* Sidebar */}
                    <div className="border-r pr-6 overflow-y-auto">
                        <div className="sticky top-0 bg-white z-10 pb-4">
                            <div className="space-y-2 mb-4">
                                <h2 className="text-xl font-semibold">Interview Questions</h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="text"
                                        placeholder="Search questions..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {questions.map((category, categoryIndex) => {
                                const filteredItems = filterQuestions(category.items || [], searchQuery);
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
                                            <span>{category.category}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {filteredItems.length}
                                            </Badge>
                                        </button>

                                        {expandedCategories[categoryIndex] && (
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
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="py-6 overflow-y-auto">
                        {selectedQuestion ? (
                            <div className="space-y-6">
                                <div className="border-b pb-4">
                                    <h1 className="text-2xl font-semibold">
                                        {selectedQuestion.question}
                                    </h1>
                                </div>

                                <div className="prose max-w-none">
                                    {loading ? (
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <span className="animate-spin">⏳</span>
                                            Generating answer...
                                        </div>
                                    ) : answer ? (
                                        <div className="bg-gray-50 p-6 rounded-lg prose prose-sm max-w-none">
                                            <ReactMarkdown>{answer}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">
                                            Click "Get AI Answer" to see the response.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Select a question from the sidebar to view the answer.</p>
                            </div>
                        )}
                    </div>
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