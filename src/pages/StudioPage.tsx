import { useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { PostEditor } from '../components/PostEditor';
import { PostList } from '../components/PostList';
import type { Post } from '../types';
import { fetchAllPosts } from '../services/blogService';
import { Loader } from '../components/Loader';

export const StudioPage = () => {
  const { user } = useSupabaseAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = async () => {
    const data = await fetchAllPosts();
    setPosts(data);
  };

  useEffect(() => {
    const load = async () => {
      await refreshPosts();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <PageContainer width="xl">
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        <div>
          <h1 className="font-display text-3xl text-slate-900">创作中心</h1>
          <p className="text-sm text-slate-500">写下你的灵感，点击保存即可同步到 Supabase。</p>
          {user ? (
            <div className="mt-6">
              <PostEditor authorId={user.id} onSaved={refreshPosts} />
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
              请先登录账号再进行创作。
            </div>
          )}
        </div>
        <div>
          <h2 className="font-display text-2xl text-slate-900">历史文章</h2>
          <p className="text-xs text-slate-500">数据实时来自 Supabase</p>
          <div className="mt-4">
            {loading ? <Loader label="同步文章..." /> : <PostList posts={posts} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

