import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiPlantLine, RiMailLine, RiLockPasswordLine, RiUserLine, RiPhoneLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user interacts
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.fullName.trim())
    newErrors.fullName = "Full Name is required";

  if (!formData.email.trim())
    newErrors.email = "Email Address is required";

  if (!formData.mobileNumber.trim())
    newErrors.mobileNumber = "Mobile Number is required";

  if (!formData.password)
    newErrors.password = "Password is required";

  if (!formData.confirmPassword)
    newErrors.confirmPassword = "Confirm Password is required";

  if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  if (!formData.agreeTerms)
    newErrors.agreeTerms = "Accept Terms & Conditions";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.mobileNumber
      }
    );

    alert(response.data.message);

    navigate("/login");

  } catch (error) {

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Unable to connect to server");
    }

    console.log(error);

  }

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
      <div className="flex-grow flex items-center justify-center px-4 py-8 relative">
        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-primary text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 font-bold text-sm">
              <RiCheckLine className="text-xl bg-white/20 rounded-full p-0.5" />
              <span>Account created successfully. Please login.</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 w-full max-w-lg p-8 sm:p-10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-text-dark mb-2">Create Account</h2>
              <p className="text-text-dark/60 text-sm">Join FarmVerse and digitize your farm.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-text-dark/80 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <RiUserLine className="text-text-dark/40 text-lg" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} rounded-xl text-sm transition-all outline-none focus:ring-4`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center">
                    <RiErrorWarningLine className="mr-1" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
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
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <RiErrorWarningLine className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-text-dark/80 mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <RiPhoneLine className="text-text-dark/40 text-lg" />
                    </div>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.mobileNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} rounded-xl text-sm transition-all outline-none focus:ring-4`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <RiErrorWarningLine className="mr-1" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Password */}
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
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <RiErrorWarningLine className="mr-1" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-text-dark/80 mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <RiLockPasswordLine className="text-text-dark/40 text-lg" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} rounded-xl text-sm transition-all outline-none focus:ring-4`}
                      placeholder="Confirm"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <RiErrorWarningLine className="mr-1" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 text-primary focus:ring-primary/50 ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300'} rounded cursor-pointer accent-primary mt-0.5`}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label htmlFor="agreeTerms" className={`cursor-pointer ${errors.agreeTerms ? 'text-red-500' : 'text-text-dark/70'}`}>
                      I agree to the <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">Terms & Conditions</a>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 hover:shadow-lg mt-4"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-dark/70">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
