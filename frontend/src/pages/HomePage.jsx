import { Link } from 'react-router-dom';
import { FaBrain, FaGamepad, FaLanguage } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">Padho and Badho</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized AI-powered learning adventure. Learn, grow, and achieve your dreams, one lesson at a time.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Get Started for Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition duration-300"
            >
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <FaBrain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Our smart system adapts to your learning style, focusing on your weak areas to ensure you master every concept.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                <FaGamepad size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified & Fun</h3>
              <p className="text-gray-600">
                Earn points, badges, and climb the leaderboards. Learning has never been this engaging and motivational!
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mx-auto mb-4">
                <FaLanguage size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual & Inclusive</h3>
              <p className="text-gray-600">
                Learn in English, Hindi, and other regional languages. We believe education should have no language barriers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;