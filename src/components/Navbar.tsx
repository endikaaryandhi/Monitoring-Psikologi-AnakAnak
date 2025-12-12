import { useNavigate } from 'react-router-dom'
import { KeyRound, Ghost, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
      <div 
        onClick={() => navigate('/')}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm pointer-events-auto flex items-center gap-2 cursor-pointer hover:bg-white transition-colors"
      >
        <Ghost className="text-secondary" />
        <span className="font-bold text-gray-700">PsychoKiddo</span>
      </div>
      
      <div className="flex gap-3 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/edukasi')}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors text-gray-500 hover:text-accent shadow-sm"
        >
          <BookOpen size={20} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/admin-login')}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors text-gray-500 hover:text-primary shadow-sm"
        >
          <KeyRound size={20} />
        </motion.button>
      </div>
    </nav>
  )
}