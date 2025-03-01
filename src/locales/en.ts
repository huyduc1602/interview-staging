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
      loading: 'Generating answer...',
      selectTopic: 'Select a topic to get detailed information.',
      selectFromSidebar: 'Select a knowledge item from the sidebar to view details.',
      error: 'Sorry, failed to generate response. Please try again.'
    },
    actions: {
      getAnswer: 'Get AI Answer'
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
      error: 'Sorry, failed to generate response. Please try again.'
    },
    prompts: {
      chatInstruction: 'Answer this interview question in detail: {{question}}\nProvide a comprehensive explanation with examples if applicable.'
    }
  }
}