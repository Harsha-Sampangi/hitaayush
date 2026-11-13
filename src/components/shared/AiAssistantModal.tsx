import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, AlertCircle, HelpCircle, Pill, Calendar, TestTube, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';

interface QuickPrompt {
  id: string;
  label: string;
  icon: React.ElementType;
  reply: {
    en: string;
    te: string;
    hi: string;
  };
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'rx',
    label: 'Explain my prescription',
    icon: FileText,
    reply: {
      en: 'Your doctor prescribed Vitamin D3 (take weekly after lunch) and Iron + Folic Acid (take daily after dinner). The goal is to improve your energy and iron stores over the next 8 weeks.',
      te: 'మీ వైద్యులు విటమిన్ D3 (వారానికి ఒకసారి భోజనం తర్వాత) మరియు ఐరన్ + ఫోలిక్ యాసిడ్ (రోజూ రాత్రి భోజనం తర్వాత) సూచించారు. ఇది మీ శక్తిని మరియు ఐరన్ నిల్వలను మెరుగుపరచడానికి ఉద్దేశించబడింది.',
      hi: 'आपके डॉक्टर ने विटामिन D3 (सप्ताह में एक बार दोपहर के भोजन के बाद) और आयरन + फोलिक एसिड (रोजाना रात के खाने के बाद) लिखा है। इसका उद्देश्य आपकी ऊर्जा और आयरन के स्तर में सुधार करना है।'
    }
  },
  {
    id: 'meds',
    label: 'What medicines are scheduled today?',
    icon: Pill,
    reply: {
      en: 'Today you have 3 scheduled doses: Vitamin D3 (9:00 AM, Pending), Iron + Folic Acid (1:00 PM, Pending), and Calcium (9:00 PM, Pending). You can mark them as taken right on your dashboard.',
      te: 'ఈ రోజు మీకు 3 మందులు ఉన్నాయి: విటమిన్ D3 (ఉదయం 9:00), ఐరన్ + ఫోలిక్ యాసిడ్ (మధ్యాహ్నం 1:00), మరియు కాల్షియం (రాత్రి 9:00). మీరు వీటిని డ్యాష్‌బోర్డ్‌లో గుర్తించవచ్చు.',
      hi: 'आज आपकी 3 दवाएं निर्धारित हैं: विटामिन D3 (सुबह 9:00 बजे), आयरन + फोलिक एसिड (दोपहर 1:00 बजे), और कैल्शियम (रात 9:00 बजे)। आप इन्हें अपने डैशबोर्ड पर पूर्ण चिह्नित कर सकते हैं।'
    }
  },
  {
    id: 'appts',
    label: 'When is my next appointment?',
    icon: Calendar,
    reply: {
      en: 'Your follow-up appointment with Dr. Rahul Sharma (General Medicine) is on 20 November 2026 at 10:30 AM at Hitaayus Demo Hospital. Please complete your scheduled blood tests before this visit.',
      te: 'డాక్టర్ రాహుల్ శర్మగారితో మీ తదుపరి అపాయింట్‌మెంట్ 20 నవంబర్ 2026 ఉదయం 10:30 గంటలకు ఉంది. దయచేసి ఈ సంప్రదింపుకు ముందు మీ రక్త పరీక్షలు పూర్తి చేయండి.',
      hi: 'डॉ. राहुल शर्मा के साथ आपकी अगली फॉलो-अप अपॉइंटमेंट 20 नवंबर 2026 को सुबह 10:30 बजे है। कृपया इस मुलाकात से पहले अपने निर्धारित रक्त परीक्षण पूरे कर लें।'
    }
  },
  {
    id: 'tests',
    label: 'Which tests are still pending?',
    icon: TestTube,
    reply: {
      en: 'You have a Complete Blood Count (CBC) and Vitamin D Level test scheduled for 15 November 2026. Fasting of 8-10 hours is advised for optimal results.',
      te: 'మీకు 15 నవంబర్ 2026న కంప్లీట్ బ్లడ్ కౌంట్ (CBC) మరియు విటమిన్ D స్థాయి పరీక్ష షెడ్యూల్ చేయబడింది. ఉత్తమ ఫలితాల కోసం 8-10 గంటల ఉపవాసం సిఫార్సు చేయబడింది.',
      hi: 'आपके पास 15 नवंबर 2026 के लिए कम्पलीट ब्लड काउंट (CBC) और विटामिन D टेस्ट निर्धारित हैं। सटीक परिणामों के लिए 8-10 घंटे का उपवास करने की सलाह दी जाती है।'
    }
  },
  {
    id: 'term',
    label: 'Explain medical term: "OD pc"',
    icon: HelpCircle,
    reply: {
      en: '"OD pc" is a medical shorthand. "OD" (Omni Die) means once daily, and "pc" (Post Cibum) means after meals. So "OD pc" means take once daily after eating.',
      te: '"OD pc" అనేది వైద్య సంక్షిప్త పదం. "OD" అంటే రోజుకు ఒకసారి, మరియు "pc" అంటే భోజనం తర్వాత. కాబట్టి "OD pc" అంటే ఆహారం తిన్న తర్వాత రోజుకు ఒకసారి వేసుకోవాలి.',
      hi: '"OD pc" एक चिकित्सा संक्षिप्त नाम है। "OD" का अर्थ है दिन में एक बार, और "pc" का अर्थ है भोजन के बाद। इसका मतलब है कि भोजन करने के बाद दिन में एक बार दवा लें।'
    }
  }
];

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: currentLanguage === 'te' 
        ? 'నమస్కారం! నేను హితాయుష్ కేర్ అసిస్టెంట్‌ని. మీ ప్రిస్క్రిప్షన్, మందులు మరియు తదుపరి సంరక్షణ గురించి నన్ను ఏదైనా అడగవచ్చు.'
        : currentLanguage === 'hi'
        ? 'नमस्ते! मैं हितायुष केयर असिस्टेंट हूँ। अपनी दवाओं, नुस्खे या फॉलो-अप के बारे में कोई भी प्रश्न पूछें।'
        : 'Hello! I am your Hitaayus Care Assistant. Ask me anything about your prescriptions, medicine schedule, test instructions, or post-consultation care plan.',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (prompt: QuickPrompt) => {
    const userMsg: Message = {
      sender: 'user',
      text: prompt.label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = prompt.reply[currentLanguage] || prompt.reply.en;
      const botMsg: Message = {
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();
      if (lower.includes('medicine') || lower.includes('dose') || lower.includes('tablet')) {
        reply = currentLanguage === 'te'
          ? 'మీ డాక్టర్ సూచించిన షెడ్యూల్ ప్రకారం మీ మందులు తీసుకోవడం చాలా ముఖ్యం. దయచేసి ఖాళీ కడుపుతో ఐరన్ టాబ్లెట్ తీసుకోకండి.'
          : currentLanguage === 'hi'
          ? 'कृपया अपने डॉक्टर द्वारा निर्देशित समय पर ही दवाएं लें। आयरन की गोली खाली पेट न लें।'
          : 'According to your post-consultation plan, please take medicines at regular intervals. Avoid taking Iron supplements on an empty stomach.';
      } else if (lower.includes('side effect') || lower.includes('pain') || lower.includes('emergency')) {
        reply = currentLanguage === 'te'
          ? 'ముఖ్య గమనిక: ఏదైనా అసౌకర్యం లేదా తీవ్రమైన దుష్ప్రభావాలు ఉంటే వెంటనే మీ డాక్టర్ లేదా ఆసుపత్రిని సంప్రదించండి.'
          : currentLanguage === 'hi'
          ? 'महत्वपूर्ण सूचना: यदि आपको कोई गंभीर लक्षण या साइड-इफेक्ट महसूस हो, तो तुरंत अपने चिकित्सक से संपर्क करें।'
          : 'Important safety notice: If you experience persistent symptoms, severe pain, or unexpected reactions, please contact Dr. Rahul Sharma or your nearest healthcare facility immediately.';
      } else {
        reply = currentLanguage === 'te'
          ? 'నేను మీ వైద్య సూచనలను సులభంగా అర్థం చేసుకోవడంలో సహాయపడతాను. వ్యక్తిగత వైద్య మార్పుల కోసం మీ వైద్యుడిని సంప్రదించండి.'
          : currentLanguage === 'hi'
          ? 'मैं आपके पर्चे के निर्देशों को समझाने में सहायता कर सकता हूँ। व्यक्तिगत चिकित्सीय निर्णय के लिए कृपया डॉक्टर से परामर्श लें।'
          : 'I can help clarify instructions already recorded in your Hitaayus care plan. For clinical modifications or personalized diagnosis, please reach out directly to your doctor.';
      }

      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-healthcare to-teal text-white shadow-xl shadow-healthcare/25 hover:shadow-2xl transition-all border border-white/30 backdrop-blur-md"
        aria-label="Open Hitaayus Care Assistant"
      >
        <div className="relative">
          <Bot size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <span className="font-medium text-sm hidden sm:inline">Hitaayus Care Assistant</span>
      </motion.button>

      {/* Assistant Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 flex flex-col h-[85vh] sm:h-[620px] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-navy-500 to-healthcare text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Sparkles size={20} className="text-teal-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      Hitaayus Care Assistant
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30">
                        AI Guide
                      </span>
                    </h3>
                    <p className="text-xs text-blue-100">Post-Consultation Health Navigator</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Notice Banner */}
              <div className="bg-amber-50/80 border-b border-amber-100/80 px-4 py-2 flex items-start gap-2 text-xs text-amber-800">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-amber-600" />
                <span>Informational aid only. Always consult Dr. Rahul Sharma for clinical decisions.</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/60">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.sender === 'user'
                          ? 'bg-healthcare text-white rounded-br-none shadow-sm'
                          : 'bg-white text-navy-900 border border-gray-100 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                      <span className={`block text-[10px] mt-1 ${m.sender === 'user' ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-healthcare animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-healthcare animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-healthcare animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="p-3 bg-white border-t border-gray-100 overflow-x-auto flex gap-2 no-scrollbar">
                {QUICK_PROMPTS.map(p => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSendPrompt(p)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-gray-100 hover:bg-healthcare/10 hover:text-healthcare text-navy transition-colors font-medium border border-gray-200/60"
                    >
                      <Icon size={12} />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Footer */}
              <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Ask about your care instructions..."
                  className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare/30 focus:border-healthcare"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-healthcare hover:bg-healthcare-600 disabled:opacity-40 text-white transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
