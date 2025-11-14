import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error?: string;
};

export const useSupabaseAuth = (): AuthState => {
  const [value, setValue] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    if (!supabase) {
      setValue((prev) => ({ ...prev, loading: false }));
      return;
    }

    const fetchInitialSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setValue({
        session,
        user: session?.user ?? null,
        loading: false,
        error: error?.message,
      });
    };

    fetchInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setValue({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return value;
};

