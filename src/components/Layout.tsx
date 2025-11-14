import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: PropsWithChildren) => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <Navbar />
    <main className="flex-1">{children}</main>
    <footer className="border-t border-white/20 bg-white/80 py-10 text-center text-sm text-slate-500">
      <p>Nebula Notes · 基于 Supabase + Netlify 构建的 Serverless 个人博客</p>
      <p className="mt-2">© {new Date().getFullYear()} Created by Student</p>
    </footer>
  </div>
);

