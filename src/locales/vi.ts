export default {
  common: {
    search: 'Tìm kiếm',
    loading: 'Đang tải...',
    error: 'Lỗi',
    selectTopic: 'Chọn một chủ đề để xem thông tin chi tiết.',
    generateAnswer: 'Đang tạo câu trả lời...',
  },
  nav: {
    home: 'Trung tâm Phỏng vấn',
    knowledgeBase: '📚 Cơ sở Kiến thức',
    interviewQuestions: '❓ Câu hỏi Phỏng vấn',
  },
  home: {
    hero: {
      title: 'Trung Tâm Chuẩn Bị Phỏng Vấn',
      subtitle: 'Nền tảng toàn diện để thành thạo các cuộc phỏng vấn kỹ thuật. Theo dõi tiến độ, luyện tập với trí tuệ nhân tạo và chuẩn bị hiệu quả.',
    },
    features: {
      knowledgeBase: {
        title: 'Cơ Sở Kiến Thức',
        description: 'Theo dõi tiến độ học tập qua các chủ đề và đánh dấu mức độ hiểu biết của bạn.',
        action: 'Khám Phá Kiến Thức',
      },
      interviewQuestions: {
        title: 'Câu Hỏi Phỏng Vấn',
        description: 'Luyện tập với danh sách câu hỏi kỹ thuật được tuyển chọn và nhận câu trả lời từ AI.',
        action: 'Bắt Đầu Luyện Tập',
      },
    },
    stats: {
      knowledgeTopics: {
        value: '100+',
        label: 'Chủ Đề Kiến Thức',
      },
      questions: {
        value: '500+',
        label: 'Câu Hỏi Phỏng Vấn',
      },
      categories: {
        value: '7',
        label: 'Danh Mục',
      },
      aiSupport: {
        value: '24/7',
        label: 'Hỗ Trợ AI',
      },
    },
  },
  knowledgeBase: {
    title: 'Cơ Sở Kiến Thức',
    searchPlaceholder: 'Tìm kiếm...',
    status: {
      pending: 'Chưa học',
      inProgress: 'Đang học',
      completed: 'Hoàn thành',
      notStarted: 'Chưa học'
    },
    messages: {
      loading: 'Đang tạo câu trả lời...',
      selectTopic: 'Chọn một chủ đề để xem thông tin chi tiết.',
      selectFromSidebar: 'Chọn một mục từ thanh bên để xem chi tiết.',
      error: 'Xin lỗi, không thể tạo câu trả lời. Vui lòng thử lại.'
    },
    actions: {
      getAnswer: 'Nhận câu trả lời AI'
    }
  },
  interviewQuestions: {
    title: 'Câu Hỏi Phỏng Vấn',
    searchPlaceholder: 'Tìm kiếm câu hỏi...',
    tooltips: {
      search: 'Tìm kiếm trong tất cả câu hỏi',
      shuffle: 'Xáo trộn ngẫu nhiên câu hỏi từ danh mục đã chọn',
      collapse: 'Thu gọn lựa chọn danh mục'
    },
    categories: {
      select: 'Chọn Danh Mục',
      selected: 'danh mục',
      more: 'thêm',
      selectCount: '{{selected}}/{{total}} danh mục'
    },
    messages: {
      loading: 'Đang tạo câu trả lời...',
      selectQuestion: 'Chọn một câu hỏi để xem câu trả lời.',
      selectFromSidebar: 'Chọn một câu hỏi từ thanh bên để xem câu trả lời.',
      error: 'Xin lỗi, không thể tạo câu trả lời. Vui lòng thử lại.'
    },
    prompts: {
      chatInstruction: 'Trả lời chi tiết câu hỏi phỏng vấn này: {{question}}\nĐưa ra lời giải thích toàn diện kèm ví dụ nếu có thể.'
    }
  }
};