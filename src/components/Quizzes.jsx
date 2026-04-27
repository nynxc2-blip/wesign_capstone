import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Quizzes() {
  // Game state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [levelStars, setLevelStars] = useState([0, 0, 0, 0]);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizActive, setQuizActive] = useState(false);

  // Quiz levels data - **ONLY GIFs, NO WORDS ON CHOICES**
  const levels = [
    {
      id: 1,
      title: 'Beginner 1',
      subtitle: 'Greetings',
      stars: 0,
      unlocked: true,
      questions: [
        {
          question: "Which sign means 'kamusta'?",
          options: {
            A: '/fsl/kumusta.gif',      // ✅ Correct
            B: '/fsl/salamat.gif',      // Thanks  
            C: '/fsl/hindi.gif',        // No
            D: '/fsl/oo.gif'            // Yes
          },
          correct: 'A',
          tutorial: "Wave hand from forehead forward 👋"
        },
        {
          question: "Which sign means 'salamat'?",
          options: {
            A: '/fsl/salamat.gif',      // ✅ Correct
            B: '/fsl/kumusta.gif',      // Hello
            C: '/fsl/oo.gif',           // Yes
            D: '/fsl/hindi.gif'         // No
          },
          correct: 'A',
          tutorial: "Hand from chin forward 🙏"
        },
        {
          question: "Which sign means 'hindi'?",
          options: {
            A: '/fsl/oo.gif',           // Yes
            B: '/fsl/hindi.gif',        // ✅ Correct
            C: '/fsl/kumusta.gif',      // Hello
            D: '/fsl/salamat.gif'       // Thanks
          },
          correct: 'B',
          tutorial: "Shake head side-to-side ❌"
        },
        {
          question: "Which sign means 'oo'?",
          options: {
            A: '/fsl/hindi.gif',        // No
            B: '/fsl/kumusta.gif',      // Hello
            C: '/fsl/salamat.gif',      // Thanks
            D: '/fsl/oo.gif',           // ✅ Correct
          },
          correct: 'D',
          tutorial: "Nod head forward ✅"
        },
        {
          question: "Which sign means 'magandang umaga'?",
          options: {
            A: '/fsl/magandang-umaga.gif',
            B: '/fsl/magandang-gabi.gif',
            C: '/fsl/kumusta.gif', 
            D: '/fsl/salamat.gif'
          },
          correct: 'A',
          tutorial: "Sunrise + GOOD ✋"
        }
      ]
    },
    {
      id: 2,
      title: 'Beginner 2',
      subtitle: 'Family & Numbers',
      stars: 0,
      unlocked: false,
      questions: [
        {
          question: "Which sign means 'nanay'?",
          options: {
            A: '/fsl/nanay.gif',        // ✅ Correct
            B: '/fsl/tatay.gif',        // Father
            C: '/fsl/isa.gif',          // 1
            D: '/fsl/dalawa.gif'        // 2
          },
          correct: 'A',
          tutorial: "Open hand taps chin 👩"
        },
        {
          question: "Which sign means 'tatay'?",
          options: {
            A: '/fsl/nanay.gif',        // Mother
            B: '/fsl/tatay.gif',        // ✅ Correct
            C: '/fsl/isa.gif',          // 1
            D: '/fsl/dalawa.gif'        // 2
          },
          correct: 'B',
          tutorial: "Thumb taps forehead 👨"
        },
        {
          question: "Which sign means '1' (isa)?",
          options: {
            A: '/fsl/nanay.gif',        // Mother
            B: '/fsl/tatay.gif',        // Father
            C: '/fsl/isa.gif',          // ✅ Correct
            D: '/fsl/dalawa.gif'        // 2
          },
          correct: 'C',
          tutorial: "Index finger up ✋"
        }
      ]
    },
    {
      id: 3,
      title: 'Intermediate 1',
      subtitle: 'Questions & Phrases',
      stars: 0,
      unlocked: false,
      questions: [
        {
          question: "Which sign means 'kumusta'?",
          options: {
            A: '/fsl/kumusta.gif',   // ✅ Correct
            B: '/fsl/ano-yan.gif',      // What is that?
            C: '/fsl/sino.gif',         // Who?
            D: '/fsl/saan.gif'          // Where?
          },
          correct: 'A',
          tutorial: "KUMUSTA with raised eyebrows ❓"
        }
      ]
    },
    {
      id: 4,
      title: 'Intermediate 2',
      subtitle: 'Sentences',
      stars: 0,
      unlocked: false,
      questions: [
        {
          question: "Which sign means 'hinid alam'?",
          options: {
            A: '/fsl/hindi-ko-alam.gif', // ✅ Correct
            B: '/fsl/mabuti-naman.gif',  // I'm fine
            C: '/fsl/salamat-po.gif',    // Thank you (polite)
            D: '/fsl/kita-bukas.gif'     // See you tomorrow
          },
          correct: 'A',
          tutorial: "HINDI + palms up shrug 🤷"
        }
      ]
    }
  ];

  // Game functions
  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setFeedbackVisible(true);
    
    const currentQuiz = levels[currentLevel - 1];
    const question = currentQuiz.questions[currentQuestion];
    const isCorrect = answer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < levels[currentLevel - 1].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const percentage = (score / levels[currentLevel - 1].questions.length) * 100;
      let starsEarned = 0;
      if (percentage === 100) starsEarned = 3;
      else if (percentage >= 80) starsEarned = 2;
      else if (percentage >= 60) starsEarned = 1;
      
      const newStars = [...levelStars];
      newStars[currentLevel - 1] = Math.max(newStars[currentLevel - 1], starsEarned);
      setLevelStars(newStars);
      
      if (currentLevel < 4 && starsEarned > 0) {
        levels[currentLevel].unlocked = true;
      }
      
      setShowResults(true);
    }
    setSelectedAnswer(null);
    setFeedbackVisible(false);
  };

  const restartLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const startQuiz = (levelId) => {
    setCurrentLevel(levelId);
    setCurrentQuestion(0);
    setScore(0);
    setQuizActive(true);
    setShowResults(false);
  };

  const levelCard = (level, index) => (
    <div 
      className={`group rounded-xl border p-6 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
        level.unlocked 
          ? 'bg-gradient-to-br from-[#e99b63]/20 backdrop-blur-xl border-[#e99b63]/40 hover:border-[#e99b63]/70 shadow-xl hover:shadow-2xl' 
          : 'bg-black/50 border-[#e99b63]/20 opacity-60'
      }`}
      onClick={() => level.unlocked && startQuiz(level.id)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-[#e99b63] to-[#CAB87E] rounded-lg flex items-center justify-center shadow-lg">
          <span className="font-bold text-xl">L{level.id}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-1" style={{ color: "#CAB87E" }}>
            {level.title}
          </h2>
          <p className="text-gray-400 text-sm uppercase tracking-wider">{level.subtitle}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        {Array(3).fill(0).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              levelStars[index] > i 
                ? 'bg-yellow-400 border-yellow-400 shadow-lg' 
                : 'bg-gray-800 border-gray-600 hover:border-[#e99b63]/50'
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>{levelStars[index]}⭐</span>
        {!level.unlocked && <span className="px-2 py-1 bg-black/50 rounded-full text-xs">🔒</span>}
      </div>
    </div>
  );

  // Results screen
  if (showResults) {
    const percentage = (score / levels[currentLevel - 1].questions.length) * 100;
    return (
      <div className="min-h-screen flex flex-col items-center p-8 bg-black text-white justify-center">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="w-full h-screen bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-pink-400/30 animate-ping" />
          </div>
        )}
        
        <div className="w-full max-w-2xl mt-16 rounded-2xl shadow-2xl bg-gradient-to-br from-black via-[#e99b63]/10 to-[#232323] p-12 border-2 border-[#e99b63]/40 text-center">
          <div className="text-6xl mb-8">🎉</div>
          <h1 className="text-4xl font-bold mb-6" style={{ color: "#CAB87E" }}>Quiz Complete!</h1>
          <div className="text-5xl font-black mb-8">{score}/{levels[currentLevel - 1].questions.length}</div>
          
          <div className="w-full bg-gray-800 rounded-xl h-6 mb-8 overflow-hidden border border-gray-600">
            <div 
              className="h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-lg transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <p className="text-xl text-gray-200 mb-12">
            {percentage === 100 ? 'Perfect! 🌟🌟🌟' : percentage >= 80 ? 'Excellent! ⭐⭐' : 'Great job! ⭐'}
          </p>
          
          <div className="space-y-4">
            <Link
              to="/voice-to-sign"
              className="block w-full bg-gradient-to-r from-[#e99b63] to-[#CAB87E] text-black font-bold py-4 px-8 rounded-xl uppercase tracking-wider text-lg shadow-lg hover:scale-105 transition-all"
            >
              🎤 Practice with Voice
            </Link>
            <button
              onClick={restartLevel}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 py-4 px-8 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="w-full bg-gray-800/50 border border-gray-600 py-4 px-8 rounded-xl font-bold hover:bg-gray-700 transition-all"
            >
              ← Back to Levels
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-black text-white">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#e99b63]/40 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute bottom-1/4 right-20 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-yellow-400/30 rounded-full animate-bounce" style={{animationDelay: '3s'}} />
      </div>

      <div className="w-full max-w-3xl mt-16 rounded-2xl shadow-2xl bg-gradient-to-br from-black via-[#e99b63]/10 to-[#232323] p-8 border-2 border-[#e99b63]/40 relative z-10">
        
        {/* Header */}
        {!quizActive && !showResults ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4" style={{ color: "#CAB87E" }}>FSL Quizzes</h1>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                **Study the GIFs carefully!** No words on choices - real FSL recognition training. ⭐
              </p>
              <div className="flex items-center gap-6 justify-center text-sm text-gray-400 uppercase tracking-wider font-mono mb-12">
                <span>Streak: {streak} 🔥</span>
                <span>Best: {Math.max(...levelStars)}⭐</span>
              </div>
            </div>
            
            {/* Level Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {levels.map((level, index) => levelCard(level, index))}
            </div>
          </>
        ) : (
          /* Active Quiz - GIF ONLY CHOICES */
          <>
            {/* Progress Header */}
            <div className="flex items-center gap-4 mb-8 p-6 bg-black/50 rounded-xl border border-[#e99b63]/30">
              <div className="w-14 h-14 bg-gradient-to-r from-[#e99b63] to-[#CAB87E] rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-2xl">L{currentLevel}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  {currentQuestion + 1}/{levels[currentLevel - 1].questions.length}
                </p>
                <div className="w-32 bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#e99b63] to-[#CAB87E] h-3 rounded-full shadow-lg transition-all duration-700"
                    style={{ width: `${((currentQuestion + 1) / levels[currentLevel - 1].questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 px-4 leading-tight" style={{ color: "#CAB87E" }}>
                {levels[currentLevel - 1].questions[currentQuestion].question}
              </h2>
            </div>

            {/* GIF-ONLY Answer Buttons */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {Object.entries(levels[currentLevel - 1].questions[currentQuestion].options).map(([key, gifPath]) => (
                <button
                  key={key}
                  onClick={() => selectAnswer(key)}
                  disabled={selectedAnswer !== null}
                  className={`group relative aspect-square p-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg overflow-hidden ${
                    selectedAnswer === key
                      ? key === levels[currentLevel - 1].questions[currentQuestion].correct
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-4 border-emerald-400 shadow-emerald-500/50 scale-105 ring-4 ring-emerald-400/50'
                        : 'bg-gradient-to-br from-red-500 to-rose-600 border-4 border-red-400 shadow-red-500/50 scale-105 ring-4 ring-red-400/50'
                      : 'bg-black/60 backdrop-blur-xl border-2 border-[#e99b63]/30 hover:border-[#e99b63]/60 hover:bg-[#e99b63]/10 hover:shadow-xl hover:scale-102 active:scale-98'
                  }`}
                  aria-label={`${key} option`}
                >
                  {/* LARGE CENTRAL GIF - NO WORDS */}
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-black/70 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[#e99b63]/30 transition-all duration-300">
                    <img 
                      src={gifPath} 
                      alt={`Option ${key}`}
                      className="w-full h-full object-cover animate-pulse"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/160x160/333/fff?text=${key}`;
                      }}
                    />
                  </div>
                  
                  {/* ONLY LETTER LABEL BELOW */}
                  <div className="mt-4 text-center">
                    <div className="text-2xl md:text-3xl font-black uppercase tracking-widest text-gray-300 group-hover:text-[#e99b63]">
                      {key}
                    </div>
                  </div>
                  
                  {/* Feedback overlay */}
                  {selectedAnswer === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl">
                      <span className={`text-4xl font-black ${
                        key === levels[currentLevel - 1].questions[currentQuestion].correct ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {key === levels[currentLevel - 1].questions[currentQuestion].correct ? '✅' : '❌'}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedbackVisible && selectedAnswer && (
              <div className={`p-6 rounded-xl mb-8 backdrop-blur-xl shadow-xl border transition-all ${
                selectedAnswer === levels[currentLevel - 1].questions[currentQuestion].correct
                  ? 'bg-emerald-500/15 border-emerald-400/40 shadow-emerald-400/25'
                  : 'bg-red-500/15 border-red-400/40 shadow-red-400/25'
              }`}>
                <p className="text-xl font-bold text-center uppercase tracking-wider mb-3">
                  {selectedAnswer === levels[currentLevel - 1].questions[currentQuestion].correct 
                    ? 'Perfect! ✨' 
                    : `Correct answer: ${levels[currentLevel - 1].questions[currentQuestion].correct}`
                  }
                </p>
                {selectedAnswer !== levels[currentLevel - 1].questions[currentQuestion].correct && (
                  <p className="text-gray-300 text-sm italic text-center mt-2">
                    💡 {levels[currentLevel - 1].questions[currentQuestion].tutorial}
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer !== null && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={nextQuestion}
                  className="flex-1 bg-gradient-to-r from-[#e99b63] to-[#CAB87E] text-black font-bold py-4 px-8 rounded-xl uppercase tracking-wider text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  {currentQuestion === levels[currentLevel - 1].questions.length - 1 ? '🎉 Finish Quiz' : 'Next →'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Practice Voice Link */}
        {!showResults && (
          <Link
            to="/voice-to-sign"
            className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#e99b63]/20 backdrop-blur-xl border-2 border-[#e99b63]/40 px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e99b63]/30 hover:border-[#e99b63]/60 transition-all shadow-lg hover:shadow-xl"
          >
            🎤 Practice Speaking First
          </Link>
        )}
      </div>
    </div>
  );
}
