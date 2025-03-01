import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchDataRequest, fetchAnswerRequest, updateKnowledgeStatusRequest } from '@/store/interview/slice';
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InterviewPrep() {
    const dispatch = useDispatch();
    const { knowledge, questions, answers, loading } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});

    console.log('knowledge', knowledge);
    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

    const handleFetchAnswer = (question) => {
        if (answers[question]) return;
        dispatch(fetchAnswerRequest(question));
    };

    const handleStatusChange = (rowIndex, status) => {
        dispatch(updateKnowledgeStatusRequest({ rowIndex, status }));
    };

    const toggleCategory = (categoryIndex) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex]
        }));
    };

    const isCategoryCompleted = (items) => {
        return items.every(item => item.status === "Hoàn thành");
    };

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    📚 Knowledge Base
                </h1>
                <p className="text-gray-500">Track your learning progress</p>
            </div>

            <div className="grid gap-6">
                {knowledge.map((category, categoryIndex) => {
                    const isCompleted = isCategoryCompleted(category.items);
                    const isExpanded = expandedCategories[categoryIndex];

                    return (
                        <Card
                            key={categoryIndex}
                            className={cn(
                                "overflow-hidden border-l-4",
                                isCompleted ? "border-l-green-500" : "border-l-blue-500"
                            )}
                        >
                            <CardContent className="p-6">
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => toggleCategory(categoryIndex)}
                                >
                                    {isExpanded ?
                                        <ChevronDown className="w-5 h-5 text-gray-500" /> :
                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                    }
                                    <h2 className="text-2xl font-semibold flex items-center gap-2 flex-1">
                                        {category.category}
                                        <Badge variant="secondary" className="text-xs">
                                            {category.items.length} items
                                        </Badge>
                                        {isCompleted && (
                                            <Badge variant="success" className="text-xs">
                                                <Check className="w-4 h-4 mr-1" />
                                                Completed
                                            </Badge>
                                        )}
                                    </h2>
                                </div>

                                {isExpanded && (
                                    <div className="space-y-4 mt-4">
                                        {category.items.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="group p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                                                        {item.order}
                                                    </span>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center justify-between gap-4">
                                                            <p className="text-gray-800 font-medium">{item.content}</p>
                                                            <Select
                                                                defaultValue={item.status}
                                                                onValueChange={(value) =>
                                                                    handleStatusChange(item.rowIndex, value)
                                                                }
                                                            >
                                                                <SelectTrigger className="w-[140px]">
                                                                    <Badge
                                                                        variant={item.status === "Hoàn thành" ? "success" : "warning"}
                                                                        className="w-full"
                                                                    >
                                                                        {item.status}
                                                                    </Badge>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Hoàn thành">✅ Hoàn thành</SelectItem>
                                                                    <SelectItem value="Đang đợi">⏳ Đang đợi</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        {item.notes && (
                                                            <p className="text-gray-500 text-sm">{item.notes}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="space-y-2 pt-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ❓ Interview Questions
                </h1>
                <p className="text-gray-500">Practice with AI-powered responses</p>
            </div>

            <div className="grid gap-4">
                {questions.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">{item.question}</h2>
                            {item.answer ? (
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{item.answer}</p>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => handleFetchAnswer(item.question)}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
                                    >
                                        {loading ? "Generating..." : "🔍 Get AI Answer"}
                                    </Button>
                                    {answers[item.question] && (
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg mt-4">
                                            {answers[item.question]}
                                        </p>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
