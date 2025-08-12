import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useContentStore } from '../store/content.store';
import { useTranslation } from 'react-i18next';
import SubjectCard from '../components/SubjectCard';
import Spinner from '../components/Spinner';
import apiClient from '../services/api'; // Import apiClient

function DashboardPage() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { subjects, loading, fetchSubjects } = useContentStore();
  const [profile, setProfile] = useState(null); // State for full user profile

  useEffect(() => {
    fetchSubjects();
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/users/profile');
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchProfile();
  }, [fetchSubjects]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-on-surface dark:text-dark-on-surface">
        {t('dashboard.welcome', { name: user?.name })}
      </h1>
      <p className="text-lg text-on-background/70 dark:text-dark-on-background/70">
        {t('dashboard.subheading')}
      </p>

      {/* Gamification Stats */}
      {profile && profile.studentProfile && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-on-background/70 dark:text-dark-on-background/70">Total XP</h3>
            <p className="text-4xl font-bold text-primary dark:text-dark-primary">{profile.studentProfile.xpPoints}</p>
          </div>
          <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-on-background/70 dark:text-dark-on-background/70">Badges Earned</h3>
            <p className="text-4xl font-bold text-secondary dark:text-dark-secondary">{profile.studentProfile.badges.length}</p>
          </div>
          <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-on-background/70 dark:text-dark-on-background/70">Daily Streak</h3>
            <p className="text-4xl font-bold text-red-500">{profile.studentProfile.dailyStreak}</p>
          </div>
        </div>
      )}
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.subjectsTitle')}</h2>
        {loading ? <Spinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subjects.map(subject => <SubjectCard key={subject._id} subject={subject} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;