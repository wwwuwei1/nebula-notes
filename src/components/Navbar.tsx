import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AuthPanel } from './auth/AuthPanel';

const links = [
  { to: '/', label: '主页' },
  { to: '/posts', label: '文章' },
  { to: '/studio', label: '创作中心' },
  { to: '/about', label: '关于我' },
];

export const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary-600">
        <img src="/logo.svg" alt="Nebula Notes" className="h-9 w-9" />
        Nebula Notes
      </NavLink>
      <nav className="hidden gap-6 text-sm font-medium md:flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx('transition-colors hover:text-primary-600', isActive && 'text-primary-600')
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <AuthPanel />
      </div>
    </div>
  </header>
);

