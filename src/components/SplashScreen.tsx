import { useEffect, useState } from 'react'

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(onFinish, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-300 via-purple-200 to-pink-200 transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div className="h-32 w-32 animate-bounce rounded-full bg-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)] ring-4 ring-yellow-200/50">
            <div className="absolute top-10 left-8 h-4 w-4 rounded-full bg-slate-800/80" />
            <div className="absolute top-10 right-8 h-4 w-4 rounded-full bg-slate-800/80" />
            <div className="absolute bottom-8 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full border-b-[5px] border-slate-800/80" />
            <div className="absolute top-12 left-6 h-2 w-3 rotate-12 rounded-full bg-pink-400/60 blur-[1px]" />
            <div className="absolute top-12 right-6 h-2 w-3 -rotate-12 rounded-full bg-pink-400/60 blur-[1px]" />
          </div>
          
          <div className="absolute -top-6 -right-8 animate-pulse">
            <div className="text-4xl">✨</div>
          </div>
          <div className="absolute -bottom-2 -left-8 animate-pulse delay-700">
            <div className="text-3xl">🎈</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-bold tracking-wide text-indigo-600 drop-shadow-sm">
            Halo Teman!
          </h1>
          <div className="flex gap-2">
            <div className="h-3 w-3 animate-[bounce_1s_infinite_100ms] rounded-full bg-indigo-400" />
            <div className="h-3 w-3 animate-[bounce_1s_infinite_200ms] rounded-full bg-pink-400" />
            <div className="h-3 w-3 animate-[bounce_1s_infinite_300ms] rounded-full bg-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen