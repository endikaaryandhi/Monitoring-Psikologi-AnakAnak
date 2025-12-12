import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else navigate('/admin-dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm border border-gray-700 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Lock size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-8">Admin Access</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20"
          >
            {loading ? 'Processing...' : 'Enter Dashboard'}
          </button>
        </form>
        <button onClick={() => navigate('/')} className="w-full text-center text-gray-500 mt-6 text-sm hover:text-gray-300">
          Back to Quiz
        </button>
      </motion.div>
    </div>
  )
}