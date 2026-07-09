import { RiEditLine, RiLockPasswordLine, RiMailLine, RiPhoneLine, RiMapPin2Line, RiCalendarLine, RiShieldCheckLine, RiTimeLine } from 'react-icons/ri';

const Profile = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text-dark">Profile</h1>
        <p className="text-sm text-text-muted mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden">
            {/* Cover */}
            <div className="h-28 bg-gradient-to-r from-primary to-secondary relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-primary text-2xl font-extrabold">
                  FA
                </div>
              </div>
            </div>
            {/* Info */}
            <div className="pt-14 pb-6 px-6">
              <h2 className="text-xl font-extrabold text-text-dark">Farmer Admin</h2>
              <p className="text-sm text-text-muted mt-0.5">Organic Farm Owner</p>
              <div className="mt-5 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-text-muted">
                  <RiMailLine className="text-primary shrink-0" />
                  <span>farmer@farmverse.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-text-muted">
                  <RiPhoneLine className="text-primary shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-text-muted">
                  <RiMapPin2Line className="text-primary shrink-0" />
                  <span>Hyderabad, Telangana</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-6">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all">
                  <RiEditLine /><span>Edit Profile</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all">
                  <RiLockPasswordLine /><span>Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="xl:col-span-8 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Full Name', value: 'Farmer Admin' },
                { label: 'Email Address', value: 'farmer@farmverse.com' },
                { label: 'Mobile Number', value: '+91 98765 43210' },
                { label: 'Village', value: 'Ranga Reddy' },
                { label: 'District', value: 'Hyderabad' },
                { label: 'State', value: 'Telangana' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-text-dark bg-bg-light rounded-xl px-4 py-2.5 border border-border-light">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border-light">
            <h3 className="text-lg font-bold text-text-dark mb-5">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                <RiCalendarLine className="text-xl text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Joined Date</p>
                  <p className="text-sm font-bold text-text-dark mt-0.5">15 January 2026</p>
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
                <RiTimeLine className="text-xl text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Last Login</p>
                  <p className="text-sm font-bold text-text-dark mt-0.5">9 July 2026, 08:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-bg-light border border-border-light">
                <RiMapPin2Line className="text-xl text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Farms</p>
                  <p className="text-sm font-bold text-text-dark mt-0.5">3 Farms Registered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
