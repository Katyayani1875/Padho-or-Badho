import { FaLanguage, FaBrain, FaGraduationCap, FaWifi, FaGamepad, FaUserTie, FaLightbulb, FaHandsHelping, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const FeatureCard = ({ icon, title, children, delay = 0 }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white/5 to-white/10 dark:from-dark-surface/80 dark:to-dark-surface p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary text-white mx-auto mb-6 text-3xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-center mb-4 text-on-surface dark:text-dark-on-surface bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-on-background/80 dark:text-dark-on-background/80 text-center leading-relaxed">
        {children}
      </p>
    </MotionDiv>
  );
};

const AboutPage = () => {
  return (
    <div className="overflow-hidden">
      {/* --- Hero Section --- */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/5 dark:to-dark-secondary/5 z-0">
          <div className="absolute inset-0 opacity-20 dark:opacity-10 [background-image:radial-gradient(circle_at_center,_#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        {/* Floating animated elements */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary/20 dark:bg-dark-primary/10 blur-3xl animate-float"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/20 dark:bg-dark-secondary/10 blur-3xl animate-float-delay"></div>

        <div className="relative z-10 px-4 max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface dark:text-dark-on-surface leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
                Revolutionizing
              </span> Education for All
            </h1>
            <p className="text-xl md:text-2xl text-on-background/80 dark:text-dark-on-background/80 max-w-4xl mx-auto leading-relaxed">
              We're dismantling barriers and rebuilding education as an accessible, engaging, and personalized experience for every child in India.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* --- Mission Statement --- */}
      <section className="relative py-20 bg-gradient-to-b from-background to-surface dark:from-dark-background dark:to-dark-surface">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-white/5 dark:bg-black/20 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold mb-8 text-center text-on-surface dark:text-dark-on-surface">
              Our <span className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">Core Mission</span>
            </h2>
            <p className="text-xl text-on-background/80 dark:text-dark-on-background/80 text-center max-w-4xl mx-auto leading-relaxed">
              To empower every student, regardless of language, location, or economic background, with world-class education through innovative technology that breaks down barriers, personalizes learning, and nurtures holistic development.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <MotionH2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-on-surface dark:text-dark-on-surface"
          >
            The <span className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">Padho और Badho</span> Difference
          </MotionH2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<FaLanguage size={28} />} 
              title="Multilingual Mastery" 
              delay={0}
            >
              All content available in Hindi and regional languages, breaking the biggest barrier to quality education for millions of students.
            </FeatureCard>
            
            <FeatureCard 
              icon={<FaGraduationCap size={28} />} 
              title="AI Tutor Companion" 
              delay={1}
            >
              24/7 personalized tutoring powered by Gemini AI, providing free, instant help exactly when students need it - no expensive tutors required.
            </FeatureCard>
            
            <FeatureCard 
              icon={<FaWifi size={28} />} 
              title="Offline Access" 
              delay={2}
            >
              Download lessons for offline study, ensuring uninterrupted learning even in areas with poor internet connectivity.
            </FeatureCard>
            
            <FeatureCard 
              icon={<FaGamepad size={28} />} 
              title="Gamified Learning" 
              delay={3}
            >
              XP points, badges, and leaderboards transform education into an engaging adventure that students love to return to daily.
            </FeatureCard>
            
            <FeatureCard 
              icon={<FaBrain size={28} />} 
              title="Adaptive Pathways" 
              delay={4}
            >
              AI identifies weak areas and creates personalized learning journeys, ensuring no student gets left behind.
            </FeatureCard>
            
            <FeatureCard 
              icon={<FaUserTie size={28} />} 
              title="Life & Career Prep" 
              delay={5}
            >
              Beyond academics, we nurture confidence, life skills, and career awareness to create well-rounded future leaders.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* --- Impact Showcase --- */}
      <section className="py-20 bg-gradient-to-br from-surface to-background dark:from-dark-surface dark:to-dark-background relative overflow-hidden">
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,_#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-10 dark:opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-on-surface dark:text-dark-on-surface">
              Transforming <span className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">Lives</span> Across India
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 dark:bg-black/10 p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary p-4 rounded-xl mr-4">
                    <FaLightbulb size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface">Rural Student Success</h3>
                </div>
                <p className="text-on-background/80 dark:text-dark-on-background/80 leading-relaxed">
                  Imagine a student in rural Bihar learning biology in Hindi from downloaded lessons, getting AI help when stuck, earning badges for progress, and discovering a passion for engineering—all without expensive tutors or perfect English.
                </p>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 dark:bg-black/10 p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-secondary/10 dark:bg-dark-secondary/20 text-secondary dark:text-dark-secondary p-4 rounded-xl mr-4">
                    <FaHandsHelping size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface dark:text-dark-on-surface">Urban Transformation</h3>
                </div>
                <p className="text-on-background/80 dark:text-dark-on-background/80 leading-relaxed">
                  Picture a low-income student in Mumbai overcoming schooling gaps with personalized lessons, building confidence through life skills modules, and staying motivated through gamification—all on their family's single smartphone.
                </p>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* --- Vision Statement --- */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-dark-primary/5 dark:to-dark-secondary/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary p-1 rounded-full">
                <div className="bg-white dark:bg-dark-background p-2 rounded-full">
                  <FaGlobe className="text-4xl text-primary dark:text-dark-primary" />
                </div>
              </div>
            </MotionDiv>
            
            <MotionH2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8 text-on-surface dark:text-dark-on-surface"
            >
              Our <span className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">Vision</span> for India's Future
            </MotionH2>
            
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-on-background/80 dark:text-dark-on-background/80 leading-relaxed mb-12"
            >
              We envision an India where every child's potential is unlocked, regardless of zip code or economic status. Where education is not a privilege but a right, delivered in a way that respects each student's unique needs and aspirations.
            </MotionP>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-secondary p-0.5 rounded-full max-w-md mx-auto"
            >
              <div className="bg-white dark:bg-dark-background p-4 rounded-full">
                <p className="font-bold text-on-surface dark:text-dark-on-surface">
                  Join us in building this future. One student at a time.
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Add this to your CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;