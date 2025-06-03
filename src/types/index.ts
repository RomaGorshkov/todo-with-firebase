export interface User {
  id: string;
  displayName: string;
  email: string;
}

export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  createdAt: string;
  userId: string;
  userDisplayName: string;
}

export interface NewTodo {
  text: string;
  userId: string;
  description: string;
  userDisplayName: string;
}

export interface RegisterUserSchema {
  displayName: string;
  email: string;
  password: string;
}

export interface LoginUserSchema {
  email: string;
  password: string;
}

export interface AuthInputs {
  type: string;
  id: string;
  placeholder: string;
  name: string;
}
