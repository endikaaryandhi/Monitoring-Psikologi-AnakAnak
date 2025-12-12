import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { LogOut, LayoutDashboard, Calendar, Search } from 'lucide-react'

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
    fetchData()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) navigate('/admin-login')
  }

  const fetchData = async () => {
    const { data: results } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false })
    if (results) setData(results)
  }

  const filteredData = data.filter(item => 
    item.child_name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-lg">Monitoring Dashboard</span>
        </div>
        <button 
          onClick={async () => { await supabase.auth.signOut(); navigate('/'); }} 
          className="text-sm font-medium text-gray-500 hover:text-red-600 flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Total Responden</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{data.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <p className="text-gray-500 text-sm font-medium">Rata-rata Skor</p>
             <p className="text-4xl font-bold text-indigo-600 mt-2">
               {data.length > 0 ? (data.reduce((a, b) => a + b.score, 0) / data.length).toFixed(1) : 0}
             </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama anak..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Skor</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-700">{row.child_name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">
                        {row.score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded font-medium ${
                        row.score > 10 ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(row.created_at).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}