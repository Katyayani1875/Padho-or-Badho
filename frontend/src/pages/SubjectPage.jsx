import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContentStore } from '../store/content.store';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/Spinner';
import { BookOpenIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const { t, i18n } = useTranslation();
  const { currentSubject, chapters, loading, fetchChaptersBySubject } = useContentStore();

  useEffect(() => {
    fetchChaptersBySubject(subjectId);
  }, [subjectId, fetchChaptersBySubject]);

  if (loading) return <Spinner />;
  if (!currentSubject) return <div>Subject not found.</div>;

  const subjectName = currentSubject.name[i18n.language] || currentSubject.name.en;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-2">{subjectName}</h1>
      <p className="text-lg text-on-background/70 dark:text-dark-on-background/70 mb-8">
        {currentSubject.description[i18n.language] || currentSubject.description.en}
      </p>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-primary dark:border-dark-primary pb-2">{t('subject.chapters')}</h2>
        {chapters.map(chapter => (
          <div key={chapter._id} className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-3 text-primary dark:text-dark-primary" />
              {`Chapter ${chapter.chapterNumber}: ${chapter.title[i18n.language] || chapter.title.en}`}
            </h3>
            <ul className="space-y-3">
              {chapter.lessons.map(lesson => (
                <li key={lesson._id}>
                  <Link to={`/lessons/${lesson._id}`} className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <PlayCircleIcon className="h-5 w-5 mr-3 text-secondary dark:text-dark-secondary" />
                    <span className="font-medium">{lesson.title[i18n.language] || lesson.title.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;