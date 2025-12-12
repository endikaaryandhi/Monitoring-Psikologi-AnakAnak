import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RefreshCw, Home, Gamepad2, ExternalLink, Play } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function ChildResult() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [gameLoaded, setGameLoaded] = useState(false)
  
  const isLowScore = state?.score <= 8

  useEffect(() => {
    if (!isLowScore) {
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
    }
  }, [isLowScore])

  if (!state) return null

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 gap-8 overflow-y-auto py-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white rounded-[3rem] p-10 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden z-10"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            {isLowScore ? "Tetap Semangat, " : "Terima Kasih, "}{state.name}!
          </h1>
          <p className="text-gray-400 font-medium">
            {isLowScore ? "Jangan sedih ya, ada kejutan di bawah!" : "Kamu sudah menjawab dengan jujur"}
          </p>
          
          <div className="my-8 py-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <span className="block text-6xl font-black text-secondary mb-2">{state.score}</span>
             <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${isLowScore ? 'bg-red-100 text-red-600' : 'bg-accent text-yellow-900'}`}>
               {state.category}
             </span>
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

      {isLowScore && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-[#2C2C54] rounded-[3rem] p-8 max-w-2xl w-full shadow-2xl border-4 border-accent text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-accent p-3 rounded-2xl text-yellow-900 rotate-3">
              <Gamepad2 size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Main Game Dulu Yuk!</h2>
          </div>
          
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Hilangkan rasa sedihmu dengan bermain game seru ini sepuasnya!
          </p>

          <div className="relative w-full aspect-[485/402] rounded-3xl overflow-hidden bg-black shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/10 mb-8 mx-auto max-w-[485px]">
            {!gameLoaded ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 gap-4">
                <button 
                  onClick={() => setGameLoaded(true)}
                  className="group relative flex items-center justify-center w-20 h-20 bg-accent rounded-full hover:scale-110 transition-all shadow-lg shadow-accent/20"
                >
                  <Play size={32} className="text-yellow-900 fill-yellow-900 ml-1" />
                  <span className="absolute -inset-4 rounded-full border-4 border-accent/30 animate-ping" />
                </button>
                <span className="text-white font-bold text-lg animate-pulse">Tap untuk Main</span>
              </div>
            ) : (
              <iframe 
                src="https://turbowarp.org/1240143269/embed" 
                width="100%" 
                height="100%" 
                allowTransparency={true}
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                className="absolute inset-0"
              />
            )}
          </div>

          <a 
            href="https://turbowarp.org/1240143269/fullscreen" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-300 text-yellow-900 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-accent/20"
          >
            <ExternalLink size={20} /> Buka Game Full Screen
          </a>
        </motion.div>
      )}
    </div>
  )
}