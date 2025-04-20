export interface TaskOptions {
  notify: boolean;
  notified: boolean;
  auto_remove: boolean;
}

export interface Task {
  id: number;
  description: string;
  decryptedDescription?: string;
  completed: boolean;
  dueDate?: number;
  options: TaskOptions;
  owner?: string;
  order: number;
}
