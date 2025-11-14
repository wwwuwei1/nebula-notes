import { FormEvent, useMemo, useState } from 'react';
import slugify from 'slugify';
import { upsertPost } from '../services/blogService';
import type { Post } from '../types';

type Props = {
  authorId: string;
  onSaved: (post: Post) => void;
};

const slugOptions = { lower: true, strict: true, trim: true };

export const PostEditor = ({ authorId, onSaved }: Props) => {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    tags: '',
    cover_image: '',
    content: '',
    status: 'draft',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const generatedSlug = useMemo(() => slugify(form.title || 'new-post', slugOptions), [form.title]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        ...form,
        slug: form.slug || generatedSlug,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        author_id: authorId,
        published_at: form.status === 'published' ? new Date().toISOString() : null,
      };
      const result = await upsertPost(payload as Partial<Post>);
      if (result) {
        setMessage('保存成功 ✅');
        onSaved(result as Post);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          标题
          <input
            type="text"
            name="title"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 focus:border-primary-400 focus:outline-none"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label className="text-sm text-slate-600">
          自定义链接（可选）
          <input
            type="text"
            name="slug"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
            value={form.slug}
            placeholder={generatedSlug}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm text-slate-600">
          标签（英文逗号分隔）
          <input
            type="text"
            name="tags"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 focus:border-primary-400 focus:outline-none"
            value={form.tags}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm text-slate-600">
          封面图 URL
          <input
            type="url"
            name="cover_image"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 focus:border-primary-400 focus:outline-none"
            value={form.cover_image}
            onChange={handleChange}
          />
        </label>
      </div>
      <label className="text-sm text-slate-600">
        摘要
        <textarea
          name="excerpt"
          rows={2}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
          value={form.excerpt}
          onChange={handleChange}
        />
      </label>
      <label className="text-sm text-slate-600">
        正文
        <textarea
          name="content"
          rows={6}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none"
          value={form.content}
          onChange={handleChange}
          required
        />
      </label>
      <label className="text-sm text-slate-600">
        状态
        <select
          name="status"
          className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none md:w-40"
          value={form.status}
          onChange={handleChange}
        >
          <option value="draft">草稿</option>
          <option value="published">发布</option>
        </select>
      </label>
      {message && <p className="text-sm text-primary-500">{message}</p>}
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-2xl bg-primary-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-600 disabled:opacity-60 md:w-auto"
      >
        {saving ? '保存中...' : '保存文章'}
      </button>
    </form>
  );
};

