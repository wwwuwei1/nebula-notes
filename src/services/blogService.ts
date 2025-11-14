import { supabase } from '../lib/supabase';
import type { Comment, Post, Profile, SiteStat } from '../types';

const withAuthor = `
id,
title,
slug,
excerpt,
cover_image,
tags,
content,
status,
published_at,
author_id,
author:profiles (
  id,
  username,
  avatar_url,
  bio
)
`;

export const fetchRecentPosts = async (limit = 6): Promise<Post[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select(withAuthor)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
};

export const fetchAllPosts = async (search?: string): Promise<Post[]> => {
  if (!supabase) return [];
  let query = supabase
    .from('posts')
    .select(withAuthor)
    .order('published_at', { ascending: false });

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
};

export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select(`${withAuthor}, comments:comments (*, author:profiles (id, username, avatar_url))`)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('comments')
    .select(
      `
      id,
      content,
      created_at,
      post_id,
      author:profiles (
        id,
        username,
        avatar_url
      )
    `,
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const upsertProfile = async (payload: Profile) => {
  if (!supabase) return null;
  const { data, error } = await supabase.from('profiles').upsert(payload).select().single();
  if (error) throw error;
  return data;
};

export const upsertPost = async (payload: Partial<Post>) => {
  if (!supabase) return null;
  const { data, error } = await supabase.from('posts').upsert(payload).select().single();
  if (error) throw error;
  return data;
};

export const createComment = async (payload: Omit<Comment, 'id'>) => {
  if (!supabase) return null;
  const { data, error } = await supabase.from('comments').insert(payload).select().single();
  if (error) throw error;
  return data;
};

export const fetchStats = async (): Promise<SiteStat> => {
  if (!supabase) {
    return {
      commentsCount: 0,
      postsCount: 0,
      featuredTags: [],
    };
  }

  const [{ count: postsCount }, { count: commentsCount }, tags] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('tags').limit(50),
  ]);

  const flatTags = (tags.data ?? []).flatMap((item) => item.tags ?? []);
  const featuredTags = [...new Set(flatTags)].slice(0, 8);

  return {
    postsCount: postsCount ?? 0,
    commentsCount: commentsCount ?? 0,
    latestPublishDate: null,
    featuredTags,
  };
};

