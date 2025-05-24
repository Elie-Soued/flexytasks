type task = {
  id: number;
  content: string;
  checked: boolean;
  userID: number;
};

type taskResponse = {
  meta: {
    totalCount: number;
  };
  tasks: task[];
};

export type { task, taskResponse };
