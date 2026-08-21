import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiLeafLine, RiMailLine, RiShieldCheckLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../services/api';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email information is missing. Please register again.');
      navigate('/register');
      return;
    }

    if (!otp.trim()) {
      toast.error('Please enter the OTP.');
      return;
    }

    if (otp.trim().length !== 6) {
      toast.error('Please enter the 6-digit OTP.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post('/auth/verify-otp', {
        email: email.trim().toLowerCase(),
        otp: otp.trim()
      });

      const message =
        typeof response.data === 'string'
          ? response.data
          : response.data?.message || 'Email verified successfully!';

      toast.success(message);

      navigate('/login', {
        replace: true
      });

    } catch (error) {
      const message =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string'
          ? error.response.data
          : 'OTP verification failed. Please try again.');

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-light to-white py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

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
            Verify Your Email
          </h2>

          <p className="mt-2 text-sm text-text-dark/70">
            Enter the OTP sent to your email address.
          </p>

        </div>

        {/* Email */}
        <div className="mt-6 p-4 rounded-xl bg-bg-light border border-gray-200">

          <div className="flex items-center gap-3">

            <RiMailLine className="text-xl text-primary" />

            <div>
              <p className="text-xs text-text-dark/60">
                OTP sent to
              </p>

              <p className="text-sm font-semibold text-text-dark break-all">
                {email || 'Email not available'}
              </p>
            </div>

          </div>

        </div>

        {/* OTP Form */}
        <form
          onSubmit={handleVerifyOtp}
          className="mt-6 space-y-5"
        >

          <div>

            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-text-dark mb-1.5"
            >
              Enter OTP
            </label>

            <div className="relative">

              <RiShieldCheckLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl" />

              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 6);

                  setOtp(value);
                }}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-bg-light/50 text-center tracking-[0.5em] font-bold text-lg"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >

            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                Verifying...
              </>
            ) : (
              'Verify Email'
            )}

          </button>

        </form>

        {/* Login */}
        <div className="text-center mt-6">

          <p className="text-sm text-text-dark/70">

            Already verified?{' '}

            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default VerifyOtp;