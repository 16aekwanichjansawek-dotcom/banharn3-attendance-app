import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-school-primary to-purple-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-school-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="z-10 text-center max-w-3xl flex flex-col items-center">
        <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-xl mb-8 flex items-center justify-center shadow-2xl border border-white/30">
          <span className="text-4xl">??</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          ????????????????????????
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-school-secondary mb-10">
          ????????????????????????? 3
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
          ????????????????????????????????? ????????????????????? ?????????????????????????????????????? ?????? ??????????????????????
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/login" className="px-8 py-4 bg-school-secondary text-school-primary font-bold rounded-xl hover:bg-yellow-300 transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200 text-lg">
            ????????????????????
          </Link>
          <Link href="/dashboard" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition shadow-lg text-lg">
            ??????????? Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
