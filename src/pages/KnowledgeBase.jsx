import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchDataRequest, updateKnowledgeStatusRequest } from '@/store/interview/slice';
import Layout from '@/components/Layout';

export default function KnowledgeBase() {
    const dispatch = useDispatch();
    const { knowledge } = useSelector((state) => state.interview);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

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
        <Layout>
            <div className="container-fluid py-8">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="gradient-text">📚 Knowledge Base</h1>
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
                                    <CardContent className="p-0">
                                        <div
                                            className="flex items-center p-6 cursor-pointer hover:bg-gray-50"
                                            onClick={() => toggleCategory(categoryIndex)}
                                        >
                                            {isExpanded ? 
                                                <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                                                <ChevronRight className="w-5 h-5 text-gray-500" />
                                            }
                                            <div className="flex items-center gap-2 ml-2 flex-1">
                                                <span className="text-xl font-semibold">{category.category}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {category.items.length} items
                                                </Badge>
                                                {isCompleted && (
                                                    <Badge variant="success" className="text-xs">
                                                        <Check className="w-4 h-4 mr-1" />
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="border-t">
                                                {category.items.map((item, itemIndex) => (
                                                    <div 
                                                        key={itemIndex} 
                                                        className="p-6 border-b last:border-b-0 hover:bg-gray-50"
                                                    >
                                                        <div className="flex items-center justify-between gap-4">
                                                            <span className="text-gray-800">{item.content}</span>
                                                            <Select 
                                                                value={item.status} 
                                                                onValueChange={(value) => handleStatusChange(itemIndex, value)}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <Badge 
                                                                        variant={item.status === "Hoàn thành" ? "success" : "secondary"}
                                                                        className="w-full"
                                                                    >
                                                                        {item.status}
                                                                    </Badge>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Chưa học">⚪️ Chưa học</SelectItem>
                                                                    <SelectItem value="Đang học">🔄 Đang học</SelectItem>
                                                                    <SelectItem value="Hoàn thành">✅ Hoàn thành</SelectItem>
                                                                </SelectContent>
                                                            </Select>
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
                </div>
            </div>
        </Layout>
    );
}