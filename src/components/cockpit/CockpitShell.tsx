import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  LineChart,
  Sparkles,
  Receipt,
  Shield,
  History,
  Settings,
  Bell,
  Search,
  ArrowLeft,
  Activity,
  Menu,
  X as CloseIcon,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Logo } from '../Logo';
import { LiveTicker } from './LiveTicker';

const NAV_ITEMS = [
  { to: '/cockpit',  label: 'Cockpit',    icon: LayoutDashboard },
  { to: '/backtest', label: 'Backtest',   icon: LineChart },
  { to: '/strategy', label: 'Strategies', icon: Sparkles },
  { to: '/orders',   label: 'Orders',     icon: Receipt },
  { to: '/rms',      label: 'Risk (RMS)', icon: Shield },
  { to: '/history',  label: 'History',    icon: History },
];

type CockpitShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function CockpitShell({ children, title, subtitle, actions }: CockpitShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070d] text-white selection:bg-primary/30">
      {/* Background ambient gradient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[240px] shrink-0 border-r border-white/[0.06] bg-black/40 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-white/[0.06]">
            <Logo className="text-xl font-bold tracking-tighter" />
            <span className="text-[10px] uppercase tracking-widest text-white/40 ml-1 mt-1">cockpit</span>
          </Link>

          <nav className="flex-1 px-3 py-4 space-y-0.5">
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/30 font-mono">Trading</div>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? 'bg-gradient-to-r from-blue-500/15 to-emerald-500/5 text-white border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                </Link>
              );
            })}

            <div className="px-3 py-2 mt-6 text-[10px] uppercase tracking-widest text-white/30 font-mono">Account</div>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.04] transition-all">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="px-4 py-4 border-t border-white/[0.06]">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-300/90 font-mono">LIVE · IST</span>
              </div>
              <div className="text-[11px] text-white/55 leading-snug">
                Markets <span className="text-emerald-300">open</span> · 14 fills today · all brokers nominal
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3">
              {/* Mobile: hamburger menu */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5 text-white/70" />
              </button>
              <Link to="/" className="md:hidden flex items-center gap-2">
                <Logo className="text-base font-bold tracking-tighter" />
              </Link>
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/40 min-w-[300px]">
                <Search className="w-3.5 h-3.5" />
                <span>Search symbols, strategies, trades…</span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 font-mono">⌘K</span>
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">38ms · prod</span>
                </div>
                <button className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-colors">
                  <Bell className="w-4 h-4 text-white/60" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </button>
                <div className="flex items-center gap-2.5 px-2 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 grid place-items-center text-[11px] font-bold">AG</div>
                  <div className="text-xs hidden lg:block">
                    <div className="leading-tight">Aman</div>
                    <div className="text-[10px] text-white/40 leading-tight">admin · prod</div>
                  </div>
                </div>
              </div>
            </div>
            <LiveTicker />
          </header>

          {/* Mobile nav drawer */}
          {mobileNavOpen && (
            <div className="md:hidden fixed inset-0 z-[60] bg-[#05070d]/98 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <Link to="/" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-2">
                  <Logo className="text-xl font-bold tracking-tighter" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40 ml-1 mt-1">cockpit</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 -mr-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  aria-label="Close navigation"
                >
                  <CloseIcon className="w-5 h-5 text-white/70" />
                </button>
              </div>
              <nav className="px-3 py-4 space-y-0.5">
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/30 font-mono">Trading</div>
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all ${
                        active
                          ? 'bg-gradient-to-r from-blue-500/15 to-emerald-500/5 text-white border border-white/10'
                          : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    </Link>
                  );
                })}
                <div className="px-3 py-2 mt-6 text-[10px] uppercase tracking-widest text-white/30 font-mono">Account</div>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base text-white/55 hover:text-white hover:bg-white/[0.04] transition-all">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <Link
                  to="/v2"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 mt-6 rounded-lg text-base text-white/55 hover:text-white hover:bg-white/[0.04]"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to website</span>
                </Link>
              </nav>
            </div>
          )}

          {/* Page header */}
          <div className="px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-2 flex items-start justify-between gap-3 sm:gap-4 flex-wrap">
            <div className="space-y-1.5 min-w-0">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/30 font-mono">O4F · Cockpit</div>
              <h1 className="heading-italic text-4xl sm:text-5xl md:text-6xl">{title}</h1>
              {subtitle && <p className="body-light text-sm sm:text-base md:text-lg max-w-2xl">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
          </div>

          {/* Page body */}
          <main className="flex-1 px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-8 min-w-0">{children}</main>

          {/* Footer */}
          <footer className="border-t border-white/[0.06] px-4 sm:px-6 md:px-10 py-4 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 font-mono flex items-center justify-between flex-wrap gap-2">
            <span>© 2026 O4F LLP <span className="hidden sm:inline">· Intelligent Trading Infrastructure</span></span>
            <span>v0.9.3-cockpit <span className="hidden sm:inline">· uptime 99.987%</span></span>
          </footer>
        </div>
      </div>
    </div>
  );
}
