import type { NavigateFunction } from "react-router-dom";
interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  roles?: string[];
  role?: string;
  permissions?: string[];
  pendingRequest?: boolean;
  status?: string;
  avatar?: string;
  isFriend?: boolean;
  isBlocked?: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface LoginResponse {
  token?: string;
  error?: string;
  user?: User;
}

interface RegisterResponse {
  token?: string;
  error?: string;
  user?: User;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ApiResponse<T = object> {
  success: boolean;
  data?: T;
  error?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials, navigate: NavigateFunction) => Promise<void>;
  register: (
    credentials: RegisterCredentials,
    navigate: NavigateFunction
  ) => Promise<void>;
  logout: (navigate: NavigateFunction) => Promise<void>;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<AuthResponse>>;
  register: (
    userData: RegisterCredentials
  ) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  refreshToken: () => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

type AuthStore = AuthState & AuthActions;

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  error?: string;
}

interface ToggleFieldProps {
  label: string;
  id: string;
  value: boolean;
  onChange: (checked: boolean) => void;
}

export type {
  User,
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  RegisterResponse,
  AuthResponse,
  ApiResponse,
  AuthState,
  AuthActions,
  AuthStore,
  InputFieldProps,
  ToggleFieldProps,
};
