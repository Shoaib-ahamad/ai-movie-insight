'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Film, Loader2, BrainCircuit, AlertCircle, Clock, Calendar } from 'lucide-react';
import { getMovieInsights } from './actions'; // Import the server action

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    setData(null);

    // Call the Server Action
    const result = await getMovieInsights(query);

    if (result.error) {
      setError(result.error);
    } else {
      setData(result.data);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Background Gradient Blurs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center relative z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center max-w-3xl mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-gray-900 border border-gray-800">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Powered by Gemini AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Movie Insight <span className="text-purple-500">Builder</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Instantly analyze audience sentiment using AI. Enter an IMDb ID (e.g., <span className="text-white font-mono bg-gray-800 px-2 py-1 rounded">tt0133093</span>) to decode the reviews.
          </p>

          {/* --- SEARCH BAR --- */}
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
              <Search className="w-5 h-5 ml-4 text-gray-500 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Enter IMDb ID (e.g., tt0133093)"
                className="w-full bg-transparent p-4 text-white placeholder-gray-500 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-white text-black px-6 py-4 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg inline-flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- RESULTS SECTION --- */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl"
            >
              <div className="relative bg-gray-900/60 backdrop-blur-2xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                
                {/* Backdrop Image Overlay */}
                {data.backdrop && (
                  <div className="absolute inset-0 z-0">
                    <img src={data.backdrop} alt="Backdrop" className="w-full h-full object-cover opacity-20 mask-image-gradient" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 p-6 md:p-12 flex flex-col lg:flex-row gap-10">
                  
                  {/* Left: Poster */}
                  <div className="w-full lg:w-1/3 flex-shrink-0">
                    <motion.img 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      src={data.poster} 
                      alt={data.title} 
                      className="w-full rounded-2xl shadow-2xl border border-gray-700/50 hover:scale-[1.02] transition-transform duration-500" 
                    />
                  </div>

                  {/* Right: Details */}
                  <div className="w-full lg:w-2/3 space-y-8">
                    
                    {/* Header Info */}
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{data.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">
                          <Star className="w-4 h-4 fill-current" /> {data.rating}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                          <Calendar className="w-4 h-4" /> {data.year}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                          <Clock className="w-4 h-4" /> {data.runtime}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {data.genres?.map((g: string) => (
                          <span key={g} className="text-xs font-semibold px-2 py-1 bg-gray-800 text-gray-400 rounded border border-gray-700 uppercase tracking-wide">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Plot */}
                    <div className="prose prose-invert">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                        <Film className="w-5 h-5 text-gray-400" /> Storyline
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">{data.plot}</p>
                    </div>

                    {/* --- AI INSIGHT CARD --- */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-purple-500 to-blue-500"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                      
                      <div className="relative bg-gray-900/90 p-6 md:p-8 rounded-2xl h-full backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                              <BrainCircuit className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                              AI Audience Analysis
                            </h3>
                          </div>
                          
                          {/* Sentiment Badge */}
                          <div className={`px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-wide shadow-lg
                            ${data.ai.sentiment === 'Positive' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-green-900/20' : 
                              data.ai.sentiment === 'Negative' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-red-900/20' : 
                              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-yellow-900/20'}`}>
                            {data.ai.sentiment}
                          </div>
                        </div>

                        <p className="text-gray-300 text-lg italic mb-6 border-l-4 border-purple-500/50 pl-4">
                          "{data.ai.summary}"
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Pros */}
                          <div>
                            <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> 
                              The Good
                            </h4>
                            <ul className="space-y-2">
                              {data.ai.pros?.map((pro: string, i: number) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                  <span className="text-green-500/50 mt-1">✓</span> {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Cons */}
                          <div>
                            <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                              The Bad
                            </h4>
                            <ul className="space-y-2">
                              {data.ai.cons?.map((con: string, i: number) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                  <span className="text-red-500/50 mt-1">×</span> {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                    {/* End AI Card */}

                    <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
                      <strong>Cast:</strong> {data.cast}
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}