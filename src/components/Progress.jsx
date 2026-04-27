import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Progress() {
  // Mock user progress data (replace with localStorage/real backend later)
  const [userProgress, setUserProgress] = useState({
    totalQuizzes: 12,
    totalTutorials: 5,
    currentStreak: 3,
    bestStreak: 7,
    totalTime: "2h 45m",
    lessonsCompleted: 23,
    wordsLearned: 156,
    accuracy: 87
  });

  // Quiz progress synced with Quizzes.jsx
  const [quizStars, setQuizStars] = useState([3, 2, 1, 0]); // ⭐ per level
  const [quizAttempts, setQuizAttempts] = useState([5, 3, 1, 0]);
  
  // Level achievements
  const achievements = [
    { id: 1, name: 'First Quiz', unlocked: true, icon: '⭐', description: 'Completed your first quiz' },
    { id: 2, name: 'Beginner Master', unlocked: quizStars[0] === 3, icon: '🥇', description: '3⭐ Level 1' },
    { id: 3, name: 'Streak Master', unlocked: userProgress.currentStreak >= 5, icon: '🔥', description: '5-day streak' },
    { id: 4, name: 'Gold Learner', unlocked: userProgress.accuracy >= 90, icon: '🏆', description: '90%+ accuracy' },
    { id: 5, name: 'Tutorial Explorer', unlocked: userProgress.totalTutorials >= 10, icon: '📚', description: '10+ tutorials' }
  ];

  // Calculate stats
  const totalStars = quizStars.reduce((a, b) => a + b, 0);
  const levelsCompleted = quizStars.filter(stars => stars > 0).length;
  const completionPercentage = (levelsCompleted / 4) * 100;

  // Motivational badges
  const badges = [
    { name: 'Newbie', icon: '🌱', color: 'from-green-400 to-emerald-500', unlocked: true },
    { name: 'Apprentice', icon: '⚡', color: 'from-blue-400 to-cyan-500', unlocked: levelsCompleted >= 2 },
    { name: 'Journeyman', icon: '⭐', color: 'from-yellow-400 to-orange-500', unlocked: levelsCompleted >= 3 },
    { name: 'Master', icon: '👑', color: 'from-purple-500 to-pink-500', unlocked: levelsCompleted === 4 }
  ];

  const currentBadge = badges.find(badge => badge.unlocked) || badges[0];

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-black text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#e99b63]/40 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute top-60 right-20 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-yellow-400/30 rounded-full animate-bounce" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* ✅ FIXED: Hero Header - PERFECTLY CENTERED */}
        <div className="w-full max-w-3xl mt-20 rounded-3xl shadow-2xl bg-gradient-to-br from-[#232323] via-black/80 to-[#e99b63]/20 p-12 border-2 border-[#e99b63]/40 backdrop-blur-xl text-center">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#e99b63] via-[#CAB87E] to-orange-500 bg-clip-text text-transparent tracking-tight mx-auto">
              Your Journey
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Track every milestone, celebrate achievements, and see how far you've come in FSL mastery ✨
            </p>
          </div>

          {/* Current Badge - CENTERED */}
          <div className="flex flex-col items-center gap-6 p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-[#e99b63]/30 mx-auto max-w-md">
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${currentBadge.color} shadow-2xl shadow-${currentBadge.color.split('from-')[1]?.split('-')[0] || 'yellow'}-500/30 w-full text-center`}>
              <div className="text-6xl mb-4 mx-auto">{currentBadge.icon}</div>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">{currentBadge.name}</h2>
            </div>
            <p className="text-gray-400 text-lg uppercase tracking-wider text-center">Next: {badges[badges.findIndex(b => b.name === currentBadge.name) + 1]?.name}</p>
          </div>
        </div>

        {/* Stats Grid - FULL WIDTH CENTERED */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 w-full max-w-6xl px-4">
          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#e99b63]/30 p-8 shadow-xl hover:shadow-2xl transition-all">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#CAB87E" }}>📊 Quick Stats</h2>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black mb-2" style={{ color: "#e99b63" }}>{userProgress.accuracy}%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2" style={{ color: "#e99b63" }}>{userProgress.currentStreak}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Day Streak 🔥</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2" style={{ color: "#e99b63" }}>{totalStars}⭐</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Total Stars</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2" style={{ color: "#e99b63" }}>{userProgress.wordsLearned}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Words Learned</div>
                </div>
              </div>
            </div>

            {/* Quiz Progress */}
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#e99b63]/30 p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#CAB87E" }}>🎯 Quiz Mastery</h2>
              <div className="space-y-4">
                {quizStars.map((stars, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                    <span className="font-mono text-sm uppercase tracking-wider">Level {index + 1}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array(3).fill(0).map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 ${
                              stars > i
                                ? 'bg-yellow-400 border-yellow-400 shadow-lg'
                                : 'bg-gray-800 border-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-mono">{quizAttempts[index]} attempts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Milestones */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#e99b63]/30 p-8 shadow-xl text-center">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#CAB87E" }}>🚀 Learning Path</h2>
              <div className="relative">
                <div className="w-full bg-gray-800 rounded-full h-4 mb-4 overflow-hidden">
                  <div 
                    className="h-4 bg-gradient-to-r from-[#e99b63] to-[#CAB87E] shadow-lg rounded-full transition-all duration-1000"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <div>
                  <span className="text-3xl font-black block" style={{ color: "#e99b63" }}>{levelsCompleted}/4</span>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Levels Mastered</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#e99b63]/30 p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#CAB87E" }}>🏆 Achievements</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl transition-all group cursor-pointer ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-emerald-500/20 border-emerald-400/40 shadow-emerald-400/25 hover:scale-105'
                        : 'bg-gray-800/50 border-gray-700/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg ${achievement.unlocked ? 'animate-pulse' : ''}`}>
                        <span className="text-xl font-bold">{achievement.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm uppercase tracking-wider truncate">{achievement.name}</h3>
                        <p className="text-xs text-gray-400 truncate">{achievement.description}</p>
                      </div>
                    </div>
                    {!achievement.unlocked && (
                      <div className="h-2 bg-gray-700 rounded-full mt-2">
                        <div className="h-2 bg-gray-500 rounded-full w-1/2 animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - FULL WIDTH CENTERED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl px-4">
          <Link
            to="/quizzes"
            className="group bg-gradient-to-r from-[#e99b63] to-[#CAB87E] text-black font-bold py-8 px-8 rounded-3xl uppercase tracking-wider text-xl shadow-3xl hover:shadow-4xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center h-32"
          >
            <span className="text-3xl mb-2 block">🎯</span>
            <span>Continue Quizzes</span>
            <span className="text-sm opacity-75 block mt-1">{totalStars}⭐ earned</span>
          </Link>
          
          <Link
            to="/tutorials"
            className="group bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-[#e99b63]/50 hover:bg-white/20 p-8 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center h-32"
          >
            <span className="text-3xl mb-2">📚</span>
            <span>More Lessons</span>
            <span className="text-sm opacity-75 block mt-1">{userProgress.totalTutorials} completed</span>
          </Link>
          
          <Link
            to="/voice-to-sign"
            className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold py-8 px-8 rounded-3xl uppercase tracking-wider text-xl shadow-3xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 text-center flex flex-col items-center justify-center h-32"
          >
            <span className="text-3xl mb-2">🎤</span>
            <span>Voice Practice</span>
            <span className="text-sm opacity-75 block mt-1">{userProgress.currentStreak} day streak</span>
          </Link>
        </div>

        {/* Motivational Footer - CENTERED */}
        <div className="mt-24 text-center text-gray-400 max-w-2xl mx-auto px-4">
          <p className="text-xl mb-6 leading-relaxed">"Every sign you learn brings you closer to fluent FSL communication" ✨</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm uppercase tracking-wider font-mono">
            <span>Next goal: <span className="text-[#e99b63] font-bold">{achievements.find(a => !a.unlocked)?.name || 'FSL Master'}</span></span>
            <div className="text-[#e99b63] font-bold text-lg mt-2 md:mt-0">Keep going! 🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
}
