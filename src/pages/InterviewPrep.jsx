import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchDataRequest, fetchAnswerRequest } from '@/store/interview/slice';

export default function InterviewPrep() {
    const dispatch = useDispatch();
    const { knowledge, questions, answers, loading } = useSelector((state) => state.interview);

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch]);

    const handleFetchAnswer = (question) => {
        if (answers[question]) return;
        dispatch(fetchAnswerRequest(question));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">📚 Danh mục kiến thức</h1>
            {knowledge.map((item, index) => (
                <Card key={index} className="p-4">
                    <CardContent>
                        <h2 className="text-xl font-semibold">{item.category}</h2>
                        <p className="text-gray-600">{item.notes}</p>
                    </CardContent>
                </Card>
            ))}

            <h1 className="text-2xl font-bold">❓ Câu hỏi phỏng vấn</h1>
            {questions.map((item, index) => (
                <Card key={index} className="p-4">
                    <CardContent>
                        <h2 className="text-lg font-semibold">{item.question}</h2>
                        {item.answer ? (
                            <p className="text-gray-600">{item.answer}</p>
                        ) : (
                            <>
                                <Button
                                    onClick={() => handleFetchAnswer(item.question)}
                                    disabled={loading}
                                >
                                    🔍 Lấy câu trả lời từ AI
                                </Button>
                                {answers[item.question] && (
                                    <p className="text-gray-600 mt-2">{answers[item.question]}</p>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
