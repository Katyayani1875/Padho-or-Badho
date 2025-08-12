import { useEffect, useState } from 'react';
import apiClient from '../services/api';
import Spinner from '../components/Spinner';
import { FaTrophy } from 'react-icons/fa';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/gamification/leaderboard');
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <Spinner />;

  const rankColors = ['text-yellow-400', 'text-gray-400', 'text-yellow-600'];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Leaderboard</h1>
      <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg p-6">
        <ul className="space-y-4">
          {leaderboard.map((student, index) => (
            <li key={student._id} className="flex items-center justify-between p-4 bg-background dark:bg-dark-background/50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold w-8 text-center ${rankColors[index] || 'text-on-surface dark:text-dark-on-surface'}`}>
                  {index < 3 ? <FaTrophy /> : index + 1}
                </span>
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                <span className="font-semibold text-lg">{student.name}</span>
              </div>
              <span className="font-bold text-xl text-primary dark:text-dark-primary">{student.studentProfile.xpPoints} XP</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardPage;