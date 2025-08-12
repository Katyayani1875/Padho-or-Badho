import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';
import Subject from './models/Subject.model.js';
import Chapter from './models/Chapter.model.js';
import Lesson from './models/Lesson.model.js';
import Quiz from './models/Quiz.model.js';
import Badge from './models/Badge.model.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const importData = async () => {
  try {
 
    await Badge.deleteMany();
    await Quiz.deleteMany();
    await Lesson.deleteMany();
    await Chapter.deleteMany();
    await Subject.deleteMany();
    await User.deleteMany();


    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    await Badge.create({
      name: { en: 'First Step', hi: 'पहला कदम' },
      description: { en: 'You completed your very first quiz!', hi: 'आपने अपनी पहली प्रश्नोत्तरी पूरी की!' },
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2544/2544323.png',
      criteria: 'COMPLETE_QUIZ',
      criteriaValue: '1',
    });

    console.log('Badges Imported!');
    console.log('Users Imported!');

    const math = await Subject.create({
      name: { en: 'Mathematics', hi: 'गणित' },
      description: { en: 'Learn the world of numbers.', hi: 'संख्याओं की दुनिया सीखें.' },
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2201/2201539.png',
      gradeLevel: 8,
    });

    const science = await Subject.create({
      name: { en: 'Science', hi: 'विज्ञान' },
      description: { en: 'Discover the laws of nature.', hi: 'प्रकृति के नियमों की खोज करें.' },
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/1205/1205526.png',
      gradeLevel: 8,
    });
    
    console.log('Subjects Imported!');

    const algebraChapter = await Chapter.create({
        title: { en: 'Introduction to Algebra', hi: 'बीजगणित का परिचय' },
        chapterNumber: 1,
        subject: math._id,
    });

    const algebraLesson1 = await Lesson.create({
        title: { en: 'What are Variables?', hi: 'चर क्या हैं?' },
        lessonType: 'video',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
        duration: 5,
        chapter: algebraChapter._id,
    });

    const algebraQuiz1 = await Quiz.create({
        title: { en: 'Variables Check', hi: 'चर जांच' },
        lesson: algebraLesson1._id,
        questions: [
            {
                questionText: { en: 'In the expression 2x + 5, what is the variable?', hi: 'व्यंजक 2x + 5 में, चर क्या है?' },
                options: [
                    { text: { en: '2' }, isCorrect: false },
                    { text: { en: 'x' }, isCorrect: true },
                    { text: { en: '5' }, isCorrect: false },
                ],
                explanation: { en: 'x is the variable because its value can change.', hi: 'x चर है क्योंकि इसका मान बदल सकता है.' }
            }
        ]
    });
    
    algebraLesson1.quiz = algebraQuiz1._id;
    await algebraLesson1.save();

    algebraChapter.lessons.push(algebraLesson1);
    await algebraChapter.save();

    math.chapters.push(algebraChapter);
    await math.save();

    const biologyChapter = await Chapter.create({
        title: { en: 'The Living World', hi: 'जीव जगत' },
        chapterNumber: 1,
        subject: science._id,
    });

    const biologyLesson1 = await Lesson.create({
        title: { en: 'What is a Cell?', hi: 'कोशिका क्या है?' },
        lessonType: 'video',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/docs/cell.mp4',
        duration: 7,
        chapter: biologyChapter._id,
    });

    const biologyQuiz1 = await Quiz.create({
        title: { en: 'Cell Check', hi: 'कोशिका जांच' },
        lesson: biologyLesson1._id,
        questions: [
            {
                questionText: { en: 'What is the powerhouse of the cell?', hi: 'कोशिका का पावरहाउस क्या है?' },
                options: [
                    { text: { en: 'Nucleus' }, isCorrect: false },
                    { text: { en: 'Mitochondria' }, isCorrect: true },
                    { text: { en: 'Ribosome' }, isCorrect: false },
                ],
                explanation: { en: 'Mitochondria are responsible for energy production.', hi: 'माइटोकॉन्ड्रिया ऊर्जा उत्पादन के लिए जिम्मेदार हैं.' }
            }
        ]
    });

    biologyLesson1.quiz = biologyQuiz1._id;
    await biologyLesson1.save();

    biologyChapter.lessons.push(biologyLesson1);
    await biologyChapter.save();
    
    science.chapters.push(biologyChapter);
    await science.save();

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Badge.deleteMany();
    await Quiz.deleteMany();
    await Lesson.deleteMany();
    await Chapter.deleteMany();
    await Subject.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}