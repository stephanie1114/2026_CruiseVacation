import React, { useState } from 'react';
import { TripData, ActivityType, Activity } from '../types';
import { MapPin, Utensils, Bus, BedDouble, Flower, Plane, Landmark, Ship } from 'lucide-react';

interface ItineraryViewProps {
  trip: TripData;
  fontScale: 'normal' | 'large' | 'extra';
}

const getActivityIcon = (activity: Activity, className: string = "h-4 w-4") => {
  if (activity.type === ActivityType.Travel) {
    const t = activity.title.toLowerCase();
    if (t.includes('flight') || t.includes('ci753') || t.includes('tpe') || t.includes('sin') || t.includes('plane') || t.includes('airport')) {
      return <Plane className={className} />;
    }
    return <Bus className={className} />;
  }

  switch (activity.type) {
    case ActivityType.Food: return <Utensils className={className} />;
    case ActivityType.Sightseeing: 
      // Use MapPin for landmarks/sightseeing as requested
      return <MapPin className={className} />;
    case ActivityType.Rest: return <BedDouble className={className} />;
    case ActivityType.Activity: return <Flower className={className} />;
    case ActivityType.Cruise: return <Ship className={className} />;
    default: return <MapPin className={className} />;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case ActivityType.Food: return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    case ActivityType.Travel: return 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800';
    case ActivityType.Sightseeing: return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800';
    case ActivityType.Rest: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    case ActivityType.Activity: return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    case ActivityType.Cruise: return 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800';
    default: return 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700';
  }
};

// Helper to format date as M/D (e.g., 1/10)
const getFormattedDate = (startDateStr: string, dayOffset: number) => {
  try {
    const date = new Date(startDateStr);
    date.setDate(date.getDate() + dayOffset);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  } catch (e) {
    return `Day ${dayOffset + 1}`;
  }
};

export const ItineraryView: React.FC<ItineraryViewProps> = ({ trip, fontScale }) => {
  const [activeDay, setActiveDay] = useState(0);

  // Dynamic font sizing classes
  const titleSize = fontScale === 'extra' ? 'text-3xl' : fontScale === 'large' ? 'text-2xl' : 'text-xl';
  const headingSize = fontScale === 'extra' ? 'text-2xl' : fontScale === 'large' ? 'text-xl' : 'text-lg';
  const bodySize = fontScale === 'extra' ? 'text-lg' : fontScale === 'large' ? 'text-base' : 'text-sm';
  const timeSize = fontScale === 'extra' ? 'text-sm' : 'text-xs';

  const renderDescription = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content: React.ReactNode = line;
      
      /*特別文字上色清單*/
      const redPhrases = [
        "建議 06:00-06:30AM 抵達機場",
        "19:45 & 20:45戶外天空樹燈光秀",
        "22:00前一定要上船",
        "18:00前回郵輪上"
      ];

      const brandPhrases = [
        "SMRT機場➔丹那美拉(轉綠線)➔政府大廈",
        "SMRT政府大廈➔萊佛士坊",
        "SMRT直落亞逸➔海灣舫",
        "SMRT海灣舫➔濱海灣(轉紅線)➔政府大廈",
        "SMRT政府大廈➔濱海南碼頭",
        "SMRT政府大廈➔南華園(轉紫線)➔港灣",
        "轉 單軌電車Vivo City➔resorts World",
        "單軌電車resorts World➔Vivo City",
        "SMRT濱海灣➔政府大廈",
        "轉 SMRT港灣➔克拉碼頭",
        "SMRT濱海南碼頭➔政府大廈(轉綠)➔丹那美拉➔機場"
      ];

      const orangePhrases = [
        "安德烈教堂"
      ];

      // Find which phrase matches this line
      const foundRed = redPhrases.find(p => line.includes(p));
      const foundBrand = brandPhrases.find(p => line.includes(p));
      const foundOrange = orangePhrases.find(p => line.includes(p));

      if (foundRed) {
        const parts = line.split(foundRed);
        content = (
          <>
            {parts[0]}
            <span className="text-rose-600 dark:text-rose-400 font-bold">{foundRed}</span>
            {parts[1]}
          </>
        );
      } else if (foundBrand) {
         const parts = line.split(foundBrand);
         content = (
          <>
            {parts[0]}
            <span className="text-brand-600 dark:text-brand-400 font-bold">{foundBrand}</span>
            {parts[1]}
          </>
        );
      } else if (foundOrange) {
         const parts = line.split(foundOrange);
         content = (
          <>
            {parts[0]}
            <span className="text-amber-500 font-bold">{foundOrange}</span>
            {parts[1]}
          </>
        );
      }

      return (
        <React.Fragment key={idx}>
          {content}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Get the current day object to render
  const day = trip.days[activeDay];

  return (
    <div className="pb-32 flex flex-col min-h-[101vh]">
      {/* Day Selector (Sticky) - top-0 to fit perfectly */}
      <div className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-300">
        <div className="overflow-x-auto no-scrollbar py-3 px-4 flex space-x-3 snap-x">
          {trip.days.map((d, idx) => {
            const isActive = activeDay === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveDay(idx);
                  // Instant scroll to top ensures consistent positioning between days
                  const mainContainer = document.getElementById('main-scroll-container');
                  if (mainContainer) {
                    mainContainer.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                className={`
                  flex-shrink-0 snap-center min-w-[85px] py-2 px-3 rounded-xl border transition-all duration-300
                  flex flex-col items-center justify-center
                  ${isActive 
                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30' 
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:border-brand-300 dark:hover:border-brand-700'}
                `}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isActive ? 'text-brand-100' : 'text-stone-400'}`}>
                  DAY {d.dayNumber}
                </span>
                <span className={`font-bold font-rounded whitespace-nowrap ${isActive ? 'text-lg' : 'text-base'}`}>
                  {getFormattedDate(trip.startDate, idx)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Day Content */}
      <div className="p-4 space-y-8 max-w-2xl mx-auto mt-4 w-full flex-1">
        {day && (
          <div 
            key={activeDay} // Key change triggers animation
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="flex items-center mb-6">
               <div className="h-8 w-1 bg-brand-500 rounded-full mr-4"></div>
               <div>
                 <h2 className={`${headingSize} font-bold text-stone-900 dark:text-white font-rounded`}>
                   Day {day.dayNumber}
                 </h2>
                 <p className={`${bodySize} text-stone-500 dark:text-stone-400 font-medium`}>{day.title}</p>
               </div>
            </div>

            <div className="space-y-4 pl-2 border-l-2 border-stone-100 dark:border-stone-800 ml-1.5">
              {day.activities.map((activity, actIdx) => (
                <div key={actIdx} className="relative pl-8 pb-4 group">
                   {/* Timeline Dot with Icon */}
                   <div className={`absolute -left-[17px] top-0 h-8 w-8 rounded-full border-0 ring-4 ring-stone-50 dark:ring-stone-950 flex items-center justify-center shadow-sm ${getActivityColor(activity.type)} z-10`}>
                     {getActivityIcon(activity, "h-4 w-4")}
                   </div>
                   
                   {/* Card - Moved up by 5px */}
                   <div className="bg-white dark:bg-stone-900 p-5 rounded-[1.5rem] border-2 border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800/50 transition-all -translate-y-[5px]">
                     <div className="flex justify-between items-start mb-2">
                        {/* Time Tag without Icon */}
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider ${getActivityColor(activity.type)}`}>
                           <span className="">{activity.time}</span>
                        </div>
                        {activity.location && (
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-xs font-medium text-stone-400 hover:text-brand-500 dark:hover:text-brand-400 ml-2 text-right transition-colors"
                          >
                             <MapPin className="h-3 w-3 mr-1" />
                             <span className="underline underline-offset-2 decoration-stone-200 dark:decoration-stone-700 hover:decoration-brand-300">{activity.location}</span>
                          </a>
                        )}
                     </div>
                     
                     <h3 className={`${headingSize} font-bold text-stone-800 dark:text-stone-100 mb-2`}>{activity.title}</h3>
                     <div className={`${bodySize} text-stone-500 dark:text-stone-400 leading-relaxed`}>
                       {renderDescription(activity.description)}
                     </div>
                   </div>
                </div>
              ))}
              {/* Bottom Spacer to prevent overlap with nav */}
              <div className="h-24"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
