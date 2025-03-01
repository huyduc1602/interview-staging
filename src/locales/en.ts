export default {
  common: {
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    selectTopic: 'Select a topic to get detailed information.',
    generateAnswer: 'Generating answer...',
  },
  nav: {
    home: 'Interview Hub',
    knowledgeBase: '📚 Knowledge Base',
    interviewQuestions: '❓ Interview Questions',
    chat: 'Chat with ChatGPT',
  },
  home: {
    hero: {
      title: 'Interview Preparation Hub',
      subtitle: 'Your comprehensive platform for mastering technical interviews. Track your progress, practice with AI-powered responses, and prepare effectively.',
    },
    features: {
      knowledgeBase: {
        title: 'Knowledge Base',
        description: 'Track your learning progress across different topics and mark your understanding level.',
        action: 'Explore Knowledge Base',
      },
      interviewQuestions: {
        title: 'Interview Questions',
        description: 'Practice with our curated list of technical questions and get AI-powered responses.',
        action: 'Start Practicing',
      },
    },
    stats: {
      knowledgeTopics: {
        value: '100+',
        label: 'Knowledge Topics',
      },
      questions: {
        value: '500+',
        label: 'Interview Questions',
      },
      categories: {
        value: '7',
        label: 'Categories',
      },
      aiSupport: {
        value: '24/7',
        label: 'AI Support',
      },
    },
  },
  knowledgeBase: {
    title: 'Knowledge Base',
    searchPlaceholder: 'Search...',
    status: {
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      notStarted: 'Not Started'
    },
    messages: {
      loading: 'Generating explanation...',
      selectTopic: 'Select a topic to get detailed information.',
      selectFromSidebar: 'Select a knowledge item from the sidebar to view details.',
      error: 'Failed to generate explanation. Please try again.',
      rateLimitError: 'API rate limit exceeded. Please try again later.',
      cacheClearedSuccess: 'All cached content has been cleared',
      cacheClearError: 'Failed to clear cached content'
    },
    actions: {
      getAnswer: 'Get AI Answer',
      regenerate: 'Regenerate explanation',
      clearCache: 'Clear cached content'
    },
    prompts: {
      chatInstruction: 'Provide a detailed explanation of this topic: {{topic}}'
    },
    models: {
      select: 'Select Model'
    }
  },
  interviewQuestions: {
    title: 'Interview Questions',
    searchPlaceholder: 'Search questions...',
    tooltips: {
      search: 'Search through all questions',
      shuffle: 'Randomly shuffle selected category questions',
      collapse: 'Collapse category selection'
    },
    categories: {
      select: 'Select Categories',
      selected: 'categories',
      more: 'more',
      selectCount: '{{selected}}/{{total}} categories'
    },
    messages: {
      loading: 'Generating answer...',
      selectQuestion: 'Select a question to view the answer.',
      selectFromSidebar: 'Select a question from the sidebar to view the answer.',
      rateLimitError: 'API rate limit exceeded. Please try again later or check your API quota.',
      error: 'Sorry, failed to generate response. Please try again.',
      cacheClearedSuccess: 'All cached answers have been cleared',
      cacheClearError: 'Failed to clear cached answers'
    },
    prompts: {
      chatInstruction: 'Please provide a detailed answer in English for this interview question: {{question}}'
    },
    models: {
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
      'gpt-4-turbo-preview': 'GPT-4 Turbo'
    },
    actions: {
      regenerate: 'Regenerate answer',
      clearCache: 'Clear cached answers'
    }
  },
  chat: {
    inputPlaceholder: 'Ask a question...',
    saveAsQuestion: 'Save as Interview Question',
    selectCategory: 'Select a category',
    prompts: {
      default: '{{input}}'
    },
    errors: {
      noResponse: 'No response from ChatGPT',
      unknown: 'An unknown error occurred',
      apiError: 'Failed to get response from ChatGPT',
      invalidKey: 'Invalid API key',                                  
      rateLimit: 'Rate limit exceeded. Please try again later.', 
      networkError: 'Network connection error'
    },
    models: {
      select: 'Select model',
      premium: 'Premium'
    },
    welcome: {
      title: "# 👋 Hello! I'm AI Assistant\n\nI can help you with:\n- 📚 Explaining programming concepts\n- 💡 Suggesting technical solutions\n- 🔍 Code analysis and review\n- 📝 Unit test creation\n- ⚡ Code performance optimization\n\nFeel free to ask questions in English or Vietnamese!",
    },
    input: {
      placeholder: "Type your question...",
      hint: "Press Enter to send, Shift + Enter for new line"
    },
    header: {
      title: "AI Chat Assistant"
    },
    actions: {
      send: "Send",
      retry: "Retry",
      clear: "Clear chat",
      save: "Save to questions"
    }
  }
}