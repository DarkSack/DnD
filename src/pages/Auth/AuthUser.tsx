import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ArrowRight,
  User,
  Shield,
} from "lucide-react";
import type { InputFieldProps, ToggleFieldProps } from "@/Interfaces/Auth";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  error,
}: InputFieldProps) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon size={16} className="text-gray-400" />
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${error ? "border-red-300" : "border-gray-300"
          }`}
      />
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const PasswordField = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  error,
}: Omit<InputFieldProps, "icon" | "type">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock size={16} className="text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${error ? "border-red-300" : "border-gray-300"
            }`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={16} className="text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye size={16} className="text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

const ToggleField = ({ label, id, value, onChange }: ToggleFieldProps) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-purple-600" : "bg-gray-200"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"
          }`}
      />
    </button>
  </div>
);
const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user) navigate("/");
  }, [user, navigate]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login, register } = useAuthStore();
  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 transition-all duration-300 transform hover:scale-110">
              <div className="relative">
                <LogIn
                  className={`w-6 h-6 text-purple-600 transition-all duration-300 ${isLogin
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75 absolute"
                    }`}
                />
                <UserPlus
                  className={`w-6 h-6 text-purple-600 transition-all duration-300 ${!isLogin
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75 absolute"
                    }`}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 transition-all duration-300">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </h2>
            <p className="text-gray-600 transition-all duration-300">
              {isLogin
                ? "Ingresa a tu cuenta para continuar"
                : "Crea una nueva cuenta para comenzar"}
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6 relative">
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${isLogin
                ? "transform translate-x-0"
                : "transform translate-x-full"
                }`}
            />

            <button
              type="button"
              onClick={() => !isLogin && switchMode()}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${isLogin
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => isLogin && switchMode()}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${!isLogin
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Registrarse
            </button>
          </div>

          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-500 ease-in-out ${isLogin
                ? "transform translate-x-0 opacity-100"
                : "transform -translate-x-full opacity-0 absolute top-0 left-0 w-full"
                }`}
            >
              <div className="space-y-4">
                <InputField
                  label="Email"
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  placeholder="tu@email.com"
                  icon={Mail}
                  error={errors.email}
                />

                <PasswordField
                  label="Contraseña"
                  id="login-password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="Tu contraseña"
                  error={errors.password}
                />

                <div className="flex items-center justify-between">
                  <ToggleField
                    label="Recordarme"
                    id="remember-me"
                    value={loginData.rememberMe}
                    onChange={(checked) =>
                      setLoginData({ ...loginData, rememberMe: checked })
                    }
                  />
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  onClick={() => login(loginData,navigate)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${!isLogin
                ? "transform translate-x-0 opacity-100"
                : "transform translate-x-full opacity-0 absolute top-0 left-0 w-full"
                }`}
            >
              <div className="space-y-4">
                <InputField
                  label="Nombre de Usuario"
                  id="register-username"
                  value={registerData.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                  placeholder="Tu nombre de usuario"
                  icon={User}
                  error={errors.username}
                />

                <InputField
                  label="Email"
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  placeholder="tu@email.com"
                  icon={Mail}
                  error={errors.email}
                />

                <PasswordField
                  label="Contraseña"
                  id="register-password"
                  value={registerData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Tu contraseña"
                  error={errors.password}
                />

                <PasswordField
                  label="Confirmar Contraseña"
                  id="register-confirm-password"
                  value={registerData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirma tu contraseña"
                  error={errors.confirmPassword}
                />

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Shield size={16} className="text-gray-600" />
                  <p className="text-sm text-gray-600">
                    Al registrarte, aceptas nuestros términos y condiciones
                  </p>
                </div>

                <button
                  onClick={() => register(registerData,navigate)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <UserPlus size={18} />
                  )}
                  {loading ? "Registrando..." : "Crear Cuenta"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer con animaciones */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 transition-all duration-300">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-purple-600 hover:text-purple-700 font-medium transition-all duration-300 hover:underline"
              >
                {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
