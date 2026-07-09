import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiPlantLine, RiMailLine, RiLockPasswordLine, RiErrorWarningLine } from 'react-icons/ri';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validation passes, simulate successful login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col font-sans text-text-dark">
      {/* Simple Header */}
      <div className="w-full p-6 sm:p-8 flex justify-center sm:justify-start">
        <Link to="/" className="flex items-center space-x-2">
          <RiPlantLine className="text-3xl text-primary" />
          <span className="text-2xl font-bold tracking-tight text-text-dark">
            Farm<span className="text-primary font-extrabold">Verse</span>
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 w-full max-w-md p-8 sm:p-10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-text-dark mb-2">Welcome Back</h2>
              <p className="text-text-dark/60 text-sm">Sign in to manage your digital farm.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-text-dark/80 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <RiMailLine className="text-text-dark/40 text-lg" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} rounded-xl text-sm transition-all outline-none focus:ring-4`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center">
                    <RiErrorWarningLine className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-text-dark/80 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="text-text-dark/40 text-lg" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} rounded-xl text-sm transition-all outline-none focus:ring-4`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center">
                    <RiErrorWarningLine className="mr-1" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded cursor-pointer accent-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-text-dark/70 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 hover:shadow-lg mt-4"
              >
                Login
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-dark/70">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
