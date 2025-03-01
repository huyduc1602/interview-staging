import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchDataRequest } from '@/store/interview/slice';
import Layout from '@/components/Layout';

export default function InterviewQuestions() {
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

    const toggleCategory = (categoryIndex) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex]
        }));
    };

    return (
        <Layout>
            <div className="container-fluid py-8">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="gradient-text">❓ Interview Questions</h1>
                        <p className="text-gray-500">Practice with AI-powered responses</p>
                    </div>

                    <div className="grid gap-6">
                        {questions.map((category, categoryIndex) => (
                            <Card
                                key={categoryIndex}
                                className="overflow-hidden border-l-4 border-l-purple-500"
                            >
                                <CardContent className="p-0">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
                                        onClick={() => toggleCategory(categoryIndex)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-semibold">{category.category}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {category.items?.length || 0} questions
                                            </Badge>
                                        </div>
                                        {expandedCategories[categoryIndex] ? (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-gray-500" />
                                        )}
                                    </Button>

                                    {expandedCategories[categoryIndex] && (
                                        <div className="border-t">
                                            {category.items?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="p-6 border-b last:border-b-0 hover:bg-gray-50"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <Badge
                                                            variant="outline"
                                                            className="px-2 py-1 rounded-full"
                                                        >
                                                            {index + 1}
                                                        </Badge>
                                                        <div className="flex-1 space-y-4">
                                                            <p className="text-gray-800">
                                                                {item.question}
                                                            </p>
                                                            {item.answer && (
                                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                                    <p className="text-gray-600">
                                                                        {item.answer}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {!item.answer && (
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                                                >
                                                                    Get AI Answer
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}