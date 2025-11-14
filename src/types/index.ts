export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[];
  content: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at?: string;
  author_id: string;
  author?: Profile;
};

export type Comment = {
  id: string;
  content: string;
  post_id: string;
  author_id: string;
  created_at?: string;
  author?: Profile;
};

export type SiteStat = {
  postsCount: number;
  commentsCount: number;
  latestPublishDate?: string | null;
  featuredTags: string[];
};

