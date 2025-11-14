import { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { PageContainer } from '../components/PageContainer';
import { StatsBoard } from '../components/StatsBoard';
import { PostList } from '../components/PostList';
import { Loader } from '../components/Loader';
import type { Post, SiteStat } from '../types';
import { fetchRecentPosts, fetchStats } from '../services/blogService';

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<SiteStat>({
    postsCount: 0,
    commentsCount: 0,
    featuredTags: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postData, statData] = await Promise.all([fetchRecentPosts(6), fetchStats()]);
        setPosts(postData);
        setStats(statData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <PageContainer width="xl">
        <Hero />
      </PageContainer>
      <PageContainer width="xl">
        <StatsBoard stats={stats} />
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-600">
          {stats.featuredTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </PageContainer>
      <PageContainer width="xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-slate-900">最新发布</h2>
        </div>
        <div className="mt-8">
          {loading ? <Loader label="加载文章中..." /> : <PostList posts={posts} />}
        </div>
      </PageContainer>
    </>
  );
};

