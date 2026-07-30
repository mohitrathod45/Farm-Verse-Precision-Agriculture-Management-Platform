import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  RiPlantLine,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiLockPasswordLine,
  RiErrorWarningLine,
} from "react-icons/ri";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
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

    if (!formData.password.trim())
      newErrors.password = "Password is required";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Accept Terms & Conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.mobileNumber,
        role: "Farmer"
      });

      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col font-sans text-text-dark">
      <div className="w-full p-6 sm:p-8 flex justify-center sm:justify-start">
        <Link to="/" className="flex items-center space-x-2">
          <RiPlantLine className="text-3xl text-primary" />
          <span className="text-2xl font-bold tracking-tight text-text-dark">
            Farm<span className="text-primary font-extrabold">Verse</span>
          </span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 w-full max-w-md p-8 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">Join FarmVerse to manage your precision farm.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <div className="relative">
                <RiUserLine className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <div className="relative">
                <RiMailLine className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Mobile Number</label>
              <div className="relative">
                <RiPhoneLine className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                id="agreeTerms"
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                I agree to the <span className="text-primary font-bold">Terms & Conditions</span>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 cursor-pointer text-sm"
            >
              {submitting ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
