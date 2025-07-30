import { useAuthStore } from '../store/auth.store';

function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard, {user?.name}!</h1>
      <p className="text-lg text-gray-600">This is your personalized learning space. Let's start learning!</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Card: My Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">My Courses</h2>
          <p>View your enrolled subjects and continue your learning journey.</p>
          <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            Go to Courses
          </button>
        </div>
        {/* Example Card: Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">My Progress</h2>
          <p>Track your scores, badges, and daily streaks.</p>
           <button className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;