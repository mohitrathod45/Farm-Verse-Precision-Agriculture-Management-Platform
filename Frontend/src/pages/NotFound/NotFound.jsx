import { Link } from 'react-router-dom';
import { RiHome4Line, RiDashboardLine, RiLeafLine } from 'react-icons/ri';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 font-sans text-text-dark">
      <div className="text-center max-w-md">
        {/* Agriculture Icon */}
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
          <RiLeafLine className="text-5xl" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-primary/20 mb-4">404</h1>
        <h2 className="text-2xl font-extrabold text-text-dark mb-3">Page Not Found</h2>
        <p className="text-text-muted mb-8">Oops! The page you're looking for doesn't exist. It might have been moved or the URL may be incorrect.</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
            <RiDashboardLine />
            <span>Back to Dashboard</span>
          </Link>
          <Link to="/" className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all">
            <RiHome4Line />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
