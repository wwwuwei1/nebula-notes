import { useEffect, useMemo, useState } from 'react';
import { fetchAllPosts } from '../services/blogService';
import type { Post } from '../types';
import { PageContainer } from '../components/PageContainer';
import { Loader } from '../components/Loader';
import { PostList } from '../components/PostList';

export const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, posts]);

  return (
    <PageContainer width="xl">
      <div className="flex flex-col gap-3 pb-8">
        <h1 className="font-display text-4xl text-slate-900">全部文章</h1>
        <p className="text-sm text-slate-500">共 {posts.length} 篇创作</p>
        <input
          type="search"
          placeholder="搜索标题关键字..."
          className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none md:w-80"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {loading ? <Loader label="加载文章..." /> : <PostList posts={filtered} />}
    </PageContainer>
  );
};

