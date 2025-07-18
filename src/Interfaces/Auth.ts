// Interfaces y tipos
interface User {
  id: number;
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

interface RegisterData {
  email: string;
  password: string;
  name: string;
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
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<AuthResponse>>;
  register: (userData: RegisterData) => Promise<ApiResponse<AuthResponse>>;
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
  RegisterData,
  AuthResponse,
  ApiResponse,
  AuthState,
  AuthActions,
  AuthStore,
  InputFieldProps,
  ToggleFieldProps,
};
