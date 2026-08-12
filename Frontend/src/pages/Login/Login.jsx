import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RiEyeLine, RiEyeOffLine, RiLeafLine, RiUser3Line, RiShieldUserLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

// Validation schema matching database fields
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
}).required();

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('Farmer'); // 'Farmer' or 'Admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const handleRoleSwitch = (role) => {
    if (role !== selectedRole) {
      setSelectedRole(role);
      reset({ email: '', password: '' });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);

    if (result.success) {
      const userRole = result.user?.role || 'Farmer';

      // Role Mode Enforcement
      if (selectedRole === 'Farmer' && userRole === 'Admin') {
        logout();
        toast.error('This account belongs to an Administrator. Please select Administrator login.');
        return;
      }

      if (selectedRole === 'Admin' && userRole !== 'Admin') {
        logout();
        toast.error('This account belongs to a Farmer. Please select Farmer login.');
        return;
      }

      // Success Navigation
      if (userRole === 'Admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
              <RiLeafLine className="text-3xl" />
            </div>
            <span className="text-2xl font-bold text-text-dark font-display">
              Farm<span className="text-primary font-extrabold">Verse</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-text-dark font-display">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-text-dark/70">
            Sign in to manage your digital farm.
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Role Selector Chips */}
            <div>
              <label className="block text-xs font-bold text-text-dark/70 uppercase tracking-wider mb-2">
                Login As
              </label>
              <div className="grid grid-cols-2 gap-2.5 p-1 bg-bg-light/80 rounded-2xl border border-gray-200/80">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('Farmer')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    selectedRole === 'Farmer'
                      ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                      : 'text-text-dark/70 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  <span className="text-sm">👨‍🌾</span>
                  <span>Farmer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSwitch('Admin')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    selectedRole === 'Admin'
                      ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                      : 'text-text-dark/70 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  <span className="text-sm">👨‍💼</span>
                  <span>Administrator</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-dark mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-bg-light/50`}
                placeholder={selectedRole === 'Admin' ? 'admin@farmverse.com' : 'farmer@example.com'}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-bg-light/50 pr-12`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dark/50 hover:text-primary transition-colors"
                >
                  {showPassword ? <RiEyeOffLine className="text-xl" /> : <RiEyeLine className="text-xl" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              `Sign In as ${selectedRole === 'Admin' ? 'Administrator' : 'Farmer'}`
            )}
          </button>

          <p className="text-center text-sm text-text-dark/70">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;