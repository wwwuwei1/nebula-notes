import { Link } from 'react-router-dom';
import dayjs from '../lib/dayjs';
import type { Post } from '../types';

type Props = {
  post: Post;
  variant?: 'grid' | 'list';
};

export const PostCard = ({ post, variant = 'grid' }: Props) => (
  <article className="group flex h-full flex-col rounded-3xl border border-transparent bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-100 hover:shadow-xl">
    {post.cover_image && (
      <div className="mb-4 overflow-hidden rounded-2xl">
        <img
          src={post.cover_image}
          alt={post.title}
          className="h-48 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    )}
    <div className="text-xs uppercase tracking-[0.2em] text-primary-400">{post.tags?.join(' · ')}</div>
    <h3 className="mt-3 font-display text-2xl text-slate-900">
      <Link to={`/posts/${post.slug}`}>{post.title}</Link>
    </h3>
    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
      <span>{dayjs(post.published_at ?? post.created_at).format('YYYY-MM-DD')}</span>
      {variant === 'grid' && <span className="font-medium text-primary-500">阅读全文 →</span>}
    </div>
  </article>
);

