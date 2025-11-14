import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments, fetchPostBySlug } from '../services/blogService';
import type { Comment, Post } from '../types';
import { PageContainer } from '../components/PageContainer';
import { Loader } from '../components/Loader';
import { RichText } from '../components/RichText';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

export const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabaseAuth();

  const refreshComments = async (postId: string) => {
    const data = await fetchComments(postId);
    setComments(data);
  };

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        const data = await fetchPostBySlug(slug);
        if (data) {
          setPost(data);
          await refreshComments(data.id);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <PageContainer width="xl">
        <Loader />
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer width="xl">
        <p className="text-center text-slate-500">未找到该文章。</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer width="xl">
      <article className="space-y-6 rounded-[32px] border border-slate-100 bg-white/80 p-8 shadow-lg">
        <div className="text-sm uppercase tracking-[0.4em] text-primary-400">{post.tags.join(' · ')}</div>
        <h1 className="font-display text-4xl text-slate-900">{post.title}</h1>
        <p className="text-base text-slate-500">{post.excerpt}</p>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-3xl object-cover"
          />
        )}
        <RichText content={post.content} />
      </article>
      <section className="mt-10 space-y-6">
        <h2 className="font-display text-2xl text-slate-900">评论</h2>
        <CommentForm postId={post.id} user={user} onSuccess={() => refreshComments(post.id)} />
        <CommentList comments={comments} />
      </section>
    </PageContainer>
  );
};

