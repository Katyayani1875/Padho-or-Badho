import { useState } from 'react';
import apiClient from '../services/api';
import { useTranslation } from 'react-i18next';
import Notification from './Notification'; // 1. Import the Notification component

const Quiz = ({ quizData, lessonId }) => {
  const { i18n } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // --- 2. Add state for the badge notification ---
  const [showNotification, setShowNotification] = useState(false);
  const [awardedBadge, setAwardedBadge] = useState(null);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    quizData.questions.forEach((q, index) => {
      const selectedOptionIndex = selectedAnswers[index];
      if (selectedOptionIndex !== undefined && q.options[selectedOptionIndex].isCorrect) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);

    try {
      const { data } = await apiClient.post('/progress/quiz', {
        lessonId,
        score: correctAnswers,
        totalQuestions: quizData.questions.length,
      });
      setFeedback(`Quiz submitted! You earned ${data.xpGained} XP!`);

      // --- 3. Check for and handle a newly awarded badge ---
      if (data.newlyAwardedBadge) {
        setAwardedBadge(data.newlyAwardedBadge);
        setShowNotification(true);
        // Optional: auto-hide the notification after a few seconds
        setTimeout(() => setShowNotification(false), 6000); 
      }

    } catch (error) {
      console.error('Failed to submit quiz progress', error);
      setFeedback('Error submitting quiz. Please try again.');
    }
  };

  const renderQuizContent = () => {
    if (showResults) {
      return (
        <div className="bg-surface dark:bg-dark-surface p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
          <p className="text-4xl font-bold mb-2">
            {score} / {quizData.questions.length}
          </p>
          <p className="text-lg text-secondary dark:text-dark-secondary font-semibold">{feedback}</p>
        </div>
      );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const questionText = currentQuestion.questionText[i18n.language] || currentQuestion.questionText.en;

    return (
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-lg shadow-lg">
        <h4 className="text-xl font-semibold mb-6">{questionText}</h4>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const optionText = option.text[i18n.language] || option.text.en;
            const isSelected = selectedAnswers[currentQuestionIndex] === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  isSelected 
                  ? 'border-primary bg-primary/10 dark:border-dark-primary dark:bg-dark-primary/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {optionText}
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <span>Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
          {currentQuestionIndex < quizData.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:bg-gray-400"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 disabled:bg-gray-400"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* --- 4. Render the Notification component outside the main flow --- */}
      <Notification 
        show={showNotification} 
        setShow={setShowNotification} 
        badge={awardedBadge} 
      />
      
      {renderQuizContent()}
    </>
  );
};

export default Quiz;