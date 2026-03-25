/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Cpu, Database, Network, Zap, Activity, Shield, Layers, Globe, Code, Terminal, ArrowLeft, BookOpen, Clock, User, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState, useEffect } from 'react';

const ComingSoonDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative liquid-glass rounded-3xl p-8 md:p-12 border-white/5 max-w-md mx-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="heading-italic text-3xl md:text-4xl">Coming Soon</h2>
                <p className="body-light text-lg">
                  We're building something extraordinary. Stay with us as we launch the next generation of intelligent infrastructure.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={onClose}
                  className="w-full liquid-glass-strong rounded-full px-8 py-3 text-sm font-body hover:bg-white/10 transition-all"
                >
                  Got it
                </button>
                <a
                  href="mailto:info@04f.co.in"
                  onClick={onClose}
                  className="block w-full border border-white/10 rounded-full px-8 py-3 text-sm font-body hover:bg-white/5 transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProcessingWave = ({ color = "bg-primary" }: { color?: string }) => (
  <div className="flex items-center gap-1 h-8">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className={`w-1 rounded-full ${color}`}
        animate={{
          height: [8, 24, 8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const Navbar = ({ onExplorePlatform }: { onExplorePlatform: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 horizontal-padding py-3 md:py-4 transition-all duration-300 ${
      isScrolled ? 'liquid-glass' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter">
          <span className="text-primary">O4</span>
          <span className="text-secondary">F</span>
        </div>
        
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 gap-8 items-center">
          {['Home', 'Platform', 'Architecture', 'Research', 'Mission', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-body font-normal text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onExplorePlatform} className="liquid-glass-strong rounded-full px-6 py-2.5 flex items-center gap-2 text-sm font-body group hover:bg-white/10 transition-all">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={onExplorePlatform} className="liquid-glass-strong rounded-full px-4 py-2 text-sm font-body hover:bg-white/10 transition-all">
            Explore
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 horizontal-padding bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl mx-3"
          >
            <div className="flex flex-col gap-2 py-4">
              {['Home', 'Platform', 'Architecture', 'Research', 'Mission', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-body text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplorePlatform }: { onExplorePlatform: () => void }) => {
  return (
    <section id="home" className="relative h-[1000px] flex flex-col items-center justify-center text-center horizontal-padding overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl z-10"
      >
        <h1 className="heading-italic text-6xl md:text-8xl mb-8">
          Building the Infrastructure for Intelligent Systems
        </h1>
        <div className="flex justify-center mb-8 opacity-40">
          <ProcessingWave color="bg-primary" />
        </div>
        <p className="body-light text-lg md:text-xl max-w-2xl mx-auto mb-6">
          O4F designs next-generation platforms that combine AI, real-time data, and ultra-low latency infrastructure to power intelligent decision systems.
        </p>
        <p className="body-light text-base md:text-lg max-w-xl mx-auto mb-12">
          From market intelligence to autonomous trading, we build the operating layer for the AI economy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onExplorePlatform} className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-body hover:bg-white/10 transition-all">
            Explore Platform
          </button>
          <a href="#contact" className="border border-white/10 rounded-full px-8 py-4 text-sm font-body hover:bg-white/5 transition-all">
            Partner With Us
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const Vision = () => {
  return (
    <section id="mission" className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto">
      <div className="grid md:grid-row-2 gap-16">
        <div>
          <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Vision</span>
          <h2 className="heading-italic text-5xl md:text-7xl mb-12">The Next Era of Technology</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-2xl font-body font-light text-white/40">Software transformed industries.</p>
              <p className="text-2xl font-body font-light text-white/60">Data transformed businesses.</p>
              <p className="text-3xl font-body font-medium text-white">AI will transform decision-making.</p>
            </div>
            <p className="body-light text-lg">
              But intelligence at scale requires something deeper:
            </p>
            <ul className="space-y-4">
              {[
                'real-time data infrastructure',
                'AI-native platforms',
                'high-performance compute networks',
                'autonomous execution systems'
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-white/80 font-body">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-xl font-body font-medium text-primary">
              O4F is building the foundation for this new era.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
            <div className="relative liquid-glass rounded-3xl p-8 h-full flex flex-col justify-center border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-secondary" />
                </div>
                <div className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Layers className="w-8 h-8 text-white/40" />
                </div>
                <div className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Network className="w-8 h-8 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, content, icon: Icon, children }: { title: string, content: string, icon: any, children?: ReactNode }) => (
  <div className="liquid-glass rounded-3xl p-8 border-white/5 hover:border-white/10 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-2xl font-body font-medium mb-4">{title}</h3>
    <p className="body-light text-base leading-relaxed mb-6">{content}</p>
    {children}
  </div>
);

const WhatWeBuild = () => {
  return (
    <section id="platform" className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto">
      <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Capabilities</span>
      <h2 className="heading-italic text-5xl md:text-7xl mb-16">What We Build</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard 
          title="Real-Time Data Infrastructure" 
          content="Continuous real-time ingestion of market data, exchange feeds, signals, news, and events. All processed in milliseconds."
          icon={Database}
        />
        <FeatureCard 
          title="AI Native Decision Systems" 
          content="AI agents, quantitative models, signal generation, and automated decision engines."
          icon={Cpu}
        >
          <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <ProcessingWave color="bg-secondary" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Processing Intelligence</span>
          </div>
        </FeatureCard>
        <FeatureCard 
          title="Autonomous Trading Infrastructure" 
          content="Strategy development, backtesting, real-time execution engines, and risk management pipelines."
          icon={Zap}
        >
          <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-white/40 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-secondary">INPUT</span>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span>MARKET_FEED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">PROCESS</span>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span>SIGNAL_GEN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60">OUTPUT</span>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span>EXECUTION</span>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard 
          title="Ultra-Low Latency Compute" 
          content="Event-driven processing, high-frequency pipelines, distributed compute, optimized execution."
          icon={Activity}
        />
      </div>
    </section>
  );
};

const Architecture = () => {
  const layers = [
    { name: 'Data Layer', content: 'Streaming ingestion, real-time analytics, historical storage, event pipelines', color: 'text-secondary' },
    { name: 'Intelligence Layer', content: 'AI models, strategy builders, quantitative research tools, simulation', color: 'text-primary' },
    { name: 'Execution Layer', content: 'Execution engines, order routing, portfolio systems, transaction processing', color: 'text-white' },
    { name: 'Compute Fabric', content: 'High-performance compute network optimized for speed and scale', color: 'text-white/40' }
  ];

  return (
    <section id="architecture" className="py-16 md:py-32 horizontal-padding bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Architecture</span>
        <h2 className="heading-italic text-5xl md:text-7xl mb-4">Platform Architecture</h2>
        <p className="body-light text-xl mb-16">The O4F platform is built as a modular intelligent system.</p>
        
        <div className="space-y-4">
          {layers.map((layer, i) => (
            <motion.div 
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="liquid-glass rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-8 border-white/5 relative overflow-hidden group"
            >
              {layer.name === 'Intelligence Layer' && (
                <div className="absolute right-0 top-0 h-full flex items-center pr-8 opacity-0 group-hover:opacity-20 transition-opacity">
                  <ProcessingWave color="bg-primary" />
                </div>
              )}
              <div className={`text-2xl font-body font-medium min-w-[240px] ${layer.color}`}>{layer.name}</div>
              <div className="body-light text-lg flex-1">{layer.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnologyPrinciples = () => {
  return (
    <section className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto">
      <h2 className="heading-italic text-5xl md:text-7xl mb-16 text-center">Technology Principles</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Modular', 'Event Driven', 'AI Native', 'Real Time'].map((principle) => (
          <div key={principle} className="liquid-glass rounded-2xl p-12 flex flex-col items-center justify-center text-center border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-2 h-2 rounded-full bg-primary mb-6" />
            <h3 className="text-xl font-body font-medium">{principle}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyO4F = () => {
  return (
    <section className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Strategy</span>
          <h2 className="heading-italic text-5xl md:text-7xl mb-8">Why O4F</h2>
          <p className="body-light text-lg mb-12">
            We are building technology for a world where:
          </p>
          <ul className="space-y-8">
            {[
              'decisions are automated',
              'intelligence is distributed',
              'systems react instantly'
            ].map((item) => (
              <li key={item} className="flex items-center gap-4 group">
                <div className="w-12 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-primary transition-all" />
                <span className="text-2xl font-body font-light text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="liquid-glass rounded-3xl p-12 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Globe className="w-64 h-64" />
          </div>
          <p className="text-3xl font-body font-light leading-tight relative z-10">
            O4F is building the infrastructure that <span className="text-primary font-medium">understands data</span> and <span className="text-secondary font-medium">acts on it</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

const Research = () => {
  return (
    <section id="research" className="py-16 md:py-32 horizontal-padding bg-white/[0.02]">
      <div className="max-w-7xl mx-auto text-center">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Innovation</span>
        <h2 className="heading-italic text-5xl md:text-7xl mb-8">Research & Innovation</h2>
        <p className="body-light text-xl max-w-2xl mx-auto mb-16">
          Our work spans multiple domains including:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'AI infrastructure', icon: Cpu },
            { title: 'intelligent trading systems', icon: Zap },
            { title: 'distributed compute networks', icon: Network },
            { title: 'real-time data platforms', icon: Database }
          ].map((item) => (
            <div key={item.title} className="liquid-glass rounded-2xl p-8 border-white/5 flex flex-col items-center gap-6">
              <item.icon className="w-8 h-8 text-primary/60" />
              <span className="font-body text-sm uppercase tracking-wider text-white/70">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto text-center">
      <h2 className="heading-italic text-5xl md:text-7xl mb-12">Our Mission</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-3xl md:text-4xl font-body font-light leading-tight">
          To build systems that expand human capability.
        </p>
        <p className="body-light text-xl">
          Technology should not simply optimize the present. It should create new possibilities for the future.
        </p>
      </div>
    </section>
  );
};

const Join = () => {
  const investorUrl = "https://forms.gle/TmK4SU1A2G5isAui6";

  return (
    <section id="contact" className="py-16 md:py-32 horizontal-padding max-w-7xl mx-auto">
      <div className="liquid-glass rounded-[48px] p-16 md:p-24 text-center border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <h2 className="heading-italic text-5xl md:text-8xl mb-8 relative z-10">Join the Builders</h2>
        <p className="body-light text-xl max-w-2xl mx-auto mb-12 relative z-10">
          We are building a team of engineers, researchers, and thinkers who want to create lasting systems.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a
            href="mailto:info@04f.co.in"
            className="liquid-glass-strong rounded-full px-12 py-5 text-base font-body hover:bg-white/10 transition-all"
          >
            Contact Us
          </a>
          <a 
            href={investorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 rounded-full px-12 py-5 text-base font-body hover:bg-white/5 transition-all"
          >
            Investor Join Us
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  return (
    <footer className="py-10 md:py-20 horizontal-padding border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="text-3xl font-bold tracking-tighter">
            <span className="text-primary">O4</span>
            <span className="text-secondary">F</span>
          </div>
          <p className="body-light text-sm max-w-xs">
            Engineering the foundations of intelligent systems.
          </p>
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-body">About Us</h4>
            <p className="body-light text-xs leading-relaxed">
              205, 3rd Cross, Sector 2, HSR Layout,<br />
              Bengaluru, Karnataka 560102
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-body">Navigation</h4>
          <div className="flex flex-col gap-3">
            {['Home', 'Platform', 'Architecture', 'Research', 'Mission', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={item === 'Home' ? '#' : `#${item.toLowerCase()}`} 
                onClick={(e) => {
                  if (item === 'Home' && onNavigate) {
                    e.preventDefault();
                    onNavigate('home');
                  }
                }}
                className="text-sm font-body text-white/40 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-body">Resources</h4>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onNavigate?.('blog-ma-macd')}
              className="text-sm font-body text-white/40 hover:text-white transition-colors text-left"
            >
              Technical Indicators Guide
            </button>
            <a href="#" className="text-sm font-body text-white/40 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-sm font-body text-white/40 hover:text-white transition-colors">API Reference</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 O4F LLP. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

const BlogPage = ({ onBack }: { onBack: () => void, key?: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 horizontal-padding max-w-4xl mx-auto overflow-x-hidden"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="space-y-8 mb-16">
        <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-primary font-body">
          <span className="liquid-glass px-3 py-1 rounded-full">Research</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 min read</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" /> O4F Research Lab</span>
        </div>
        <h1 className="heading-italic text-5xl md:text-7xl">Mastering Technical Indicators: Understanding Moving Averages and MACD</h1>
        <p className="body-light text-xl leading-relaxed italic">
          Technical indicators are the sensory organs of automated trading systems. In this guide, we explore the foundational mechanics of Moving Averages and the MACD oscillator.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-12 font-body">
        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">1. Moving Averages: The Foundation of Trend Analysis</h2>
          <p className="body-light text-lg leading-relaxed">
            Moving averages (MA) smooth out price action by filtering out the "noise" from random short-term price fluctuations. They are lagging indicators, meaning they are based on past prices.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="liquid-glass p-6 rounded-2xl border-white/5">
              <h4 className="text-primary mb-2 font-medium">Simple Moving Average (SMA)</h4>
              <p className="text-sm body-light">The arithmetic mean of a given set of prices over a specific number of days. It treats all data points equally.</p>
            </div>
            <div className="liquid-glass p-6 rounded-2xl border-white/5">
              <h4 className="text-secondary mb-2 font-medium">Exponential Moving Average (EMA)</h4>
              <p className="text-sm body-light">Gives more weight to recent prices, making it more responsive to new information and trend shifts.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">2. Moving Average Crossover Strategies</h2>
          <p className="body-light text-lg leading-relaxed">
            Crossovers are one of the main moving average strategies. The first type is a price crossover, which is when the price crosses above or below a moving average to signal a potential change in trend.
          </p>
          <p className="body-light text-lg leading-relaxed">
            The second type is the "Golden Cross" and "Death Cross". A Golden Cross occurs when a short-term MA (e.g., 50-day) crosses above a long-term MA (e.g., 200-day), signaling a long-term bull market. Conversely, a Death Cross signals a bear market.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">3. MACD: Measuring Momentum and Trend Strength</h2>
          <p className="body-light text-lg leading-relaxed">
            The Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator that shows the relationship between two moving averages of a security’s price.
          </p>
          <div className="liquid-glass p-8 rounded-3xl border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/60">MACD Line</span>
              <span className="text-primary">12-day EMA - 26-day EMA</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/60">Signal Line</span>
              <span className="text-secondary">9-day EMA of MACD Line</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Histogram</span>
              <span className="text-white">MACD Line - Signal Line</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">4. MACD Divergence: Spotting Trend Reversals</h2>
          <p className="body-light text-lg leading-relaxed">
            Divergence occurs when the MACD does not confirm the price action. For example, if the price makes a new high but the MACD makes a lower high, it indicates weakening momentum and a potential reversal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">5. Combining MA 200 and MACD for Better Decisions</h2>
          <p className="body-light text-lg leading-relaxed">
            At O4F, we emphasize multi-layered validation. Using the 200-day SMA as a primary trend filter ensures that MACD signals are only taken in the direction of the long-term trend, significantly reducing false positives in volatile markets.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-medium text-white">6. Practical Implementation and Best Practices</h2>
          <p className="body-light text-lg leading-relaxed">
            While indicators are powerful, they are not crystal balls. Successful systems combine these with robust risk management, position sizing, and real-time execution monitoring.
          </p>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mt-8">
            <p className="text-primary font-medium mb-2 italic">Engineering Note:</p>
            <p className="text-sm body-light">Always backtest indicator-based strategies across multiple market cycles to understand their performance characteristics in different volatility regimes.</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const Blogs = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="research" className="py-16 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 inline-block">Insights</span>
      <h2 className="heading-italic text-5xl md:text-7xl mb-16">Research & Insights</h2>
      
      <div className="grid md:grid-cols-1 gap-8">
        <motion.div 
          whileHover={{ x: 10 }}
          onClick={() => onNavigate('blog-ma-macd')}
          className="liquid-glass rounded-3xl p-8 md:p-12 border-white/5 hover:border-primary/30 transition-all cursor-pointer group flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="w-full md:w-1/3 aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <BookOpen className="w-12 h-12 text-primary/40 group-hover:text-primary transition-colors" />
          </div>
          <div className="flex-1 space-y-4 text-left">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
              <span>Technical Analysis</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <h3 className="text-3xl font-body font-medium group-hover:text-primary transition-colors">Mastering Technical Indicators: Understanding Moving Averages and MACD</h3>
            <p className="body-light text-lg">A deep dive into the mechanics of trend analysis and momentum oscillators for intelligent trading systems.</p>
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              Read Article <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar onExplorePlatform={() => setShowComingSoonDialog(true)} />
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onExplorePlatform={() => setShowComingSoonDialog(true)} />
              <Vision />
              <WhatWeBuild />
              <Architecture />
              <TechnologyPrinciples />
              <WhyO4F />
              <Research />
              <Blogs onNavigate={setCurrentPage} />
              <Mission />
              <Join />
            </motion.div>
          ) : (
            <BlogPage key="blog" onBack={() => setCurrentPage('home')} />
          )}
        </AnimatePresence>
      </main>
      <Footer onNavigate={setCurrentPage} />
      <ComingSoonDialog isOpen={showComingSoonDialog} onClose={() => setShowComingSoonDialog(false)} />
    </div>
  );
}
