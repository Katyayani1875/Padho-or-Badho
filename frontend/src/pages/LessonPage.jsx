import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useContentStore } from '../store/content.store';
import Spinner from '../components/Spinner';
import Quiz from '../components/Quiz';
import { useTranslation } from 'react-i18next';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AIChatButton from '../components/AIChatButton';
import AIChatModal from '../components/AIChatModal';

const LessonPage = () => {
  const { lessonId } = useParams();
  const { t, i18n } = useTranslation();
  const { currentLesson, loading, error, fetchLessonDetails } = useContentStore();
  const [showQuiz, setShowQuiz] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        await fetchLessonDetails(lessonId);
        setShowQuiz(false);
      } catch (err) {
        console.error('Failed to load lesson:', err);
      }
    };
    
    loadLesson();
  }, [lessonId, fetchLessonDetails]);

  if (loading) return <Spinner />;
  
  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">
          {t('lesson.loadError')}: {error}
        </p>
      </div>
    );
  }
  
  if (!currentLesson) {
    return (
      <div className="text-center p-4">
        {t('lesson.notFound')}
      </div>
    );
  }

  const getLocalizedContent = (content) => {
    if (!content) return '';
    return content[i18n.language] || content.en || '';
  };

  const lessonTitle = getLocalizedContent(currentLesson.title);
  const lessonContent = getLocalizedContent(currentLesson.content);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">{lessonTitle}</h1>

        {currentLesson.lessonType === 'video' && currentLesson.videoUrl && (
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-6">
            <ReactPlayer
              url={currentLesson.videoUrl}
              width="100%"
              height="100%"
              controls
              onEnded={() => setShowQuiz(true)}
            />
          </div>
        )}

        {currentLesson.lessonType === 'text' && (
          <div 
            className="prose dark:prose-invert max-w-none bg-surface dark:bg-dark-surface p-6 rounded-lg mb-6"
            dangerouslySetInnerHTML={{ __html: lessonContent }} 
          />
        )}

        {currentLesson.quiz && (
          <div className="mt-12 text-center">
            {showQuiz ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-left">
                  {t('lesson.quizTitle')}
                </h2>
                <Quiz 
                  quizData={currentLesson.quiz} 
                  lessonId={currentLesson._id} 
                />
              </>
            ) : (
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition duration-300 transform hover:scale-105"
              >
                <PencilSquareIcon className="h-6 w-6 mr-2" />
                {t('lesson.startQuiz')}
              </button>
            )}
          </div>
        )}
      </div>

      <AIChatButton onClick={() => setIsChatOpen(true)} />
      <AIChatModal 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        lessonContext={currentLesson} 
      />
    </>
  );
};

export default LessonPage;