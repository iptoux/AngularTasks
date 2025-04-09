export interface Task {
  id: number;
  description: string;
  completed: boolean;
  dueDate?: Date;
  order: number;
}
