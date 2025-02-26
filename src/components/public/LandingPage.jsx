import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-20 sm:py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
                ORTHOS
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
                AI-Powered Orthodontic Extraction Decision Support System
              </p>
              <div className="mt-10 flex justify-center space-x-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-blue-700 hover:bg-blue-50"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-blue-700 hover:bg-blue-50"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-blue-900 text-white hover:bg-blue-800"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Revolutionizing Orthodontic Treatment Decisions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              ORTHOS uses artificial neural networks to provide evidence-based recommendations for extraction vs. non-extraction treatment.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/features"
              className="text-base font-medium text-blue-600 hover:text-blue-500"
            >
              Learn more about our features →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
