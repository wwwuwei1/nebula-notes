import { FormEvent, useState } from 'react';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { supabase } from '../../lib/supabase';

export const AuthPanel = () => {
  const { user, loading } = useSupabaseAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword(form);
    setSubmitting(false);
    setMessage(error ? error.message : '登录成功');
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.email.split('@')[0],
        },
      },
    });
    setSubmitting(false);
    setMessage(error ? error.message : '注册成功，请查收验证邮件');
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  if (loading) {
    return <span className="text-xs text-slate-500">加载中...</span>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span className="hidden md:block">你好，{user.email}</span>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
          onClick={handleSignOut}
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <details className="relative">
      <summary className="cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary-300 hover:text-primary-600">
        登录/注册
      </summary>
      <form
        className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-100 bg-white p-4 shadow-2xl"
        onSubmit={handleSignIn}
      >
        <div className="mb-2 text-sm font-semibold text-slate-700">即时体验创作工具</div>
        <label className="mb-2 block text-xs text-slate-500">
          邮箱
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
          />
        </label>
        <label className="mb-3 block text-xs text-slate-500">
          密码
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
          />
        </label>
        {message && <p className="mb-2 text-xs text-primary-500">{message}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-primary-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? '处理中...' : '登录'}
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="flex-1 rounded-lg border border-primary-100 px-3 py-2 text-xs font-semibold text-primary-500 transition hover:border-primary-300 hover:bg-primary-50"
          >
            注册
          </button>
        </div>
      </form>
    </details>
  );
};

