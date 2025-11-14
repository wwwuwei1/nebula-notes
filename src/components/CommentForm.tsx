import { FormEvent, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createComment } from '../services/blogService';

type Props = {
  postId: string;
  user: User | null;
  onSuccess: () => void;
};

export const CommentForm = ({ postId, user, onSuccess }: Props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-500">
        登录后即可参与讨论。
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    try {
      await createComment({
        post_id: postId,
        author_id: user.id,
        content: value.trim(),
      });
      setValue('');
      setMessage('评论已发布');
      onSuccess();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '发布失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <textarea
        rows={4}
        placeholder="输入你的想法..."
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {message && <p className="text-xs text-primary-500">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-60"
      >
        {loading ? '发布中...' : '发布评论'}
      </button>
    </form>
  );
};

