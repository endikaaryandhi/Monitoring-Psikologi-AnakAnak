import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RefreshCw, Home } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function ChildResult() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  if (!state) return null

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white rounded-[3rem] p-10 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-gray-800 mb-2">Terima Kasih, {state.name}!</h1>
          <p className="text-gray-400 font-medium">Kamu sudah menjawab dengan jujur</p>
          
          <div className="my-8 py-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <span className="block text-6xl font-black text-secondary mb-2">{state.score}</span>
             <span className="px-4 py-1 bg-accent text-yellow-800 rounded-full text-sm font-bold uppercase tracking-wider">{state.category}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => navigate('/')} 
               className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-colors"
             >
               <Home size={24} />
               <span>Home</span>
             </button>
             <button 
               onClick={() => navigate(0)} 
               className="bg-secondary hover:bg-teal-400 text-white py-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-colors"
             >
               <RefreshCw size={24} />
               <span>Ulangi</span>
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}