export interface TaskOptions {
  notify: boolean;
  notified: boolean;
  auto_remove: boolean;
}

export interface Task {
  id: number;
  description: string;
  completed: boolean;
  dueDate?: number;
  options: TaskOptions;
  order: number;
}
