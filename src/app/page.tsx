'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Mountain, Timer, Users, Moon, Sun, Languages, ExternalLink } from 'lucide-react';

interface CarGroup {
  color: string;
  count: number;
  label: string;
  bgColor: string;
  textColor: string;
}

interface TeamMember {
  name: string;
  role: string;
  nameAr?: string;
  roleAr?: string;
  link?: string;
}

const team: TeamMember[] = [
  {
    name: "Feras M. Allam",
    nameAr: "فراس علام",
    role: "CEO - Founder",
    roleAr: "الرئيس التنفيذي - المؤسس"
  },
  {
    name: "Ahmed Abu Al-Nasr",
    nameAr: "أحمد أبو النصر",
    role: "Software Engineer",
    roleAr: "مهندس برمجيات"
  },
];

function calculateMinimumTime(r: number, g: number, b: number): number {
  if (r === 0 && g === 0 && b === 0) return 0;
  
  const redCars = Math.ceil(r / 2);
  const greenCars = Math.ceil(g / 2);
  const blueCars = Math.ceil(b / 2);

  const lastRedBoardingTime = (redCars - 1) * 3;
  const lastGreenBoardingTime = (greenCars - 1) * 3 + 1;
  const lastBlueBoardingTime = (blueCars - 1) * 3 + 2;

  return Math.max(lastRedBoardingTime, lastGreenBoardingTime, lastBlueBoardingTime) + 30;
}

export default function Home() {
  const [groups, setGroups] = useState<CarGroup[]>([
    { color: 'red', count: 3, label: 'Red Team', bgColor: 'bg-red-900/20', textColor: 'text-red-400' },
    { color: 'green', count: 3, label: 'Green Team', bgColor: 'bg-green-900/20', textColor: 'text-green-400' },
    { color: 'blue', count: 1, label: 'Blue Team', bgColor: 'bg-blue-900/20', textColor: 'text-blue-400' }
  ]);
  
  const [result, setResult] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showProcess, setShowProcess] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowProcess(true);
    const time = calculateMinimumTime(
      groups[0].count,
      groups[1].count,
      groups[2].count
    );
    setTimeout(() => {
      setResult(time);
      setIsCalculating(false);
    }, 1000);
  };

  const handleCountChange = (index: number, value: number) => {
    const newGroups = [...groups];
    newGroups[index].count = Math.max(0, Math.floor(value));
    setGroups(newGroups);
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className={`min-h-screen p-8 bg-cover bg-center bg-fixed ${isDark ? 'dark-gradient' : 'light-gradient'}`}
          style={{ backgroundImage: 'url("./assets/imgs/background.jpg")' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h2 className="text-xl font-bold text-white/90">FORALL - From Saudi Arabia to the World</h2>
          </motion.div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full glass-effect"
            >
              {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="p-2 rounded-full glass-effect"
            >
              <Languages className="w-6 h-6 text-blue-400" />
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isDark ? 'dark-glass-effect' : 'glass-effect'} rounded-2xl shadow-xl p-8 text-center mb-10 backdrop-blur-lg`}
        >
          <div className="flex flex-col items-center gap-3 mb-8">
            <Mountain className="w-16 h-16 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              {isArabic ? 'الصعود الى الجبل تطوير. عبدالملك العاقل' : 'Climbing the mountain. by Abdulmalek Akel'}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              {isArabic 
                ? 'حساب الحد الأدنى من الوقت اللازم لوصول جميع الطلاب إلى قمة الجبل'
                : 'Calculate the minimum time needed for all students to reach the mountain top'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {groups.map((group, index) => (
              <motion.div
                key={group.color}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${group.bgColor} p-6 rounded-xl glass-effect backdrop-blur-md`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${group.textColor}`}>
                    {group.label}
                  </h3>
                  <Car className={`w-6 h-6 ${group.textColor}`} />
                </div>
                <div className="flex items-center gap-4">
                  <Users className={`w-5 h-5 ${group.textColor}`} />
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={groups[index].count === 0 ? '' : groups[index].count}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleCountChange(index, val === '' ? 0 : parseInt(val));
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === '.') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={isCalculating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg 
                        transition-all duration-300 disabled:opacity-50 min-w-[200px]"
            >
              {isCalculating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⚡
                </motion.div>
              ) : (
                isArabic ? 'حساب الوقت' : 'Calculate Time'
              )}
            </motion.button>

            <AnimatePresence>
              {result > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center gap-6 text-white"
                >
                  <div className="flex items-center gap-3 text-2xl font-bold">
                    <Timer className="w-6 h-6 text-purple-400" />
                    <span className="text-white/90">
                      {isArabic ? `الوقت الإجمالي: ${result} دقيقة` : `Total Time: ${result} minutes`}
                    </span>
                  </div>
                  
                  {showProcess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-center w-full max-w-2xl glass-effect p-6 rounded-xl backdrop-blur-md"
                    >
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        {isArabic ? 'تفاصيل العملية' : 'Process Details'}
                      </h3>
                      <div className="space-y-4">
                        {groups.map((group, index) => (
                          <motion.div
                            key={group.color}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center justify-center gap-3"
                          >
                            <Car className={`w-5 h-5 ${group.textColor}`} />
                            <span className="text-white/90">
                              {`${group.label}: ${Math.ceil(group.count / 2)} trips`}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-8 text-center backdrop-blur-lg"
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            {isArabic ? 'فريق FORALL' : 'FORALL Team'}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {isArabic 
              ? 'تم تطوير هذا المشروع بواسطة فريق FORALL المتميز'
              : 'This project was developed by the exceptional FORALL team'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold text-white/90 mb-2">
                  {isArabic ? member.nameAr : member.name}
                </h3>
                <p className="text-white/70 mb-2">
                  {isArabic ? member.roleAr : member.role}
                </p>
                {member.link && (
                  <motion.a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{isArabic ? 'الملف الشخصي' : 'Portfolio'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </main>
  );
}