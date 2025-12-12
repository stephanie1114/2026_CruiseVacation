import React, { useState } from 'react';
import { TripGenerationParams } from '../types';
import { Loader2, MapPin, Calendar, Heart, Anchor } from 'lucide-react';

interface TripGeneratorProps {
  onGenerate: (params: TripGenerationParams) => Promise<void>;
  isGenerating: boolean;
  onCancel: () => void;
}

export const TripGenerator: React.FC<TripGeneratorProps> = ({ onGenerate, isGenerating, onCancel }) => {
  const [destination, setDestination] = useState('Singapore & Thailand Cruise');
  const [startDate, setStartDate] = useState('2025-01-10');
  const [interests, setInterests] = useState('Food, Relaxing, Sightseeing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      destination,
      startDate,
      duration: 7,
      travelers: "Family",
      interests
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-stone-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-md space-y-8 bg-stone-900 p-8 rounded-[2rem] border border-stone-800 shadow-2xl relative overflow-hidden">
        {/* Decorative Background blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mb-4 text-white shadow-lg shadow-brand-500/30">
            <Anchor className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight font-rounded">Plan Your Voyage</h2>
          <p className="text-stone-400">Where are we sailing next?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="relative group">
              <MapPin className="absolute left-4 top-4 h-5 w-5 text-stone-500 group-focus-within:text-brand-400 transition-colors" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-stone-600"
              />
            </div>
            
            <div className="relative group">
              <Calendar className="absolute left-4 top-4 h-5 w-5 text-stone-500 group-focus-within:text-brand-400 transition-colors" />
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all [color-scheme:dark]"
              />
            </div>

            <div className="relative group">
              <Heart className="absolute left-4 top-4 h-5 w-5 text-stone-500 group-focus-within:text-brand-400 transition-colors" />
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Interests"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-stone-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Planning Course...
                </>
              ) : (
                "Start Adventure"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isGenerating}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium py-4 rounded-2xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        {isGenerating && (
          <div className="text-center text-sm text-brand-400 animate-pulse font-medium">
            Charting the stars and seas...
          </div>
        )}
      </div>
    </div>
  );
};