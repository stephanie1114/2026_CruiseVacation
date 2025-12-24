import React, { useState, useEffect } from 'react';
import { TripData, Member, ExpenseItem, PreparationItem } from './types';
import { SAMPLE_TRIP } from './constants';
import { ItineraryView } from './components/ItineraryView';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { 
  Map as MapIcon, 
  MapPin,
  Wallet, 
  CheckSquare, 
  Users,
  Home,
  Sun,
  Moon,
  CheckCircle2,
  Circle,
  X,
  User,
  Type,
  Ship,
  CloudRain,
  CloudSun,
  Cloud,
  Thermometer,
  ExternalLink,
  Smartphone,
  HelpCircle,
  ChevronDown,
  Maximize2,
  BedDouble,
  RefreshCcw,
  Calculator,
  CircleDollarSign,
  Backpack,
  Luggage,
  FileText,
  Calendar
} from 'lucide-react';

const STORAGE_KEY = 'family_trip_planner_data_v7_cadet';
const THEME_KEY = 'family_trip_theme_pref_v1';
const FONT_PREF_KEY = 'family_trip_font_pref_v1';
const PREP_CHECKED_KEY = 'family_trip_prep_checked_v1';
type FontScale = 'normal' | 'large' | 'extra';

// --- Shared Props ---
interface ViewProps {
  trip: TripData;
  fontScale: FontScale;
  isDarkMode?: boolean;
  onShowLightbox?: (url: string) => void;
}

// --- Helper for font classes ---
const getFontClasses = (scale: FontScale) => {
  return {
    title: scale === 'extra' ? 'text-3xl' : scale === 'large' ? 'text-2xl' : 'text-xl',
    heading: scale === 'extra' ? 'text-2xl' : scale === 'large' ? 'text-xl' : 'text-lg',
    body: scale === 'extra' ? 'text-lg' : scale === 'large' ? 'text-base' : 'text-sm',
    small: scale === 'extra' ? 'text-base' : scale === 'large' ? 'text-sm' : 'text-xs',
  };
};

// --- Currency Converter Component ---
interface CurrencyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurrencyConverterModal: React.FC<CurrencyConverterModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [baseTwd, setBaseTwd] = useState<string>(''); // Store value in TWD

  if (!isOpen) return null;

  // Approximate Rates (1 Unit = X TWD)
  const RATES = {
    TWD: 1,
    USD: 32.5,
    SGD: 24.2,
    MYR: 7.5,
    THB: 0.96,
    HKD: 4.2
  };

  const handleInputChange = (val: string, currency: keyof typeof RATES) => {
    // Allow empty
    if (val === '') {
      setBaseTwd('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const inTwd = num * RATES[currency];
      setBaseTwd(inTwd.toString());
    }
  };

  const getValue = (currency: keyof typeof RATES) => {
    if (baseTwd === '') return '';
    const val = parseFloat(baseTwd) / RATES[currency];
    // Show 2 decimals, remove trailing zeros if possible
    return parseFloat(val.toFixed(2)).toString();
  };

  const renderInput = (currency: keyof typeof RATES, label: string, icon: string, note?: string) => (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
        <span className="text-xl">{icon}</span>
        <span className="font-bold text-stone-500 text-sm">{currency}</span>
      </div>
      <input
        type="number"
        inputMode="decimal"
        value={getValue(currency)}
        onChange={(e) => handleInputChange(e.target.value, currency)}
        placeholder="0"
        className="w-full pl-24 pr-10 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-right font-mono text-lg font-bold text-stone-800 dark:text-stone-100"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-stone-400 font-medium">
        {label}
      </div>
      {note && (
        <div className="absolute -bottom-5 right-1 text-[10px] text-rose-500 font-bold">
          {note}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="bg-brand-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <h3 className="font-bold text-lg font-rounded">匯率試算</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 bg-stone-100 dark:bg-stone-950/50">
          {['新幣', '馬幣/泰銖', '郵輪APP'].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(idx as 0|1|2); setBaseTwd(''); }}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === idx 
                  ? 'bg-white dark:bg-stone-800 text-brand-600 dark:text-brand-400 shadow-sm' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white dark:bg-stone-900 min-h-[300px]">
          
          {/* Common TWD Input */}
          {renderInput('TWD', '台幣', '🇹🇼')}

          {activeTab === 0 && (
            <>
               {renderInput('USD', '美金', '🇺🇸')}
               {renderInput('SGD', '新幣', '🇸🇬')}
               <div className="text-center text-xs text-stone-400 mt-4">
                 * 匯率僅供參考 (USD≈32.5 / SGD≈24.2)
               </div>
            </>
          )}

          {activeTab === 1 && (
            <>
               {renderInput('USD', '美金', '🇺🇸')}
               {renderInput('MYR', '馬幣', '🇲🇾')}
               {renderInput('THB', '泰銖', '🇹🇭')}
               <div className="text-center text-xs text-stone-400 mt-4">
                 * 匯率僅供參考 (MYR≈7.5 / THB≈0.96)
               </div>
            </>
          )}

          {activeTab === 2 && (
            <>
               <div className="mb-6">
                 {renderInput('HKD', '港幣', '🇭🇰', 'APP內顯示價格')}
               </div>
               <div className="text-center text-xs text-stone-400 mt-4">
                 * 郵輪APP內消費以美金計價，部分標示可能為港幣 (HKD≈4.2)
               </div>
            </>
          )}

          <button 
            onClick={() => setBaseTwd('')}
            className="w-full py-3 mt-2 flex items-center justify-center text-stone-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-colors font-bold text-sm"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            清除重算
          </button>

        </div>
      </div>
    </div>
  );
};


// --- Sub-Views ---

interface QASectionProps { 
  fontScale: FontScale;
  onShowLightbox: (url: string) => void;
}

const QASection: React.FC<QASectionProps> = ({ fontScale, onShowLightbox }) => {
  const f = getFontClasses(fontScale);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const sections = [
    {
      title: "通用",
      items: [
        {
          q: "新加坡/馬來西亞/泰國的簽證、入境卡辦理?",
          a: `新加坡/馬來西亞/泰國皆免簽

入境部分，政弘會統一幫大家辦理以下文件：
新加坡入境卡(SGAC)
馬來西亞數位入境卡(MDAC)
泰國電子入境卡(TDAC)

大家只要提供好e-mail即可，其他什麼都不用弄喔~`
        },
        {
          q: "要怎麼換匯?要帶多少錢?",
          a: (
            <div className="space-y-3 pt-1">
              <div>
                <strong>🇸🇬 新加坡：</strong>除了熟食中心以外，大部分都可以刷信用卡(包含搭乘地鐵、公車)。建議可每人到機場後小換<span className="text-rose-500 font-bold mx-1">15-30美金</span>等值的新幣現金吃路邊攤。
              </div>
              <div>
                <strong>🇲🇾 檳城：</strong>建議每人可攜帶約<span className="text-rose-500 font-bold mx-1">15-20美金</span>到檳城下船後換匯(馬幣)，以供吃小吃時使用。
              </div>
              <div>
                <strong>🇹🇭 普吉島：</strong>已買套裝行程基本上不需要換泰銖，如果有吃小攤的需求，政弘那邊有小量泰銖可以記帳後使用，回台灣再算。
              </div>
            </div>
          )
        },
        {
          q: "網路怎麼用?",
          a: (
            <div className="space-y-3 pt-1">
              <div>
                <strong>最方便的eSIM：</strong>免換卡、可直接向中華電信購買東南亞的漫遊，或是購買其他品牌的東南亞通用eSIM。
              </div>
              <div>
                <strong>實體SIM卡：</strong>可先在台灣購買也可以到達後購買，要小心保管替換的SIM卡。可買東南亞通用款。
              </div>
              <div>
                <strong>船上網路：</strong>公海收不到漫遊網路，APP可購買船上WIFI，能用文字訊息聯繫同行友人。每人每日1.99美元。
              </div>
            </div>
          )
        },
        {
          q: "插座要用哪一種轉接頭?",
          a: (
            <div className="space-y-3 pt-1">
              <div>
                <strong>新加坡：</strong>3孔英規230V，同香港。
                <img 
                  src="https://event.ezfly.com/singapore/images/Socket.JPG" 
                  alt="Socket"
                  className="w-[120px] h-auto mt-2 rounded-md shadow-sm"
                />
              </div>
              <div>
                <strong>郵輪上：</strong>船上提供美規(兩孔扁插，同台灣)110V，與歐規(兩圓孔)220V插座。建議可攜帶萬國轉接頭。
              </div>
            </div>
          )
        }
      ]
    },
    {
      title: "新加坡相關",
      items: [
        {
          q: "新加坡搭地鐵、公車用什麼交通卡?",
          a: `1. 可感應的信用卡即可
2. Apple Pay、Samsung Pay、Google Pay`
        },
        {
          q: "新加坡公車怎麼搭?",
          a: `前門上車，後門下車
上下車皆要感應(信用卡或Apple Pay、Samsung Pay、Google Pay)，下車按鈴`
        },
        {
          q: "地鐵路線圖",
          a: (
            <div className="space-y-2">
              <p>點擊圖片可放大查看：</p>
              <div 
                className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onShowLightbox("https://duk.tw/WWZlL2.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InRocmVhZHMuRkVFRC5pbWFnZV91cmxnZW4uMjAzNngxNDQwLnNkci5mMjkzNTAuZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QFGBfGkPaLFQCCnI_LAy_rXlU-Lm-h7J1ia7NISych6dgU4wmaXXpWxm5iwxqsWLLE&_nc_ohc=0NK4znn7hHcQ7kNvwFzbOyq&_nc_gid=1-41GwKI1y2loR75hi0Vww&edm=AKr904kBAAAA&ccb=7-5&ig_cache_key=MzU0MTYyOTA1NDYyNjg2OTg2MQ%3D%3D.3-ccb7-5&oh=00_AfnwNbVfZf2VatGlJ3O7J3Q48E_GSY5JFOa2FYquhaEX6A&oe=6935681E&_nc_sid=23467f");
                }}
              >
                <img 
                  src="https://duk.tw/WWZlL2.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InRocmVhZHMuRkVFRC5pbWFnZV91cmxnZW4uMjAzNngxNDQwLnNkci5mMjkzNTAuZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QFGBfGkPaLFQCCnI_LAy_rXlU-Lm-h7J1ia7NISych6dgU4wmaXXpWxm5iwxqsWLLE&_nc_ohc=0NK4znn7hHcQ7kNvwFzbOyq&_nc_gid=1-41GwKI1y2loR75hi0Vww&edm=AKr904kBAAAA&ccb=7-5&ig_cache_key=MzU0MTYyOTA1NDYyNjg2OTg2MQ%3D%3D.3-ccb7-5&oh=00_AfnwNbVfZf2VatGlJ3O7J3Q48E_GSY5JFOa2FYquhaEX6A&oe=6935681E&_nc_sid=23467f"
                  alt="Singapore MRT Map"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white h-8 w-8 drop-shadow-md" />
                </div>
              </div>
            </div>
          )
        },
        {
          q: "新加坡可使用電子支付嗎?",
          a: `Apple Pay、Samsung Pay、Google Pay皆可，結帳時說paywave`
        }
      ]
    },
    {
      title: "船上相關",
      items: [
        {
          q: "船上飲用水",
          a: (
            <div className="space-y-3 pt-1">
              <div>
                <strong>水：</strong>每房提供2瓶水(不會再補)，本次有再統一買1箱水，船上第2、3天各房再各送去2瓶。<br />
                船上自助餐廳可裝水(通常距離遠&需排隊)，但限用旁邊或船上提供的杯子裝，再倒進自己瓶子，切勿直接拿自己寶特瓶裝水。<br />
                若喝水量大，可登船前購買大瓶裝水放行李箱內帶上船。
              </div>
              <div>
                <strong>茶點、汽水、其他非酒精類飲品：</strong>本團有買2人份的茶飲喝到飽套餐14人共用，有飲料需求請隨時聯繫「茶點小精靈」政弘&千千。<br />
                (吃到飽方案每次點餐需間隔10分鐘)
              </div>
            </div>
          )
        },
        {
          q: "船上服裝規定",
          a: (
            <div className="space-y-3 pt-1">
              <div>
               <strong>日間：</strong>休閒便服即可(短褲/T恤)。
              </div>
              <div>
                <strong>晚餐進入主餐廳或付費餐廳：</strong>建議穿著休閒長褲/有領上衣，避免短褲、無袖背心、拖鞋。
              </div>
              <div>
                <strong>船長之夜：</strong>建議穿著正式服裝，男生襯衫+長褲，女生洋裝或禮服。
              </div>
              <div>
                <strong>健身房/泳池：</strong>適合運動的衣服/泳裝。
              </div>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border-2 border-stone-100 dark:border-stone-800 shadow-sm mt-6">
      <div className="flex items-center mb-5">
        <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-3 text-brand-600 dark:text-brand-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white font-rounded`}>Q&A 問答</h3>
      </div>

      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest ml-2 mb-3">
              {section.title}
            </div>
            
            <div className="space-y-3">
              {section.items.map((item, iIdx) => {
                const id = `${sIdx}-${iIdx}`;
                const isOpen = openId === id;
                return (
                  <div 
                    key={iIdx}
                    className={`border rounded-2xl transition-colors duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10' 
                        : 'border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50'
                    }`}
                  >
                    <button
                      onClick={() => toggle(id)}
                      className="w-full flex items-start justify-between p-4 text-left"
                    >
                      <span className={`${f.body} font-bold text-stone-800 dark:text-stone-200 pr-4`}>
                        {`Q${iIdx + 1}. ${item.q}`}
                      </span>
                      <div className={`mt-0.5 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-brand-500' : 'text-stone-400'}`}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className={`px-4 pb-4 pt-0 ${f.small} text-stone-600 dark:text-stone-400 font-medium whitespace-pre-line leading-relaxed animate-in slide-in-from-top-1`}>
                        <div className="h-px w-full bg-stone-200 dark:bg-stone-700 mb-3 opacity-50"></div>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OverviewView: React.FC<ViewProps> = ({ trip, fontScale, isDarkMode, onShowLightbox }) => {
  const f = getFontClasses(fontScale);
  const [heroIndex, setHeroIndex] = useState(0);
  
  // Image Lists
  const lightImages = [
    "https://images.unsplash.com/photo-1583873698943-8456d7882940?q=80&w=2274&auto=format&fit=crop", // Cruise Blue Sky
    "https://images.unsplash.com/photo-1681171248831-b54636671c39?q=80&w=1335&auto=format&fit=crop"  // Cruise Side
  ];

  const darkImages = [
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2071&auto=format&fit=crop", // Singapore Night
    "https://images.unsplash.com/photo-1692386585871-f53c4a1c0d41?q=80&w=1335&auto=format&fit=crop"  // Cruise Lights
  ];

  const currentImages = isDarkMode ? darkImages : lightImages;

  // Weather Data Mock
  const weatherForecast = [
    { date: '1/10', loc: '新加坡', temp: '26-31°', icon: 'rain', desc: '午後雷陣雨' },
    { date: '1/11', loc: '新加坡', temp: '27-32°', icon: 'cloudy', desc: '多雲時晴' },
    { date: '1/12', loc: '新加坡', temp: '27-32°', icon: 'sun', desc: '晴朗炎熱' },
    { date: '1/13', loc: '檳城', temp: '26-33°', icon: 'sun', desc: '豔陽高照' },
    { date: '1/14', loc: '普吉島', temp: '27-31°', icon: 'partly', desc: '晴時多雲' },
    { date: '1/15', loc: '安達曼海', temp: '25-30°', icon: 'partly', desc: '海風舒適' },
    { date: '1/16', loc: '新加坡', temp: '26-30°', icon: 'rain', desc: '短暫陣雨' },
  ];

  const getWeatherIcon = (type: string) => {
    switch(type) {
      case 'rain': return <CloudRain className="h-6 w-6 text-brand-500 dark:text-brand-400" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-stone-400" />;
      case 'sun': return <Sun className="h-6 w-6 text-amber-500" />;
      case 'partly': return <CloudSun className="h-6 w-6 text-brand-400" />;
      default: return <Sun className="h-6 w-6 text-amber-500" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImages.length]);

  // Helper to process overview text
  const renderOverviewContent = (text: string) => {
    // 1. Split lines
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    return (
      <div className="space-y-6">
        {lines.map((line, idx) => {
          // Parse format: "DAY X：Title [Tag] | Detail1; Detail2"
          const match = line.match(/^(DAY\s*\d+)[：:]\s*([^|]*)(?:\|\s*(.*))?$/i);
          
          if (!match) return null;

          const dayLabel = match[1].replace('DAY', 'DAY ');
          const dayLabel = dayLabelRaw.includes('8') ? `${dayLabelRaw}~` : dayLabelRaw;
          
          const titleRaw = match[2].trim();
          const detailsRaw = match[3] ? match[3].trim() : '';

          // Extract Tag from Title: "Title [Tag]"
          const tagMatch = titleRaw.match(/\[(.*?)\]/);
          const tag = tagMatch ? tagMatch[1] : null;
          const titleText = tagMatch ? titleRaw.replace(/\[.*?\]/, '').trim() : titleRaw;

          // Keyword highlighter for Title
          const highlightTitle = (text: string) => {
             const keywords = [
               { words: ['登船', '海洋贊禮號', '海上巡航日', '下船'], color: 'text-brand-600 dark:text-brand-400' }, // Blue
               { words: ['抵達', '樟宜機場周邊', '新加坡', '檳城', '普吉島'], color: 'text-amber-600 dark:text-amber-400' }, // Yellow
               { words: ['停靠'], color: 'text-stone-500' }
             ];
             
             return text.split(/(\s+)/).map((part, i) => {
                for (const k of keywords) {
                  if (k.words.some(w => part.includes(w))) {
                    return <span key={i} className={`${k.color} font-bold`}>{part}</span>;
                  }
                }
                return <span key={i}>{part}</span>;
             });
          };

          // Parse Details: Split by ';'
          const detailLines = detailsRaw ? detailsRaw.split(/[;；]/).map(s => s.trim()).filter(s => s) : [];

          // Helper to parse Markdown links in details [text](url)
          const parseLinks = (text: string) => {
            const parts = text.split(/(\[.*?\]\(.*?\))/g);
            return parts.map((part, i) => {
              const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
              if (linkMatch) {
                return (
                  <a 
                    key={i} 
                    href={linkMatch[2]} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-brand-500 hover:text-brand-600 font-bold decoration-brand-300 underline underline-offset-2 transition-colors"
                  >
                    {linkMatch[1]}
                    <ExternalLink className="h-3 w-3 ml-0.5" />
                  </a>
                );
              }
              return part;
            });
          };

          return (
            <div key={idx} className="flex items-start group relative">
               {/* Connecting Line (Visual) */}
               {idx !== lines.length - 1 && (
                  <div className="absolute left-[2.2rem] top-8 bottom-[-1.5rem] w-0.5 bg-stone-100 dark:bg-stone-800 -z-10"></div>
               )}

               {/* Day Badge */}
               <div className="flex-shrink-0 mr-4">
                 <div className={`
                   flex items-center justify-center w-16 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase shadow-sm border
                   ${(idx === 0 || idx === 6) // Force Day 1 (0) and Day 7 (6) to be Red
                     ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-900/30' 
                     : 'bg-white text-brand-600 border-stone-200 dark:bg-brand-900/10 dark:text-brand-300 dark:border-brand-900/30'}
                 `}>
                   {dayLabel}
                 </div>
               </div>
               
               {/* Content */}
               <div className="flex-1 min-w-0 pt-0.5">
                 {/* Title Row */}
                 <div className={`${f.body} font-bold text-stone-800 dark:text-stone-100 mb-1.5 flex flex-wrap items-center gap-2`}>
                   <span>{highlightTitle(titleText)}</span>
                   {tag && (
                     <span className="inline-flex items-center px-1 py-[1px] rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                       {tag}
                     </span>
                   )}
                 </div>

                 {/* Details Rows */}
                 {detailLines.length > 0 && (
                   <div className="space-y-1.5">
                     {detailLines.map((dLine, dIdx) => (
                       <div key={dIdx} className={`${f.small} text-stone-500 dark:text-stone-400 font-medium leading-relaxed`}>
                         {parseLinks(dLine)}
                       </div>
                     ))}
                   </div>
                 )}
               </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="pb-32 animate-in fade-in duration-500">
      {/* Hero Image Carousel */}
      <div className="relative h-72 w-full overflow-hidden rounded-b-[2.5rem] shadow-xl shadow-stone-900/10 dark:shadow-black/50 group">
        {currentImages.map((src, index) => (
          <img 
            key={src}
            src={src}
            alt={`Hero ${index}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in ${
              index === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
           <div className="inline-flex items-center px-3 py-1 bg-brand-500 text-white rounded-full text-xs font-bold mb-3 shadow-lg shadow-brand-500/20">
             <Ship className="h-3 w-3 mr-1" />
             {trip.days.length} Days Voyage
           </div>
           <h1 className={`${f.title} font-bold text-white leading-tight drop-shadow-lg font-rounded whitespace-pre-line`}>{trip.title}</h1>
           <div className={`text-stone-200 mt-2 ${f.small} flex items-center`}>
              <Calendar className="h-4 w-4 mr-2 text-brand-300" />
              {trip.startDate} - {trip.endDate}
           </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* Overview Card */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border-2 border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/10 rounded-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
          
          <div className="flex items-center mb-5 relative z-10">
            <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full mr-3 text-stone-600 dark:text-stone-300">
               <MapIcon className="h-5 w-5" />
            </div>
            <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white font-rounded`}>旅程總覽</h3>
          </div>

          <div className="relative z-10 pl-1">
             {renderOverviewContent(trip.overview)}
          </div>
        </div>

        {/* Weather Forecast Card */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border-2 border-stone-100 dark:border-stone-800 shadow-sm">
           <div className="flex items-center mb-4">
             <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-3 text-brand-600 dark:text-brand-400">
               <Thermometer className="h-5 w-5" />
             </div>
             <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white font-rounded`}>海上氣象站(一周前才有參考價值)</h3>
           </div>
           
           <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-2">
             {weatherForecast.map((day, idx) => (
               <div key={idx} className="flex-shrink-0 flex flex-col items-center justify-between p-3 min-w-[5.5rem] bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700">
                 <span className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-2">{day.date}</span>
                 <div className="mb-2 transform hover:scale-110 transition-transform">
                   {getWeatherIcon(day.icon)}
                 </div>
                 <span className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">{day.temp}</span>
                 <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium truncate max-w-[4rem] text-center">{day.loc}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Destination Card / App Download Card */}
        <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-6 rounded-3xl text-white shadow-lg shadow-brand-900/10 relative overflow-hidden">
           {/* Decor */}
           <div className="absolute -bottom-4 -right-4 text-brand-800 opacity-30">
              <Smartphone className="w-32 h-32" />
           </div>
           
           <div className="flex items-center justify-between mb-6 relative z-10">
             <h3 className={`${f.heading} font-bold opacity-90`}>皇家加勒比APP</h3>
             <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Smartphone className="h-5 w-5 text-white" />
             </div>
           </div>

           {/* App Links Section */}
           <div className="flex items-center gap-4 mb-4 relative z-10">
              {/* Icon */}
              <img 
                src="https://play-lh.googleusercontent.com/b-BHxMx4JLVD-e3uR7vs_GBjkHalGxuxv27AZquvowvJKVtiqs8W5621FodloTofrA=w480-h960-rw" 
                alt="Royal App" 
                className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20 flex-shrink-0"
              />
              
              {/* Buttons */}
              <div className="flex flex-row gap-[10px] items-center">
                 {/* iOS */}
                 <a 
                   href="https://apps.apple.com/us/app/royal-caribbean-international/id1260728016" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="block hover:opacity-80 transition-opacity"
                 >
                    <img 
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                      alt="Download on the App Store" 
                      className="h-9 w-auto"
                    />
                 </a>
                 {/* Android */}
                 <a 
                   href="https://play.google.com/store/apps/details?id=com.rccl.royalcaribbean&hl=en_US" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="block hover:opacity-80 transition-opacity"
                 >
                    <img 
                      src="https://www.royalcaribbean.com/content/dam/royal/special-mkgt/mobile-app/download-google-store2.png" 
                      alt="Get it on Google Play" 
                      className="h-9 w-auto"
                    />
                 </a>
              </div>
           </div>

           <div className={`mt-2 opacity-80 font-medium ${f.small} relative z-10`}>
              <p className="whitespace-pre-line">{`出發前先安裝APP&註冊
郵輪上吃喝玩樂訊息才不會漏接唷!
帳號密碼請找政弘或蕙慈協助`}</p>
              
              <p className="mt-3 flex items-center">
                 <a 
                   href="https://drive.google.com/file/d/1pNml4vt8SaPbCOGKElcVRc2yiVg0cT5J/view" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="underline underline-offset-2 hover:text-white transition-colors font-bold"
                 >
                   <span className="text-teal-200 font-bold mx-1">*海洋贊禮號簡介PDF</span>
                 </a>
              </p>
           </div>
        </div>

        {/* Q&A Section */}
        <QASection fontScale={fontScale} onShowLightbox={onShowLightbox!} />
      </div>
    </div>
  );
};

const MembersView: React.FC<ViewProps> = ({ trip, fontScale, onShowLightbox }) => {
  const f = getFontClasses(fontScale);
  const colors = [
    'bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
    'bg-brand-100 text-brand-600 dark:bg-brand-900/20 dark:text-brand-300',
    'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  ];

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <h2 className={`${f.title} font-bold text-stone-900 dark:text-white mb-6 font-rounded`}>成員名單</h2>
      
      {/* Ship Room Location Map Card */}
      <div className="bg-white dark:bg-stone-900 p-5 rounded-[2rem] border-2 border-stone-100 dark:border-stone-800 shadow-sm mb-6">
        <div className="flex items-center mb-4">
           <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-3 text-brand-600 dark:text-brand-400">
             <BedDouble className="h-5 w-5" />
           </div>
           <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white`}>船上房間位置圖</h3>
        </div>
        
        <div 
            className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700"
            onClick={(e) => {
              e.stopPropagation();
              if (onShowLightbox) onShowLightbox("https://duk.tw/rHRMtM.jpg");
            }}
          >
            <img 
              src="https://duk.tw/rHRMtM.jpg"
              alt="Room Locations"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="text-white h-8 w-8 drop-shadow-md" />
            </div>
          </div>
          <p className={`${f.small} text-stone-500 dark:text-stone-400 mt-2 text-center`}>點擊圖片放大查看</p>
      </div>

      <div className="grid gap-4">
        {trip.members?.map((member, idx) => {
          const colorClass = colors[idx % colors.length];
          return (
            <div key={idx} className="bg-white dark:bg-stone-900 p-5 rounded-[2rem] border-2 border-stone-100 dark:border-stone-800 shadow-sm flex items-center space-x-4 hover:border-brand-300 dark:hover:border-brand-800 transition-colors group">
              <div className={`h-14 w-14 rounded-full ${colorClass} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <User className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white`}>{member.name}</h3>
                  {member.roomNumber && (
                     <span className={`px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold ${f.small}`}>
                       {member.roomNumber}
                     </span>
                  )}
                </div>
                <div className={`${f.small} text-stone-500 dark:text-stone-500 font-medium mb-1 uppercase tracking-wide`}>{member.role}</div>
                {member.notes && (
                  <p className={`${f.body} text-stone-500 dark:text-stone-400`}>{member.notes}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const ExpensesView: React.FC<ViewProps> = ({ trip, fontScale }) => {
  const f = getFontClasses(fontScale);
  
  // Group expenses by category
  const groupedExpenses = trip.expenses?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ExpenseItem[]>);

  const categories = Object.keys(groupedExpenses || {});

  const getCategoryIcon = (cat: string) => {
    if (cat.includes('船上')) return <Ship className="h-4 w-4" />;
    if (cat.includes('環球影城')) return <MapPin className="h-4 w-4" />;
    return <Wallet className="h-4 w-4" />;
  };

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <h2 className={`${f.title} font-bold text-stone-900 dark:text-white mb-6 font-rounded`}>目前未結算消費總覽</h2>
      
      <div className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-stone-900 p-6 rounded-r-[1.5rem] rounded-l-none border-2 border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden">
             {/* Left color bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400 dark:bg-brand-600"></div>
            
            <div className="flex items-center mb-4 pl-3">
               <div className="p-1.5 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-2 text-brand-600 dark:text-brand-400">
                  {getCategoryIcon(category)}
               </div>
               <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white`}>{category}</h3>
            </div>

            <div className="space-y-4 pl-3">
              {groupedExpenses[category].map((item, itemIdx) => (
                <div key={itemIdx} className="border-b border-stone-100 dark:border-stone-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className={`${f.body} text-stone-700 dark:text-stone-300 font-medium`}>
                      {item.description}
                    </div>
                    <div className={`${f.body} font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap`}>
                      {item.estimatedCost}
                    </div>
                  </div>
                  {item.note && (
                    <div className={`${f.small} text-stone-400 mt-1`}>
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreparationView: React.FC<ViewProps> = ({ trip, fontScale }) => {
  const f = getFontClasses(fontScale);
  
  // Initialize from local storage
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(PREP_CHECKED_KEY);
        if (saved) {
          return new Set(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.warn("Failed to load checked items", e);
    }
    return new Set();
  });

  // Save to local storage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(PREP_CHECKED_KEY, JSON.stringify(Array.from(checkedItems)));
    } catch (e) {
      console.error("Failed to save checked items", e);
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedItems(next);
  };

  // Group by category, then by subCategory
  const groupedItems = trip.preparation?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {};
    }
    const sub = item.subCategory || 'General';
    if (!acc[item.category][sub]) {
      acc[item.category][sub] = [];
    }
    acc[item.category][sub].push(item);
    return acc;
  }, {} as Record<string, Record<string, PreparationItem[]>>);

  const categories = Object.keys(groupedItems || {});

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case '隨身手提': return <Backpack className="h-5 w-5" />;
      case '行李': return <Luggage className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <h2 className={`${f.title} font-bold text-stone-900 dark:text-white mb-6 font-rounded`}>行前準備</h2>
      
      <div className="space-y-8">
        {categories.map((category, cIdx) => (
          <div key={cIdx} className="bg-white dark:bg-stone-900 p-6 rounded-[2rem] border-2 border-stone-100 dark:border-stone-800 shadow-sm">
             {/* Category Header */}
             <div className="flex items-center mb-6">
               <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-3 text-brand-600 dark:text-brand-400">
                 {getCategoryIcon(category)}
               </div>
               <h3 className={`${f.heading} font-bold text-stone-800 dark:text-white`}>{category}</h3>
             </div>

             <div className="space-y-6">
               {Object.keys(groupedItems[category]).map((subCat, scIdx) => (
                 <div key={scIdx}>
                   {/* Subcategory Header (Skip if 'General' and only one group) */}
                   {(subCat !== 'General' || Object.keys(groupedItems[category]).length > 1) && (
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 pl-1 border-b border-stone-100 dark:border-stone-800 pb-1 inline-block">
                        {subCat === 'General' ? '清單' : subCat}
                      </h4>
                   )}
                   
                   <div className="grid grid-cols-2 gap-3">
                     {groupedItems[category][subCat].map((item, iIdx) => {
                       const uniqueId = `${category}-${subCat}-${item.item}`;
                       const isChecked = checkedItems.has(uniqueId);
                       
                       return (
                         <button
                           key={iIdx}
                           onClick={() => toggleItem(uniqueId)}
                           className={`text-left p-3 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 ${
                             isChecked 
                               ? 'bg-stone-50 dark:bg-stone-900/50 border-stone-100 dark:border-stone-800 opacity-60' 
                               : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-brand-200 dark:hover:border-brand-800'
                           }`}
                         >
                           <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? 'text-brand-500' : 'text-stone-300 dark:text-stone-700'}`}>
                             {isChecked ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                           </div>
                           <div className="min-w-0">
                             <div className={`${f.body} font-medium truncate ${isChecked ? 'text-stone-400 line-through' : 'text-stone-700 dark:text-stone-300'} ${item.isHighlight ? 'text-rose-600 dark:text-rose-400 font-bold' : ''}`}>
                               {item.item}
                             </div>
                             {item.note && (
                               <div className={`text-[10px] mt-0.5 ${item.isHighlight || item.isNoteHighlight ? 'text-rose-500 font-bold' : 'text-stone-400'}`}>
                                 {item.note}
                               </div>
                             )}
                           </div>
                         </button>
                       );
                     })}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

type ViewType = 'overview' | 'itinerary' | 'expenses' | 'preparation' | 'members';

const App: React.FC = () => {
  // State
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  
  // Theme Preference: Initialize from local storage, default to false (Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(THEME_KEY);
        // Only return true if strictly 'true', otherwise false for Light Mode default
        return saved ? JSON.parse(saved) : false;
      }
    } catch (e) {
      console.warn("Failed to parse theme preference", e);
    }
    return false;
  });
  
  // Font Size Preference: Initialize from local storage, default to 'large'
  const [fontScale, setFontScale] = useState<FontScale>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(FONT_PREF_KEY);
        // Validate if saved value is a valid FontScale type
        if (saved === 'normal' || saved === 'large' || saved === 'extra') {
          return saved;
        }
      }
    } catch (e) {
      console.warn("Failed to parse font preference", e);
    }
    return 'large';
  });

  // Theme Logic
  useEffect(() => {
    // Force update DOM on state change
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save to storage
    localStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Font Scale Logic - Save to storage
  useEffect(() => {
    localStorage.setItem(FONT_PREF_KEY, fontScale);
  }, [fontScale]);

  // Data Init
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTripData(JSON.parse(saved));
      } catch (e) {
        setTripData(SAMPLE_TRIP);
      }
    } else {
      setTripData(SAMPLE_TRIP);
    }
  }, []);

  const navItems = [
    { id: 'itinerary', label: '行程', icon: MapIcon }, // Use the aliased icon
    { id: 'members', label: '成員', icon: Users },
    { id: 'overview', label: '總覽', icon: Home },
    { id: 'expenses', label: '花費', icon: Wallet },
    { id: 'preparation', label: '準備', icon: CheckSquare },
  ];

  const renderContent = () => {
    if (!tripData) return <div className="p-10 text-center text-brand-600 animate-bounce">Loading Trip...</div>;
    switch (currentView) {
      case 'overview': return <OverviewView trip={tripData} fontScale={fontScale} isDarkMode={isDarkMode} onShowLightbox={setLightboxImg} />;
      case 'itinerary': return <ItineraryView trip={tripData} fontScale={fontScale} />;
      case 'members': return <MembersView trip={tripData} fontScale={fontScale} onShowLightbox={setLightboxImg} />;
      case 'expenses': return <ExpensesView trip={tripData} fontScale={fontScale} />;
      case 'preparation': return <PreparationView trip={tripData} fontScale={fontScale} />;
      default: return <OverviewView trip={tripData} fontScale={fontScale} isDarkMode={isDarkMode} onShowLightbox={setLightboxImg} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 overflow-hidden transition-colors duration-500 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* 1. Top Bar (Fixed) */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-stone-950/80 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 z-50 flex items-center justify-between px-4 shadow-sm transition-colors duration-500">
        <div 
          onClick={() => setCurrentView('overview')}
          className="font-bold text-lg sm:text-xl flex items-center overflow-hidden cursor-pointer active:opacity-70 transition-opacity"
        >
          {/* Header Icon - White container, centered, scaled 0.75x, moved down */}
          <div className="mr-3 flex-shrink-0 h-9 w-9 rounded-full bg-white border border-stone-200 dark:border-stone-800 flex items-center justify-center overflow-hidden">
             <img 
              src="https://i.pinimg.com/736x/64/41/66/6441665e695c9221bef2fe10142182c1.jpg" 
              alt="logo" 
              className="w-[75%] h-[75%] object-contain translate-y-[1px]"
             />
          </div>
          <span className="bg-gradient-to-r from-brand-600 to-teal-600 dark:from-brand-400 dark:to-teal-400 bg-clip-text text-transparent font-rounded truncate max-w-[200px] sm:max-w-none">
            Ovation 甲板集合！
          </span>
        </div>
        
        {/* Right Controls - Fixed Width/No Shrink */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          
          {/* Luxurious Toggle Switch (Reduced Width) */}
          <div 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`cursor-pointer w-[44px] h-8 rounded-full p-1 flex items-center transition-colors duration-500 shadow-inner relative ${
              isDarkMode ? 'bg-stone-800 border border-stone-700' : 'bg-brand-100 border border-brand-200'
            }`}
            role="button"
            aria-label="Toggle Theme"
          >
             {/* Icons in Background */}
            <Sun className={`absolute left-1.5 h-3.5 w-3.5 text-brand-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
            <Moon className={`absolute right-1.5 h-3.5 w-3.5 text-stone-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />

            {/* Slider Knob */}
            <div 
              className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center z-10 ${
                isDarkMode 
                  ? 'translate-x-[12px] bg-stone-900 text-brand-300' 
                  : 'translate-x-0 bg-white text-brand-500'
              }`}
            >
              {isDarkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
            </div>
          </div>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {/* Changed from Settings to Type icon */}
            <Type className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div id="main-scroll-container" className="flex-1 overflow-y-auto no-scrollbar pt-16">
        {renderContent()}
      </div>

      {/* Floating Currency Converter Button (Only on Overview and Itinerary) */}
      {(currentView === 'overview' || currentView === 'itinerary') && (
        <button
          onClick={() => setIsConverterOpen(true)}
          className="fixed right-[10px] bottom-[100px] z-40 w-14 h-14 rounded-full bg-brand-500/20 hover:bg-brand-500/30 backdrop-blur-sm text-brand-600 dark:text-brand-300 shadow-lg flex items-center justify-center transition-transform active:scale-95 animate-in zoom-in duration-300 border border-brand-500/20"
        >
          <CircleDollarSign className="h-8 w-8" />
        </button>
      )}

      {/* Currency Converter Modal */}
      <CurrencyConverterModal 
        isOpen={isConverterOpen} 
        onClose={() => setIsConverterOpen(false)} 
      />

      {/* 3. Bottom Navigation (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 pb-safe pt-2 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 z-50 px-4 pb-2 transition-colors duration-500">
        <div className="flex justify-between items-end h-16 w-full max-w-md mx-auto relative">
          {navItems.map((item) => {
             const isActive = currentView === item.id;
             const isCenter = item.id === 'overview';
             
             if (isCenter) {
               return (
                 <div key={item.id} className="relative -top-4 group">
                   <button
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`h-16 w-16 rounded-full flex items-center justify-center shadow-xl border-[5px] border-stone-50 dark:border-stone-950 transition-all duration-300 active:scale-95 ${
                      isActive 
                        ? 'bg-brand-500 text-white shadow-brand-500/40 scale-110' 
                        : 'bg-stone-400 dark:bg-stone-600 text-[#F2F2F2] dark:text-[#A0A0A0] hover:bg-brand-500 hover:text-white'
                    }`}
                   >
                     <Home className="h-7 w-7" />
                   </button>
                   {/* Moved down by changing mt-1 to mt-2 */}
                   <div className={`text-[10px] font-bold text-center mt-2 transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-stone-400'}`}>總覽</div>
                 </div>
               );
             }

             return (
               <button
                 key={item.id}
                 onClick={() => setCurrentView(item.id as ViewType)}
                 className={`flex flex-col items-center justify-center w-full pb-3 pt-2 rounded-xl transition-all duration-300 ${
                   isActive 
                     ? 'text-brand-600 dark:text-brand-400 -translate-y-1' 
                     : 'text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300'
                 }`}
               >
                 <item.icon className={`h-6 w-6 mb-1 ${isActive ? 'fill-current stroke-[2.5px]' : 'stroke-2'}`} />
                 <span className="text-[10px] font-bold font-rounded">{item.label}</span>
               </button>
             );
          })}
        </div>
      </div>

      {/* 4. Settings Modal/Sheet */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="w-[96%] sm:w-full max-w-md mx-auto mb-4 sm:mb-0 bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white font-rounded flex items-center">
                <Type className="mr-2 h-5 w-5 text-brand-500" />
                顯示設定
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 hover:bg-rose-100 hover:text-rose-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Font Size Control */}
              <div>
                <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400 mb-3">
                  <span className="text-sm font-bold uppercase tracking-wide">字體大小</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['normal', 'large', 'extra'] as FontScale[]).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setFontScale(scale)}
                      className={`py-4 rounded-2xl border-2 font-bold transition-all ${
                        fontScale === scale 
                          ? 'bg-brand-100 dark:bg-brand-900/30 border-brand-500 text-brand-700 dark:text-brand-400 scale-105 shadow-sm' 
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-100 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span className={scale === 'normal' ? 'text-sm' : scale === 'large' ? 'text-lg' : 'text-xl'}>
                        Aa
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-white rounded-2xl font-bold flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  確定
                </button>
              </div>
            </div>
            
           
          </div>
        </div>
      )}

      {/* Lightbox Modal - Rendered at root level to prevent stacking context clipping */}
      {lightboxImg && (
        <div 
          className="fixed top-0 left-0 z-[100] h-[100dvh] w-screen bg-black/90 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            className="absolute top-4 right-4 z-[110] p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImg(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Stop propagation on click to prevent closing when interacting with the zoom component */}
          <div onClick={(e) => e.stopPropagation()} className="w-full h-full flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit={true}
            >
              <TransformComponent 
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img 
                  src={lightboxImg} 
                  alt="Fullscreen Preview" 
                  className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
