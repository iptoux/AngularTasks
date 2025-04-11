export interface TaskOptions {
  notify: boolean;
  auto_remove: boolean;
}

export interface Task {
  id: number;
  description: string;
  completed: boolean;
  dueDate?: Date;
  options?: TaskOptions;
  order: number;
}
