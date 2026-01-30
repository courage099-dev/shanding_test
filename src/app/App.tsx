import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User } from 'lucide-react';
import { Button } from "@/app/components/Button";
import { LoginModal } from "@/app/components/LoginModal";
import { PaymentModal } from "@/app/components/PaymentModal";
import logoSvgPaths from "@/imports/svg-qca5njrue3";
import serviceSvgPaths from "@/imports/svg-kirnc3jm4v";
import heroBgImage from '@/assets/7438eff79edcdeb83c8571a1ed03895d0c559c57.png';
import emotionImg1 from '@/assets/2ce2802e1691030845324866d95c7590f61a3c69.png';
import emotionImg2 from '@/assets/c5c20c2b46d28005231453dce01c5bf815a1a8d6.png';
import emotionImg3 from '@/assets/2c826f37476e4dc135468fb204217f91929aa9e5.png';
import footerBgImage from '@/assets/8094b004979b848cc4640eb7ee59d97ac24c2aa6.png';
import heroBgImageNew from '@/assets/038a61365e8a22102d855e9021b1bb786e1e1a99.png';

// Color constants
const COLORS = {
  primary: '#BC5834',
  text: '#222222',
  bg: '#F0EEE5',
  bgSecondary: '#E5E1D0',
};

// SVG Logo Component using imported paths
const Logo = ({ className = "", color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 600 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={logoSvgPaths.p12177500} fill={color || "#C1603D"} />
    <g>
      <path d={logoSvgPaths.p3464f700} fill={color || "#232323"} />
      <path d={logoSvgPaths.p51bd500} fill={color || "#232323"} />
    </g>
    <g>
      <path d={logoSvgPaths.p3ad4b680} fill={color || "#232323"} />
      <path d={logoSvgPaths.p2c1ed900} fill={color || "#232323"} />
      <path d={logoSvgPaths.p1a787c00} fill={color || "#232323"} />
      <path d={logoSvgPaths.p3b5c02c0} fill={color || "#232323"} />
      <path d={logoSvgPaths.p3f133f00} fill={color || "#232323"} />
      <path d={logoSvgPaths.p39fa8980} fill={color || "#232323"} />
    </g>
  </svg>
);

// Navigation Component
const Navbar = ({ 
  onLoginClick, 
  onPaymentClick, 
  onLogoutClick,
  username 
}: { 
  onLoginClick: () => void, 
  onPaymentClick: () => void,
  onLogoutClick: () => void,
  username?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: '首页', id: 'home' },
    { name: '服务特色', id: 'service' },
    { name: '客户寄语', id: 'testimonials' },
    { name: '关于我们', id: 'about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#F0EEE5]/90 backdrop-blur-md border-b border-[#E5E1D0] px-4 md:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollToSection('home')}>
        <Logo className="h-10 w-auto" />
        <div className="hidden md:block w-px h-8 bg-gray-300" />
        <span className="hidden md:block text-xs text-gray-400 tracking-wider">每个人生都是一部历史</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollToSection(link.id)}
            className="text-[#222222] hover:text-[#BC5834] transition-colors font-medium text-sm"
          >
            {link.name}
          </button>
        ))}

        <div className="w-px h-4 bg-gray-300 mx-2" />

        {username ? (
           <div className="flex items-center gap-4">
             <span className="text-[#222222] font-medium flex items-center gap-2">
               <User className="w-5 h-5 text-[#BC5834]" />
               你好！{username}
             </span>
             <button 
               onClick={onLogoutClick}
               className="text-xs text-gray-500 hover:text-[#BC5834] transition-colors px-2 py-1"
             >
               退出
             </button>
           </div>
        ) : (
          <button onClick={onLoginClick} className="text-[#222222] hover:text-[#BC5834] transition-colors font-medium">
            登录 / 注册
          </button>
        )}
        <Button onClick={onPaymentClick} variant="primary">
          立即预约
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#222222]">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#F0EEE5] border-b border-[#E5E1D0] p-4 flex flex-col space-y-4 md:hidden shadow-lg"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-[#222222] font-medium py-2 text-left"
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-gray-200 w-full my-2" />
            {username ? (
              <div className="flex justify-between items-center py-2">
                <div className="text-[#222222] font-medium flex items-center gap-2">
                   <User className="w-5 h-5 text-[#BC5834]" />
                   你好！{username}
                </div>
                <button 
                  onClick={() => { onLogoutClick(); setIsOpen(false); }}
                  className="text-xs text-gray-500 hover:text-[#BC5834] px-2 py-1"
                >
                  退出
                </button>
              </div>
            ) : (
              <button onClick={() => { onLoginClick(); setIsOpen(false); }} className="text-[#222222] font-medium py-2 text-left">
                登录 / 注册
              </button>
            )}
            <Button onClick={() => { onPaymentClick(); setIsOpen(false); }} variant="primary" className="w-full">
              立即付费
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const Hero = ({ onBookClick }: { onBookClick: () => void }) => (
  <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={heroBgImageNew} 
        alt="Writing memories" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/60 to-transparent" />
    </div>

    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-2/3 text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-lg leading-tight">
          把岁月写成书<br/>让记忆永留存
        </h1>
        <h2 className="text-2xl md:text-3xl font-light mb-8 text-[#E5E1D0] opacity-90">
          山顶传记——您身边的传记专家
        </h2>
        <p className="text-lg mb-12 text-[#E5E1D0] font-light opacity-90 leading-relaxed">
          欢迎预约，开启您的传记之旅！
        </p>
        <div className="flex justify-start">
          <Button 
            variant="primary" 
            size="lg" 
            className="shadow-2xl hover:shadow-[0_0_40px_rgba(188,88,52,0.6)] transform hover:-translate-y-1 transition-all duration-300"
            onClick={onBookClick}
          >
            立即预约
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// Memory / Problem Section
const EmotionSection = () => (
  <section id="emotion" className="py-20 bg-[#F0EEE5] px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">还记得吗？那些不经意的瞬间</h2>
        <p className="text-xl text-[#BC5834] font-medium">别让遗忘变成遗憾</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#BC5834]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
            image: emotionImg1,
            title: "父母总爱念叨以前的事",
            desc: "那些关于奋斗的汗水、关于爱情的青涩、关于家族迁徙的脚步，都是我们生命的来处。它不仅仅是一本书，更是家族精神的薪火相传。"
          },
          {
            icon: <User className="w-10 h-10 text-[#BC5834]" />,
            image: emotionImg2,
            title: "当孩子指着老照片问“这是谁”时",
            desc: "不要让答案只剩下一个名字。这本传记，能告诉孩子爷爷奶奶曾怎样热烈地活过。我们要留下的，不只是照片，更是家风与精神。"
          },
          {
            icon: <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#BC5834]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            image: emotionImg3,
            title: "我们总以为来日方长",
            desc: "研究显示，89%的人无法完整回忆5年前的细节。人生99%的珍贵时刻，终将在记忆中彻底模糊。趁现在还记得，趁现在还来得及，把记忆写进书里。"
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-[#222222]">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// New Service Card Component matching Figma design
const ServiceCard = ({ 
  title, 
  sub1, 
  sub2, 
  icon, 
  decorationType 
}: { 
  title: string, 
  sub1: string, 
  sub2: string, 
  icon: React.ReactNode, 
  decorationType: 'left' | 'center' | 'right' 
}) => {
  return (
    <div className="bg-white rounded-[16px] w-full max-w-[360px] h-[395px] relative flex flex-col items-center mx-auto shadow-sm">
      {/* Icon Circle */}
      <div className="absolute top-[60px] w-[116px] h-[116px] rounded-full bg-[#C1603D] flex items-center justify-center text-white">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="absolute top-[231px] text-[30px] font-semibold text-[#222222] font-['PingFang_SC']">
        {title}
      </h3>
      
      {/* Decoration */}
      <div className="absolute top-[247px] w-[265px] h-[80px] pointer-events-none">
         <svg className="block w-full h-full" fill="none" viewBox="0 0 265 80" preserveAspectRatio="none">
             {decorationType === 'left' && (
                 <g>
                     <path d={serviceSvgPaths.p2bd1bc00} fill="#DBC1A3" />
                     <path d={serviceSvgPaths.p701600} fill="#DBC1A3" />
                 </g>
             )}
             {decorationType === 'center' && (
                 <g>
                     <path d={serviceSvgPaths.p10b68340} fill="#DBC1A3" />
                     <path d={serviceSvgPaths.p4d1c00} fill="#DBC1A3" />
                 </g>
             )}
             {decorationType === 'right' && (
                 <g>
                     <path d={serviceSvgPaths.p34340070} fill="#DBC1A3" />
                     <path d={serviceSvgPaths.p17e64980} fill="#DBC1A3" />
                 </g>
             )}
         </svg>
      </div>

      {/* Subtitles */}
      <div className="absolute top-[280px] flex flex-col items-center gap-1 text-[18px] text-[#666666]">
        <p>{sub1}</p>
        <p>{sub2}</p>
      </div>
    </div>
  );
};

// Service Section
const ServiceSection = ({ onBookClick }: { onBookClick: () => void }) => (
  <section id="service" className="py-20 bg-[#E5E1D0] px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[60px] font-semibold text-[#222222] mb-4 font-['PingFang_SC'] leading-none">山顶传记</h2>
        <p className="text-[24px] md:text-[36px] text-[#C1603D] font-normal font-['PingFang_SC'] leading-none">您身边的传记专家</p>
      </div>
      
      {/* Grid changed to flex-wrap for better responsiveness on varied screens, while maintaining grid structure on larger ones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <ServiceCard 
          title="1对1采访"
          sub1="贴心引导"
          sub2="全程陪伴"
          decorationType="left"
          icon={
            <div className="w-[50px] h-[60px] relative">
              <svg viewBox="0 0 49.775 58.2" className="w-full h-full" fill="none">
                 <rect x="13.95" y="2.6" width="21.875" height="35" rx="10.9375" stroke="white" strokeWidth="5.2" strokeLinejoin="round" />
                 <path d={serviceSvgPaths.p33906280} stroke="white" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M24.45 55.6L24.45 50.6" stroke="white" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          }
        />
        <ServiceCard 
          title="大师级撰写"
          sub1="专业作家文笔"
          sub2="还原真实人生"
          decorationType="center"
          icon={
            <div className="w-[116px] h-[116px] flex items-center justify-center">
               <svg viewBox="0 0 116 116" className="w-full h-full" fill="none">
                  <path d={serviceSvgPaths.p31057c00} fill="white" transform="translate(0 0) scale(1)" /> 
               </svg>
            </div>
          }
        />
        <ServiceCard 
          title="精美实体书"
          sub1="精装定制"
          sub2="永久典藏"
          decorationType="right"
          icon={
            <div className="w-[50px] h-[55px] relative">
              <svg viewBox="0 0 49.6445 55.2" className="w-full h-full" fill="none">
                 <path d={serviceSvgPaths.p118f2700} stroke="white" strokeWidth="5.2" />
                 <path d={serviceSvgPaths.pa7eaa0} stroke="white" strokeWidth="5.2" strokeLinecap="round" />
              </svg>
            </div>
          }
        />
      </div>

      <div className="flex justify-center mt-12">
        <Button 
          variant="primary"
          onClick={onBookClick}
          size="lg"
          className="shadow-xl"
        >
          立即预约
        </Button>
      </div>
    </div>
  </section>
);

// Testimonials Section
const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-[#F0EEE5] px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">平凡的一生，也值得被记录</h2>
        <p className="text-gray-600">他们都不是作家，却都写出了感人的传记</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            name: "刘老师",
            age: "68岁",
            role: "退休教师",
            quote: "以前总觉得，自己这平凡的一生有什么好记的？直到这本传记真的捧在手里，我才发现，原来那些细碎的日子，拼凑起来竟如此闪闪发光。这不是一本书，这是我对自己一辈子的交代。",
            img: "https://images.unsplash.com/photo-1765248148922-b452232e1107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzY5NDg5NjU5fDA&ixlib=rb-4.1.0&q=80&w=200"
          },
          {
            name: "陈先生",
            age: "41岁",
            role: "为父亲购买",
            quote: "父亲平时沉默寡言，我以为早就读懂了他。但这本传记让我第一次认识了那个年轻、热血、也曾迷茫过的他。感谢这份礼物，它让我重新认识了父亲，也让我们两代人的心贴得更近了。",
            img: "https://images.unsplash.com/photo-1758600432264-b8d2a0fd7d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwYXNpYW58ZW58MXx8fDE3Njk0OTUxNzJ8MA&ixlib=rb-4.1.0&q=80&w=200"
          },
          {
            name: "张伯伯",
            age: "70岁",
            role: "退休职工",
            quote: "很多事如果不被问起，我可能这辈子都不会再想起来。这种跟着话头慢慢聊的方式，帮我找回了好多差点忘掉的细节。这一路讲完，感觉就像把这大半辈子的陈年旧事都理顺了，心里头特别敞亮。",
            img: "https://images.unsplash.com/photo-1729559149688-bee985e447ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzY5NDg5NjU5fDA&ixlib=rb-4.1.0&q=80&w=200"
          },
          {
            name: "吴爷爷",
            age: "79岁",
            role: "退休高级技工",
            quote: "拿到样书的那一刻，分量沉甸甸的。无论是纸张的触感，还是文字的编排，都透着一股庄重。这不仅是一本传记，更是留给孙辈们最珍贵的传家宝，它值得被好好收藏。",
            img: "https://images.unsplash.com/photo-1574132190990-cfd62178bb1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhc2lhbiUyMG1hbiUyMGdsYXNzZXMlMjByZWFkaW5nfGVufDF8fHx8MTc2OTQ5NTE3Mnww&ixlib=rb-4.1.0&q=80&w=200"
          }
        ].map((t, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative">
            <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-[#222222]">{t.name} <span className="text-sm font-normal text-gray-500">/ {t.age}</span></h4>
                <p className="text-xs text-[#BC5834] font-medium">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// About Section - Redesigned Layout
const AboutSection = () => (
  <section id="about" className="py-32 bg-[#E5E1D0] px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
        {/* Title and Intro */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">关于山顶</h2>
            <div className="max-w-4xl mx-auto">
              <div className="text-gray-600 space-y-2">
                <p className="leading-snug">
                    人生如登山，半世风雨，终见顶峰。登高回望，方知生命的壮阔。
                </p>
                <p className="leading-snug">
                    我们取名“山顶”，是因为我们相信，每一位登顶的长者，都拥有一览众山小的智慧与胸怀。
                </p>
                <p className="leading-snug">
                    这里，不是终点，而是整理行囊、细数珍宝的最佳观景点。
                </p>
              </div>
            </div>
        </div>

        {/* Three Columns Layout - Modified to Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-[#222222] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#BC5834] rounded-full"></span>
                    我们是谁？
                </h3>
                <p className="text-gray-700 leading-relaxed text-base text-justify">
                    在信息碎片化的时代，我们是一群执着于“慢”的人。我们拒绝冰冷的数据堆砌，只相信人心的温度。我们聚在一起，只为了对抗时间的遗忘，为您哪怕只言片语的记忆，筑起一座坚固的堡垒。
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-[#222222] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#BC5834] rounded-full"></span>
                    我们的坚持
                </h3>
                <div className="space-y-6">
                    <div className="flex items-start text-base text-gray-700">
                        <span className="font-bold text-[#222222] text-xl mr-3 shrink-0">倾听</span>
                        <span>不止是记录，更是知心倾听。</span>
                    </div>
                    <div className="flex items-start text-base text-gray-700">
                        <span className="font-bold text-[#222222] text-xl mr-3 shrink-0">书写</span>
                        <span>以文学笔触，还原真实风骨。</span>
                    </div>
                    <div className="flex items-start text-base text-gray-700">
                        <span className="font-bold text-[#222222] text-xl mr-3 shrink-0">传承</span>
                        <span>不只是做书，更是修缮家谱。</span>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-[#222222] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#BC5834] rounded-full"></span>
                    为何而作？
                </h3>
                <p className="text-gray-700 leading-relaxed text-base text-justify">
                    平凡即伟大。历史书里记载了大人物的丰功伟绩，但我们认为，支撑起这个世界基石的，是无数普通人含辛茹苦的一生。在“山顶”，没有微不足道的人生。每个认真生活过的人，都值得被铭记。
                </p>
            </div>
        </div>
    </div>
  </section>
);

// Footer
const Footer = ({ onBookClick }: { onBookClick: () => void }) => (
  <footer className="relative bg-[#2c1810] text-[#E5E1D0]">
    {/* Large CTA Section with Background */}
    <div className="relative w-full overflow-hidden group">
      {/* Background Image Container with overlay */}
      <div className="absolute inset-0">
        <img 
          src={footerBgImage} 
          alt="Writing history" 
          className="w-full h-full object-cover object-right opacity-60 transition-transform duration-[20s] ease-linear"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-48 px-4 md:px-8 flex">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2" // Reduced width to reveal right side of image
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-lg leading-tight">
            一书一世界
          </h2>
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-[#E5E1D0] opacity-90">
            每个人生都是一部历史
          </h3>
          <p className="text-lg mb-12 text-[#E5E1D0] font-light opacity-90 leading-relaxed">
            我们交付给您的，不仅仅是一本厚重的书，<br/>
            而是一份能跨越时间、连接几代人情感的传家之宝。<br/>
            欢迎预约，开启您的传记之旅！
          </p>
          <div className="flex justify-start">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-2xl hover:shadow-[0_0_40px_rgba(188,88,52,0.6)] transform hover:-translate-y-1 transition-all duration-300"
              onClick={onBookClick}
            >
              立即预约
            </Button>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Copyright Footer */}
    <div className="bg-[#2c1810] border-t border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#E5E1D0]/60">
        {/* Left Side: Monochrome Light Logo */}
        <div className="mb-4 md:mb-0">
          <Logo color="#E5E1D0" className="h-8 w-auto opacity-70" />
        </div>
        
        {/* Right Side: Company Info */}
        <div className="flex flex-col md:items-end space-y-1 text-xs md:text-right">
          <p className="font-bold">北京四十三智果科技有限公司</p>
          <p>地址：北京市朝阳区望京东园四区8号楼9层919</p>
          <p>Copyright © 2026 北京四十三智果科技有限公司 版权所有 | 京ICP备2024060716号-9</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [pendingPayment, setPendingPayment] = useState(false);

  // Check for saved login on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('biography_username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setShowLogin(false);
    if (pendingPayment) {
        setShowPayment(true);
        setPendingPayment(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('biography_username');
    setUsername(undefined);
  };

  const handleBookClick = () => {
      if (username) {
          setShowPayment(true);
      } else {
          setPendingPayment(true);
          setShowLogin(true);
      }
  };

  return (
    <div className="font-sans antialiased text-[#222222] bg-[#F0EEE5] min-h-screen selection:bg-[#BC5834] selection:text-white">
      {/* Hidden button for triggering payment modal from other components if needed */}
      <button 
        id="payment-modal-trigger" 
        className="hidden" 
        onClick={handleBookClick} 
      />

      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        onPaymentClick={handleBookClick}
        onLogoutClick={handleLogout}
        username={username}
      />
      <main>
        <Hero onBookClick={handleBookClick} />
        <EmotionSection />
        <ServiceSection onBookClick={handleBookClick} />
        <Testimonials />
        <AboutSection />
      </main>
      <Footer onBookClick={handleBookClick} />

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </div>
  );
}
