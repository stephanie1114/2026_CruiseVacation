
import { TripData, ActivityType } from './types';

export const SAMPLE_TRIP: TripData = {
  destination: "Singapore & Phuket",
  startDate: "2025-01-10",
  endDate: "2025-01-16",
  title: "Ovation of the Seas 🚢 ：\n🇸🇬新加坡 / 🇲🇾檳城 / 🇹🇭普吉島",
  overview: `DAY1：抵達 🇸🇬 新加坡 [可自由活動] | 入住飯店 [lyf funan](https://www.google.com/maps/search/?api=1&query=lyf+Funan+Singapore); 市區觀光：魚尾獅、麥士威熟食中心、金沙酒店、濱海灣花園
DAY2：聖淘沙環球影城一日遊🎢 [可自由活動] | 環球影城輕鬆玩，晚上克拉碼頭小吃
DAY3：登船 🚢 海洋贊禮號 [可自由活動] | 享受船上設施; 22:30歌舞秀
DAY4：停靠🇲🇾檳城 | 15:00下船; 包14人座車前往升旗山; 一起回到港邊吃小吃、自由活動; 22:00前上船
DAY5：停靠🇹🇭普吉島 | 08:00下船 轉乘接駁船; 岸上套裝觀光：攀牙灣、考甘平島、潘怡島高腳屋水上村落、普吉島餐廳用餐; 船上牛排晚餐
DAY6：海上巡航日 [可自由活動] | 享受船上設施
DAY7：下船 ✈️ 樟宜機場周邊 | 星耀樟宜室內瀑布雨漩渦、伴手禮採買
DAY8~：部分成員繼續行程[自由活動]; 景點參考:小印度區、阿拉伯區(哈芝巷)、牛車水、新加坡動物園+夜間野生動物園、老巴刹沙嗲一條街`,
  members: [
    { name: "政弘 & Dennis", role: "茶飲卡小精靈", roomNumber: "11258", notes: "出入境管理中心" },
    { name: "千千 & 明熹", role: "茶飲卡小精靈", roomNumber: "11656", notes: "旅程小幫手" },
    { name: "Alice & Jimmy", role: "", roomNumber: "11658", notes: "千千朋友" },
    { name: "明皓 & 阿泰", role: "", roomNumber: "11250", notes: "明熹弟弟" },
    { name: "正義 & 春美", role: "", roomNumber: "11650", notes: "明熹明皓的爸媽" },
    { name: "素蓮 & 明紅", role: "", roomNumber: "11676", notes: "干千的媽媽" },
    { name: "石川 & 敏惠", role: "", roomNumber: "11674", notes: "干千的舅舅&舅媽" }
  ],
  expenses: [
    // 船上相關
    { category: "船上相關", description: "普吉島岸上觀光 James bond島快艇", estimatedCost: "每人NT$ 4,883" },
    { category: "船上相關", description: "檳城14人座包車", estimatedCost: "每人NT$ 300" },
    { category: "船上相關", description: "額外瓶裝水1箱14人分", estimatedCost: "每人NT$ 99" },
    { category: "船上相關", description: "茶點飲料暢飲14人分(4日)", estimatedCost: "每人NT$ 579" },
    { category: "船上相關", description: "付費餐廳牛排", estimatedCost: "每人NT$ 1,326", note: "11250、11650共4人千&熹付" },
    // 環球影城相關
    { category: "環球影城相關", description: "門票", estimatedCost: "每人NT$ 1,849" },
  ],
  preparation: [
    // 隨身手提
    { category: "隨身手提", item: "護照" },
    { category: "隨身手提", item: "手機" },
    { category: "隨身手提", item: "信用卡" },
    { category: "隨身手提", item: "外幣現金" },
    { category: "隨身手提", item: "太陽眼鏡" },
    { category: "隨身手提", item: "耳機" },
    { category: "隨身手提", item: "折疊環保袋" },
    { category: "隨身手提", item: "鑰匙" },
    { category: "隨身手提", item: "眼藥水" },
    { category: "隨身手提", item: "面紙" },
    { category: "隨身手提", item: "口罩" },
    { category: "隨身手提", item: "行動電源", note: "*只能隨身", isNoteHighlight: true },
    
    // 行李 - 衣物
    { category: "行李", subCategory: "衣物", item: "外衣上下著" },
    { category: "行李", subCategory: "衣物", item: "內衣" },
    { category: "行李", subCategory: "衣物", item: "內褲" },
    { category: "行李", subCategory: "衣物", item: "襪子" },
    { category: "行李", subCategory: "衣物", item: "睡衣" },
    { category: "行李", subCategory: "衣物", item: "薄外套" },
    { category: "行李", subCategory: "衣物", item: "泳裝" },
    { category: "行李", subCategory: "衣物", item: "運動服" },

    // 行李 - 盥洗
    { category: "行李", subCategory: "盥洗", item: "牙刷、牙膏" },
    { category: "行李", subCategory: "盥洗", item: "洗面乳" },
    { category: "行李", subCategory: "盥洗", item: "保養品" },
    { category: "行李", subCategory: "盥洗", item: "髮油" },
    { category: "行李", subCategory: "盥洗", item: "髮膜" },
    { category: "行李", subCategory: "盥洗", item: "鯊魚夾" },

    // 行李 - 日用品
    { category: "行李", subCategory: "日用品", item: "個人藥品" },
    { category: "行李", subCategory: "日用品", item: "化妝包" },
    { category: "行李", subCategory: "日用品", item: "卸妝棉" },
    { category: "行李", subCategory: "日用品", item: "隱眼" },
    { category: "行李", subCategory: "日用品", item: "眼鏡" },
    { category: "行李", subCategory: "日用品", item: "備用口罩" },
    { category: "行李", subCategory: "日用品", item: "拖鞋" },
    { category: "行李", subCategory: "日用品", item: "雨傘", note: "*常下午後陣雨" },

    // 行李 - 3C
    { category: "行李", subCategory: "3C", item: "萬國轉接頭" },
    { category: "行李", subCategory: "3C", item: "充電線" },

    // 其他
    { category: "其他", item: "票券" },
    { category: "其他", item: "eSIM" }
  ],
  days: [
    {
      dayNumber: 1,
      date: "Jan 10",
      title: "抵達新加坡🇸🇬",
      activities: [
        {
          time: "08:20 AM",
          title: "CI753 TPE - SIN",
          description: "建議 06:00-06:30AM 抵達機場\n13:05 抵達新加坡樟宜機場",
          type: ActivityType.Travel,
          location: "桃園機場-第一航廈"
        },
        {
          time: "03:00 PM",
          title: "飯店Check-in 放行李 ",
          description: "🚇 SMRT機場➔丹那美拉(轉綠線)➔政府大廈\n前往飯店辦理入住手續\n提早到可在大廳休息或隔壁安德烈教堂拍照\n稍作休息後15:30大廳集合",
          type: ActivityType.Rest,
          location: "lyf Funan Singapore"
        },
        {
          time: "04:00 PM",
          title: "魚尾獅公園",
          description: "🚇 SMRT政府大廈➔萊佛士坊\n新加坡著名地標\n預計停留半小時\n(可與海南雞飯順序對調)",
          type: ActivityType.Sightseeing,
          location: "Merlion Park"
        },
        {
          time: "05:00 PM",
          title: "麥士威熟食中心",
          description: "新加坡特有的美食街文化\n米其林名店：天天海南雞(可刷卡)\n若售完或不想排隊也可考慮附近文東記雞飯\n也可以吃自己想吃的",
          type: ActivityType.Food,
          location: "Maxwell Food Centre"
        },
        {
          time: "06:00 PM",
          title: "金沙酒店",
          description: "🚇 SMRT直落亞逸➔海灣舫\n新加坡地標級建築與購物中心\n可參觀：水舞秀(六：20/21/22點)、室內運河、賭場(可點免費飲料)\n約停留1H\n若想看花芎/雲霧林(需另外購票)也可提早前往下個點",
          type: ActivityType.Sightseeing,
          location: "Marina Bay Sands"
        },
        {
          time: "07:00 PM",
          title: "濱海灣花園",
          description: "金沙有連通橋可步行前往\n想看花芎/雲霧林可自由活動(需另外購票，每溫室參觀時間約1.5-2H)\n19:45 & 20:45戶外天空樹燈光秀必看\n最晚21:00結束今日行程回酒店休息",
          type: ActivityType.Sightseeing,
          location: "Gardens by the Bay"
        },
        {
          time: "09:30 PM",
          title: "返回飯店休息",
          description: "🚇 SMRT濱海灣➔政府大廈\n可在便利商店買明日簡易早餐\n準備明天的環球影城之旅",
          type: ActivityType.Rest,
          location: "lyf Funan Singapore"
        }
      ]
    },
    {
      dayNumber: 2,
      date: "Jan 11",
      title: "聖淘沙環球影城一日遊🎢",
      activities: [
        {
          time: "09:30 AM",
          title: "聖淘沙環球影城",
          description: "🚇 SMRT政府大廈➔南華園(轉紫線)➔港灣\n🚝 轉 單軌電車Vivo City➔resorts World\n入園可載APP掌握排隊時間&園內地圖\n午餐園內自理\n預計18:30離園",
          type: ActivityType.Travel,
          location: "Universal Studios Singapore"
        },
        {
          time: "07:00 PM",
          title: "克拉碼頭",
          description: "🚝 單軌電車resorts World➔Vivo City\n🚇 轉 SMRT港灣➔克拉碼頭\n自由找喜歡的東西吃&逛\n珍寶海鮮在旁邊\n預計停留到21:00",
          type: ActivityType.Food,
          location: "Clarke Quay"
        },
        {
          time: "09:30 PM",
          title: "返回飯店休息",
          description: "克拉碼頭步行回飯店\n或繞到附近讚美廣場(晚上美麗燈光教堂、夜間酒吧)走走後自行回飯店",
          type: ActivityType.Rest,
          location: "lyf Funan Singapore"
        }
      ]
    },
    {
      dayNumber: 3,
      date: "Jan 12",
      title: "悠閒早餐 登船🚢海洋贊禮號",
      activities: [
         {
          time: "09:00 AM",
          title: "亞坤咖椰吐司",
          description: "飯店旁邊就有一家\n知名新加坡式早餐\n道地吃法：溫泉蛋灑上胡椒+醬油後攪拌，再用吐司沾蛋液\n吃完再上去整理行李",
          type: ActivityType.Food,
          location:"Ya Kun Kaya Toast (Funan)"
        },
        {
          time: "11:00 AM",
          title: "飯店退房",
          description: "11:00大廳集合退房，準備前往郵輪囉!",
          type: ActivityType.Rest,
          location: "lyf Funan Singapore"
        },
        {
          time: "11:30 AM - 12:00 PM",
          title: "郵輪登船",
          description: "🚇 SMRT政府大廈➔濱海南碼頭\n登船後就可以自由活動\n享受船上設施&餐食\n想喝非酒精的飲料\n請找阿干或千千點喔(茶點小精靈)\n重頭戲：22:30 幻彩卡巴萊歌舞秀(已先幫忙預約)",
          type: ActivityType.Cruise
        },
      ]
    },
    {
      dayNumber: 4,
      date: "Jan 13",
      title: "🇲🇾 檳城 Penang",
      activities: [
        {
          time: "08:00 AM - 02:00 PM",
          title: "享受船上設施",
          description: "*想喝非酒精的飲料請找阿干或千千點",
          type: ActivityType.Cruise
        },
        {
          time: "03:00 PM",
          title: "停靠🇲🇾檳城Penang",
          description: "下船後一起搭14人座前往升旗山\n隨後會回到碼頭邊自由活動吃小吃&逛街\n街上可換匯\n22:00前一定要上船",
          type: ActivityType.Sightseeing,
          location: "Penang"
        },
        {
          time: "10:00 PM",
          title: "享受船上設施",
          description: "*想喝非酒精的飲料請找阿干或千千點",
          type: ActivityType.Cruise
        }
      ]
    },
    {
      dayNumber: 5,
      date: "Jan 14",
      title: "🇹🇭 普吉島 Phuket",
      activities: [
        {
          time: "07:00 AM",
          title: "享受船上早餐",
          description: "08:00後就靠岸了，建議下船前先享受早餐~",
          type: ActivityType.Cruise
        },
        {
          time: "08:00 PM",
          title: "停靠🇹🇭普吉島Phuket",
          description: "停靠處搭乘接駁船\n岸上觀光套裝行程：\n攀牙灣、考甘平島、潘怡島高腳屋水上村落、普吉島餐廳用餐\n約16:00返回接駁船處\n上船前可自由活動\n最晚18:00前回郵輪上\n晚上安排了牛排餐廳!",
          type: ActivityType.Sightseeing,
          location: "Phuket"
        },
        {
          time: "07:00 PM",
          title: "Chops Grille 牛排館",
          description: "船上的付費餐廳\n只要來好好享受就好囉!",
          type: ActivityType.Food
        },
        {
          time: "09:00 PM",
          title: "享受船上設施",
          description: "*想喝非酒精的飲料請找阿干或千千點",
          type: ActivityType.Cruise
        }
      ]
    },
    {
      dayNumber: 6,
      date: "Jan 15",
      title: "🚢 海上巡航日",
      activities: [
        {
          time: "ALL DAY",
          title: "享受船上設施",
          description: "*想喝非酒精的飲料請找阿干或千千點\n晚餐是船長之夜，強烈推薦主餐廳用餐\n注意服裝禮儀",
          type: ActivityType.Cruise
        }
      ]
    },
    {
      dayNumber: 7,
      date: "Jan 16",
      title: "下船 ✈️ 樟宜機場 星耀樟宜",
      activities: [
        {
          time: "08:00 AM",
          title: "離船",
          description: "行李記得提前整理",
          type: ActivityType.Cruise
        },
        {
          time: "09:00 AM",
          title: "星耀樟宜",
          description: "🚇 SMRT濱海南碼頭➔政府大廈(轉綠)➔丹那美拉➔機場\n參觀知名打卡景點世界最大室內瀑布-雨漩渦\n機場有名店松發肉骨茶\n伴手禮採買\n推薦：bengawan solo、TWG、虎標萬金油、肉骨茶包、鹹蛋魚皮/薯片、bacha咖啡、小CK包\n有時間可以去玩溜滑梯",
          type: ActivityType.Sightseeing,
          location: "Jewel Changi Airport"
        },
        {
          time: "02:05 PM",
          title: "CI754 SIN - TPE",
          description: "回台灣結束旅程\n抵達台北時間19:05",
          type: ActivityType.Travel,
          location: "Changi Airport"
        }
      ]
    }
  ]
};
