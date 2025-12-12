import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Smile, Meh, Frown } from 'lucide-react'
import Navbar from '../components/Navbar'

const questions = [
  { id: 1, text: "Bagaimana perasaanmu saat bangun tidur pagi ini?", type: "mood" },
  { id: 2, text: "Apakah kamu mudah marah jika mainanmu diambil?", type: "behavior" },
  { id: 3, text: "Apakah kamu senang bermain dengan teman-teman?", type: "social" },
  { id: 4, text: "Apakah kamu sering merasa sedih tiba-tiba?", type: "emotion" },
  { id: 5, text: "Apakah kamu bersemangat pergi ke sekolah?", type: "motivation" },
]

const options = [
  { label: "Tidak", score: 1, icon: <Frown size={40} /> },
  { label: "Sedikit", score: 2, icon: <Meh size={40} /> },
  { label: "Iya", score: 3, icon: <Smile size={40} /> },
]

export default function ChildQuiz() {
  const [step, setStep] = useState<'name' | 'quiz'>('name')
  const [name, setName] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) setStep('quiz')
  }

  const handleAnswer = async (score: number) => {
    const newAnswers = { ...answers, [currentIndex]: score }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      await submitQuiz(newAnswers)
    }
  }

  const submitQuiz = async (finalAnswers: Record<number, number>) => {
    setIsSubmitting(true)
    const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0)
    
    let category = 'Perlu Perhatian'
    if (totalScore > 12) category = 'Bahagia & Stabil'
    else if (totalScore > 8) category = 'Cukup Baik'

    await supabase.from('assessments').insert({
      child_name: name,
      score: totalScore,
      category,
      answers: finalAnswers
    })
    
    navigate('/result', { state: { score: totalScore, category, name } })
  }

  return (
    <div className="min-h-screen bg-[#E0F7FA] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Navbar />
      
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <AnimatePresence mode="wait">
        {step === 'name' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center max-w-md w-full z-10"
          >
            <h1 className="text-4xl font-black text-gray-800 mb-2">Halo!</h1>
            <p className="text-gray-500 mb-8 text-lg">Siapa namamu?</p>
            <form onSubmit={handleStart} className="space-y-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis namamu disini..."
                className="w-full text-center text-2xl font-bold py-4 border-b-4 border-gray-100 focus:border-secondary outline-none transition-colors placeholder:font-normal"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!name}
                className="w-full bg-secondary text-white py-4 rounded-2xl font-bold text-xl shadow-[0_6px_0_#3dbdb4] hover:shadow-[0_4px_0_#3dbdb4] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                Mulai Main <ArrowRight />
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl z-10"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-white">
              <div className="mb-8 flex justify-between items-center">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-sm">Pertanyaan {currentIndex + 1} / {questions.length}</span>
                <div className="h-3 w-32 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-12 text-center leading-tight">
                {questions[currentIndex].text}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => !isSubmitting && handleAnswer(opt.score)}
                    disabled={isSubmitting}
                    className="group flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-gray-100 hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
                  >
                    <div className="text-gray-400 group-hover:text-secondary group-hover:scale-110 transition-transform duration-300">
                      {opt.icon}
                    </div>
                    <span className="font-bold text-lg text-gray-600 group-hover:text-secondary">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}