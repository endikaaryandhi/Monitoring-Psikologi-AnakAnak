import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Brain, Users, Globe, Wallet, AlertCircle, Heart, Star, Activity, ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'

const SectionCard = ({ children, className, title, icon }: { children: React.ReactNode, className?: string, title: string, icon: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={clsx("bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden relative", className)}
  >
    <div className="flex items-center gap-4 mb-8 relative z-10">
      <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
)

export default function Education() {
  const [activeStage, setActiveStage] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans selection:bg-secondary/30">
      <Navbar />
      
      <header className="pt-32 pb-20 px-6 relative overflow-hidden bg-white rounded-b-[4rem] shadow-sm mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-tr from-secondary to-teal-400 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-xl shadow-secondary/30 rotate-3"
          >
            <Brain size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Mengenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Psikologi Anak</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Ilmu pengetahuan yang mencakup pertumbuhan fisik, kognitif, sosial, hingga emosional anak mulai dari lahir hingga remaja.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <SectionCard title="Faktor Budaya" icon={<Globe />} className="bg-blue-50/50 border-blue-100">
            <p className="text-gray-600 leading-relaxed">
              Memengaruhi nilai, kebiasaan, asumsi bersama, dan cara hidup. Berhubungan erat dengan jenis pendidikan dan pola asuh yang diterima anak.
            </p>
          </SectionCard>
          <SectionCard title="Faktor Sosial" icon={<Users />} className="bg-green-50/50 border-green-100">
            <p className="text-gray-600 leading-relaxed">
              Hubungan dengan teman sebaya dan orang dewasa memengaruhi cara berpikir. Lingkungan sekolah memegang peran vital di sini.
            </p>
          </SectionCard>
          <SectionCard title="Ekonomi" icon={<Wallet />} className="bg-amber-50/50 border-amber-100">
            <p className="text-gray-600 leading-relaxed">
              Kelas sosial berdampak pada akses pendidikan, fasilitas kesehatan, lingkungan tempat tinggal, dan nutrisi yang didapatkan.
            </p>
          </SectionCard>
        </div>

        <SectionCard title="Mengapa Ini Penting?" icon={<Heart />} className="md:col-span-3">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              "Mengelola emosi dengan lebih baik",
              "Memastikan fase tumbuh kembang sesuai",
              "Deteksi dini pola psikologis abnormal",
              "Mengenali perasaan dan trauma anak",
              "Membangun komunikasi orang tua-anak",
              "Antisipasi masalah kesehatan mental"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-md transition-all group">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <span className="font-medium text-gray-700 mt-1">{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tahapan Perkembangan" icon={<Activity />} className="overflow-visible">
          <div className="space-y-4">
            {[
              { title: "Sensorimotor", age: "0–2 Tahun", desc: "Fokus pada fisik & koordinasi. Mulai mengenali benda permanen dan diri sendiri." },
              { title: "Praoperasional", age: "2–7 Tahun", desc: "Berpikir simbolis tapi belum logis. Fase 'Terrible Two' dan benda mati dianggap hidup." },
              { title: "Operasional Konkret", age: "7–11 Tahun", desc: "Mulai berpikir logis tentang hal nyata. Memahami perspektif orang lain." },
              { title: "Operasional Formal", age: "11+ Tahun", desc: "Berpikir abstrak, nalar kompleks, etika, politik, dan pemikiran ilmiah." }
            ].map((stage, idx) => (
              <motion.div 
                key={idx}
                onClick={() => setActiveStage(activeStage === idx ? null : idx)}
                className={clsx(
                  "cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden",
                  activeStage === idx 
                    ? "bg-gray-900 border-gray-900 shadow-xl scale-[1.02]" 
                    : "bg-white border-gray-100 hover:border-gray-300"
                )}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={clsx(
                      "font-bold px-4 py-2 rounded-xl text-sm transition-colors",
                      activeStage === idx ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    )}>
                      {stage.age}
                    </div>
                    <h3 className={clsx(
                      "text-lg font-bold transition-colors",
                      activeStage === idx ? "text-white" : "text-gray-800"
                    )}>
                      {stage.title}
                    </h3>
                  </div>
                  <ChevronDown className={clsx(
                    "transition-transform duration-300",
                    activeStage === idx ? "rotate-180 text-white" : "text-gray-400"
                  )} />
                </div>
                {activeStage === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-gray-400 border-t border-white/10 pt-4 ml-20"
                  >
                    {stage.desc}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-8">
          <SectionCard title="Gangguan Psikologis" icon={<AlertCircle />}>
            <div className="flex flex-wrap gap-2">
              {[
                "Pervasif", "Retardasi Mental", "Gangguan Belajar",
                "Komunikasi", "ADHD", "Kecemasan",
                "Bipolar", "Auditori", "Eliminasi"
              ].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100 hover:bg-red-100 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </SectionCard>

          <div className="bg-gradient-to-br from-secondary to-teal-600 rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Star className="fill-white" />
                <h2 className="text-2xl font-bold">Tips Orang Tua</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Amati interaksi bermain anak",
                  "Jadilah teman yang aman",
                  "Puji perilaku positif",
                  "Hargai pendapat mereka"
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium opacity-90">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="mt-8 w-full py-4 bg-white text-secondary font-bold rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg">
              Cari Bantuan Profesional <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}