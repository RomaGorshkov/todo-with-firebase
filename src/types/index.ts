export interface User {
  id: string;
  displayName: string;
  email: string;
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
