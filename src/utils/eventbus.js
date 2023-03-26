import mitt from 'mitt'

// EventBus : 用于接收后端的检测结果后，将数据更新到HistoryTable中
export const bus = mitt()