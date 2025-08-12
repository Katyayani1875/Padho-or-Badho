import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SubjectCard = ({ subject }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Ensure subject and its properties exist before trying to access them
  if (!subject || !subject.name || !subject.description) {
    return null; // Don't render anything if the subject data is incomplete
  }

  const name = subject.name[currentLang] || subject.name.en;
  const description = subject.description[currentLang] || subject.description.en;

  // --- FIX IS HERE ---
  // The link MUST include the subject's unique ID at the end.
  const destination = `/subjects/${subject._id}`;

  return (
    <Link to={destination}>
      <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col items-center text-center">
        <img src={subject.iconUrl} alt={`${name} icon`} className="w-20 h-20 mb-4" />
        <h3 className="text-xl font-bold text-on-surface dark:text-dark-on-surface mb-2">{name}</h3>
        <p className="text-on-background/70 dark:text-dark-on-background/70 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default SubjectCard;