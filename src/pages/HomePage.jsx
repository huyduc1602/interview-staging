import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center space-y-8 pb-16">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-normal">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('home.hero.subtitle')}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 pb-16 max-w-5xl mx-auto">
                    {/* Knowledge Base Card */}
                    <Link
                        to="/knowledge"
                        className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="flex items-start gap-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <BookOpen className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {t('home.features.knowledgeBase.title')}
                                </h3>
                                <p className="text-gray-600">
                                    {t('home.features.knowledgeBase.description')}
                                </p>
                                <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                                    {t('home.features.knowledgeBase.action')} 
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Interview Questions Card */}
                    <Link
                        to="/questions"
                        className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="flex items-start gap-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <Brain className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {t('home.features.interviewQuestions.title')}
                                </h3>
                                <p className="text-gray-600">
                                    {t('home.features.interviewQuestions.description')}
                                </p>
                                <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                                    {t('home.features.interviewQuestions.action')} 
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                                {t('home.stats.knowledgeTopics.value')}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t('home.stats.knowledgeTopics.label')}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                                {t('home.stats.questions.value')}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t('home.stats.questions.label')}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                                {t('home.stats.categories.value')}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t('home.stats.categories.label')}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                                {t('home.stats.aiSupport.value')}
                            </div>
                            <div className="text-sm text-gray-600">
                                {t('home.stats.aiSupport.label')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;