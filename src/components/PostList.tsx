import type { Post } from '../types';
import { PostCard } from './PostCard';
import { EmptyState } from './EmptyState';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => {
  if (!posts.length) {
    return <EmptyState title="内容还在酝酿中" description="创建首篇文章，让博客焕发生机。" />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

