import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  RiEditLine,
  RiLockPasswordLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiCalendarLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCloseLine,
  RiCheckLine,
  RiUserLine,
  RiImageAddLine,
} from "react-icons/ri";
import api from "../../services/api";

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
);

const ProfileSkeleton = () => (
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
    <div className="xl:col-span-4">
      <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden">
        <div className="h-28 bg-gray-200 animate-pulse relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-gray-300 animate-pulse border-4 border-white" />
          </div>
        </div>
        <div className="pt-14 pb-6 px-6 space-y-3">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-4 w-24" />
          <div className="space-y-2 mt-5">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
          <SkeletonBox className="h-10 w-full mt-4" />
          <SkeletonBox className="h-10 w-full" />
        </div>
      </div>
    </div>
    <div className="xl:col-span-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-light">
        <SkeletonBox className="h-6 w-48 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <SkeletonBox className="h-3 w-24 mb-2" />
              <SkeletonBox className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-light">
        <SkeletonBox className="h-6 w-48 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Password Strength ────────────────────────────────────────────────────────
const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
  if (score === 3) return { score, label: "Fair", color: "bg-amber-500" };
  if (score === 4) return { score, label: "Good", color: "bg-blue-500" };
  return { score, label: "Strong", color: "bg-green-500" };
};

// ─── Profile Completion ───────────────────────────────────────────────────────
const getCompletion = (profile, hasAvatar) => {
  const fields = [
    { label: "Full Name", done: !!profile?.fullName },
    { label: "Email", done: !!profile?.email },
    { label: "Mobile Number", done: !!profile?.phone },
    { label: "Profile Picture", done: hasAvatar },
  ];
  const done = fields.filter((f) => f.done).length;
  return {
    pct: Math.round((done / fields.length) * 100),
    missing: fields.filter((f) => !f.done).map((f) => f.label),
  };
};

// ─── Inline Validation Error ──────────────────────────────────────────────────
const InlineError = ({ msg }) =>
  msg ? <p className="text-xs text-red-500 mt-1 font-medium">{msg}</p> : null;

// ─────────────────────────────────────────────────────────────────────────────
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const avatarInputRef = useRef(null);

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: "", phone: "" });
  const [editErrors, setEditErrors] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);

  // Change Password modal state
  const [showPwd, setShowPwd] = useState(false);
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdErrors, setPwdErrors] = useState({});
  const [savingPwd, setSavingPwd] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // ── Fetch Profile ────────────────────────────────────────────────────────
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setProfile(res.data);
      const savedAvatar = localStorage.getItem(`fv_avatar_${res.data.userId}`);
      if (savedAvatar) setAvatar(savedAvatar);
    } catch (err) {
      toast.error("Failed to load profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ── Avatar Upload ────────────────────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are accepted.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      if (profile?.userId) localStorage.setItem(`fv_avatar_${profile.userId}`, base64);
      toast.success("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const formatDate = (dt) => {
    if (!dt) return "—";
    try {
      return new Date(dt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch { return "—"; }
  };

  const formatDateTime = (dt) => {
    if (!dt) return "—";
    try {
      return new Date(dt).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch { return "—"; }
  };

  // ── Open Edit Modal ──────────────────────────────────────────────────────
  const openEditModal = () => {
    setEditForm({ fullName: profile?.fullName || "", phone: profile?.phone || "" });
    setEditErrors({});
    setShowEdit(true);
  };

  // ── Validate Edit Form ───────────────────────────────────────────────────
  const validateEditForm = () => {
    const errs = {};
    if (!editForm.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (editForm.fullName.trim().length < 3) {
      errs.fullName = "Full name must be at least 3 characters.";
    }
    if (editForm.phone && !/^\d{10}$/.test(editForm.phone.trim())) {
      errs.phone = "Mobile number must be exactly 10 digits.";
    }
    return errs;
  };

  // ── Save Profile ─────────────────────────────────────────────────────────
  const handleSaveEdit = async () => {
    const errs = validateEditForm();
    if (Object.keys(errs).length > 0) { setEditErrors(errs); return; }
    try {
      setSavingEdit(true);
      const res = await api.put("/profile", {
        fullName: editForm.fullName.trim(),
        phone: editForm.phone.trim(),
      });
      setProfile(res.data);
      localStorage.setItem("fullName", res.data.fullName);
      setShowEdit(false);
      toast.success("✅ Profile Updated Successfully");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "Profile update failed.";
      toast.error(typeof msg === "string" ? msg : "Profile update failed.");
    } finally {
      setSavingEdit(false);
    }
  };

  // ── Validate Password ────────────────────────────────────────────────────
  const validatePwdForm = () => {
    const errs = {};
    if (!pwdForm.currentPassword) errs.currentPassword = "Current password is required.";
    if (!pwdForm.newPassword) {
      errs.newPassword = "New password is required.";
    } else if (pwdForm.newPassword.length < 8) {
      errs.newPassword = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(pwdForm.newPassword)) {
      errs.newPassword = "Must contain an uppercase letter.";
    } else if (!/[a-z]/.test(pwdForm.newPassword)) {
      errs.newPassword = "Must contain a lowercase letter.";
    } else if (!/[0-9]/.test(pwdForm.newPassword)) {
      errs.newPassword = "Must contain a number.";
    } else if (!/[^A-Za-z0-9]/.test(pwdForm.newPassword)) {
      errs.newPassword = "Must contain a special character.";
    }
    if (!pwdForm.confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  };

  // ── Change Password ──────────────────────────────────────────────────────
  const handleChangePwd = async () => {
    const errs = validatePwdForm();
    if (Object.keys(errs).length > 0) { setPwdErrors(errs); return; }
    try {
      setSavingPwd(true);
      await api.put("/profile/change-password", {
        currentPassword: pwdForm.currentPassword,
        newPassword: pwdForm.newPassword,
      });
      setShowPwd(false);
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("✅ Password Changed Successfully");
    } catch (err) {
      const errData = err.response?.data;
      const msg = errData?.error || errData?.message || "Password change failed.";
      if (typeof msg === "string" && (msg.toLowerCase().includes("current") || msg.toLowerCase().includes("incorrect"))) {
        setPwdErrors({ currentPassword: "Current password is incorrect." });
      } else {
        toast.error(typeof msg === "string" ? msg : "Password change failed.");
      }
    } finally {
      setSavingPwd(false);
    }
  };

  const pwdStrength = getPasswordStrength(pwdForm.newPassword);
  const completion = profile ? getCompletion(profile, !!avatar) : null;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text-dark">Profile</h1>
        <p className="text-sm text-text-muted mt-1">
          Manage your personal information and account settings.
        </p>
      </div>

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* ── Left: Profile Card ─────────────────────────────────────────── */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden">
              {/* Cover gradient */}
              <div className="h-28 bg-gradient-to-r from-primary to-secondary relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                      {avatar ? (
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-primary text-2xl font-extrabold">
                          {getInitials(profile?.fullName)}
                        </span>
                      )}
                    </div>
                    {/* Hover upload overlay */}
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      title="Upload profile photo"
                    >
                      <RiImageAddLine className="text-white text-xl" />
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
              </div>

              {/* Info section */}
              <div className="pt-14 pb-6 px-6">
                <h2 className="text-xl font-extrabold text-text-dark">{profile?.fullName}</h2>
                <p className="text-sm text-text-muted mt-0.5">{profile?.role}</p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-text-muted">
                    <RiMailLine className="text-primary shrink-0" />
                    <span className="truncate">{profile?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-text-muted">
                    <RiPhoneLine className="text-primary shrink-0" />
                    <span>{profile?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-text-muted">
                    <RiMapPin2Line className="text-primary shrink-0" />
                    <span>Hyderabad, Telangana</span>
                  </div>
                </div>

                {/* Profile Completion Indicator */}
                {completion && (
                  <div className="mt-5 p-3.5 rounded-xl bg-bg-light border border-border-light">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-text-dark">Profile Completion</p>
                      <span className="text-xs font-extrabold text-primary">{completion.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${completion.pct}%` }}
                      />
                    </div>
                    {completion.missing.length > 0 && (
                      <p className="text-[10px] text-text-muted mt-1.5">
                        Missing: {completion.missing.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-col space-y-2 mt-5">
                  <button
                    onClick={openEditModal}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <RiEditLine />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setPwdErrors({});
                      setShowCurrentPwd(false);
                      setShowNewPwd(false);
                      setShowConfirmPwd(false);
                      setShowPwd(true);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all cursor-pointer"
                  >
                    <RiLockPasswordLine />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Details ─────────────────────────────────────────────── */}
          <div className="xl:col-span-8 space-y-6">

            {/* Personal Information card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
              <h3 className="text-lg font-bold text-text-dark mb-5">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Full Name", value: profile?.fullName || "—" },
                  { label: "Email Address", value: profile?.email || "—" },
                  { label: "Mobile Number", value: profile?.phone || "Not provided" },
                  { label: "Role", value: profile?.role || "—" },
                  { label: "User ID", value: `#${profile?.userId}` },
                  { label: "Created At", value: formatDateTime(profile?.createdAt) },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-text-dark bg-bg-light rounded-xl px-4 py-2.5 border border-border-light">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Information card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
              <h3 className="text-lg font-bold text-text-dark mb-5">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                  <RiCalendarLine className="text-xl text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Joined Date</p>
                    <p className="text-sm font-bold text-text-dark mt-0.5">{formatDate(profile?.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                  <RiShieldCheckLine className="text-xl text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Account Status</p>
                    <p className="text-sm font-bold text-primary mt-0.5">Active</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                  <RiUserLine className="text-xl text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Role</p>
                    <p className="text-sm font-bold text-text-dark mt-0.5">{profile?.role || "—"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                  <RiTimeLine className="text-xl text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Member Since</p>
                    <p className="text-sm font-bold text-text-dark mt-0.5">{formatDate(profile?.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ─────────────────────────────────────────────── */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <div>
                <h3 className="text-lg font-extrabold text-text-dark">Edit Profile</h3>
                <p className="text-xs text-text-muted mt-0.5">Update your personal information</p>
              </div>
              <button
                onClick={() => setShowEdit(false)}
                className="p-2 rounded-xl hover:bg-bg-light text-text-muted hover:text-text-dark transition-colors cursor-pointer"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => {
                    setEditForm({ ...editForm, fullName: e.target.value });
                    setEditErrors({ ...editErrors, fullName: "" });
                  }}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-text-dark bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${editErrors.fullName ? "border-red-400" : "border-border-light"}`}
                />
                <InlineError msg={editErrors.fullName} />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => {
                    setEditForm({ ...editForm, phone: e.target.value });
                    setEditErrors({ ...editErrors, phone: "" });
                  }}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-text-dark bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${editErrors.phone ? "border-red-400" : "border-border-light"}`}
                />
                <InlineError msg={editErrors.phone} />
              </div>

              {/* Email — read only */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-text-muted font-normal">(read-only)</span>
                </label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-muted bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* Role & User ID — read only */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                    Role <span className="text-text-muted font-normal">(read-only)</span>
                  </label>
                  <input
                    type="text"
                    value={profile?.role || ""}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-muted bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                    User ID <span className="text-text-muted font-normal">(read-only)</span>
                  </label>
                  <input
                    type="text"
                    value={`#${profile?.userId}`}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-muted bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-light">
              <button
                onClick={() => setShowEdit(false)}
                className="px-5 py-2.5 rounded-xl border border-border-light text-sm font-bold text-text-dark hover:bg-bg-light transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 cursor-pointer"
              >
                {savingEdit ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <RiCheckLine />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Password Modal ───────────────────────────────────────────── */}
      {showPwd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <div>
                <h3 className="text-lg font-extrabold text-text-dark">Change Password</h3>
                <p className="text-xs text-text-muted mt-0.5">Keep your account secure</p>
              </div>
              <button
                onClick={() => setShowPwd(false)}
                className="p-2 rounded-xl hover:bg-bg-light text-text-muted hover:text-text-dark transition-colors cursor-pointer"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPwd ? "text" : "password"}
                    value={pwdForm.currentPassword}
                    onChange={(e) => {
                      setPwdForm({ ...pwdForm, currentPassword: e.target.value });
                      setPwdErrors({ ...pwdErrors, currentPassword: "" });
                    }}
                    placeholder="Enter current password"
                    className={`w-full pl-4 pr-10 py-2.5 rounded-xl border text-sm font-semibold text-text-dark bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${pwdErrors.currentPassword ? "border-red-400" : "border-border-light"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark cursor-pointer"
                  >
                    {showCurrentPwd ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                <InlineError msg={pwdErrors.currentPassword} />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPwd ? "text" : "password"}
                    value={pwdForm.newPassword}
                    onChange={(e) => {
                      setPwdForm({ ...pwdForm, newPassword: e.target.value });
                      setPwdErrors({ ...pwdErrors, newPassword: "" });
                    }}
                    placeholder="Enter new password"
                    className={`w-full pl-4 pr-10 py-2.5 rounded-xl border text-sm font-semibold text-text-dark bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${pwdErrors.newPassword ? "border-red-400" : "border-border-light"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd(!showNewPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark cursor-pointer"
                  >
                    {showNewPwd ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                {/* Strength bar */}
                {pwdForm.newPassword && (
                  <div className="mt-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${i <= pwdStrength.score ? pwdStrength.color : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className={`text-[10px] font-bold mt-1 ${
                      pwdStrength.score <= 2 ? "text-red-500"
                      : pwdStrength.score === 3 ? "text-amber-500"
                      : pwdStrength.score === 4 ? "text-blue-500"
                      : "text-green-500"
                    }`}>
                      {pwdStrength.label}
                    </p>
                  </div>
                )}
                <InlineError msg={pwdErrors.newPassword} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    value={pwdForm.confirmPassword}
                    onChange={(e) => {
                      setPwdForm({ ...pwdForm, confirmPassword: e.target.value });
                      setPwdErrors({ ...pwdErrors, confirmPassword: "" });
                    }}
                    placeholder="Confirm new password"
                    className={`w-full pl-4 pr-10 py-2.5 rounded-xl border text-sm font-semibold text-text-dark bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${pwdErrors.confirmPassword ? "border-red-400" : "border-border-light"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark cursor-pointer"
                  >
                    {showConfirmPwd ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                <InlineError msg={pwdErrors.confirmPassword} />
              </div>

              {/* Requirements checklist */}
              <div className="p-3.5 rounded-xl bg-bg-light border border-border-light">
                <p className="text-xs font-bold text-text-muted mb-2">Password Requirements:</p>
                <ul className="space-y-1">
                  {[
                    { label: "At least 8 characters", test: pwdForm.newPassword.length >= 8 },
                    { label: "One uppercase letter (A–Z)", test: /[A-Z]/.test(pwdForm.newPassword) },
                    { label: "One lowercase letter (a–z)", test: /[a-z]/.test(pwdForm.newPassword) },
                    { label: "One number (0–9)", test: /[0-9]/.test(pwdForm.newPassword) },
                    { label: "One special character (!@#$...)", test: /[^A-Za-z0-9]/.test(pwdForm.newPassword) },
                  ].map((req, i) => (
                    <li
                      key={i}
                      className={`flex items-center space-x-2 text-xs font-medium transition-colors ${req.test ? "text-green-600" : "text-text-muted"}`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${req.test ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {req.test
                          ? <RiCheckLine className="text-[9px]" />
                          : <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />}
                      </span>
                      <span>{req.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-light">
              <button
                onClick={() => setShowPwd(false)}
                className="px-5 py-2.5 rounded-xl border border-border-light text-sm font-bold text-text-dark hover:bg-bg-light transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePwd}
                disabled={savingPwd}
                className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 cursor-pointer"
              >
                {savingPwd ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <RiLockPasswordLine />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;