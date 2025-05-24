type loginPayload = {
  username: string;
  password: string;
};

interface loginResponse {
  code: number;
  accessToken: string | undefined;
  message: string | undefined;
}

interface registerError {
  message: string;
}

type registerPayload = {
  username: string;
  password: string;
  fullname: string;
  email: string;
};

type addNewTaskPayload = {
  newTask: string;
};

type forgotPasswordPayload = {
  username: string;
  email: string;
};

type forgotPasswordResponse = {
  code: number;
  success: string;
  message: string | undefined;
};

type updatePasswordPayload = {
  updatedpassword: string;
};

type updatePasswordResponse = {
  code: number;
  success: string;
  message: string | undefined;
};

type accessToken = {
  accessToken: string;
};

type loginErrorMessage = {
  code: number;
  message: string;
};

type updatedTask = {
  updatedTask: string;
};

type checkedTask = {
  checkedTask: boolean;
};

type authHeader = {
  authorization: string;
};

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

export type {
  loginPayload,
  loginResponse,
  registerPayload,
  registerError,
  addNewTaskPayload,
  accessToken,
  loginErrorMessage,
  updatedTask,
  checkedTask,
  authHeader,
  task,
  taskResponse,
  forgotPasswordPayload,
  forgotPasswordResponse,
  updatePasswordPayload,
  updatePasswordResponse,
};
