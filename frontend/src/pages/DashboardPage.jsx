import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useContentStore } from '../store/content.store';
import { useTranslation } from 'react-i18next';
import SubjectCard from '../components/SubjectCard';
import Spinner from '../components/Spinner';

function DashboardPage() {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { subjects, loading, fetchSubjects } = useContentStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-on-surface dark:text-dark-on-surface">
        {t('dashboard.welcome', { name: user?.name })}
      </h1>
      <p className="text-lg text-on-background/70 dark:text-dark-on-background/70">
        {t('dashboard.subheading')}
      </p>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.subjectsTitle')}</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subjects.map(subject => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;