export type Task = {
  label: string;
};

export type TaskToggle = {
  task: Task;
  complete: boolean;
};
