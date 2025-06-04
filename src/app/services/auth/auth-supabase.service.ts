import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
  createClient
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { Observable, from, map, switchMap } from 'rxjs';
import { AppUser } from '../../../types/types';
import { Database } from '../../../types/database.types';

@Injectable({ providedIn: 'root' })
export class AuthSupabaseService {
  private supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );
  }

  /**
   * Returns an Observable that emits the current Session (or null if none).
   */
  getSession$(): Observable<Session | null> {
    return from(this.supabase.auth.getSession()).pipe(
      map(({ data: { session } }) => session)
    );
  }

  /**
   * Subscribe to Supabase auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESH).
   */
  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Perform email+password sign-in; returns an Observable<{ session, user }> like the raw supabase call.
   * If successful, you might still want to fetch the profile separately.
   */
  signIn(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  /**
   * Perform email sign-up; returns an Observable<{ session, user }> like the raw supabase call.
   * If successful, you might still want to fetch the profile separately.
   */
  singUp(email: string) {
    return from(this.supabase.auth.signInWithOtp({ email })).pipe();
  };
  
  /**
   * Fetch the AppUser row (from your 'app_user' view) for a given Supabase user ID.
   */
  getProfileById(userId: string): Observable<AppUser> {
    return from(
      this.supabase
        .from('app_user')
        .select('*')
        .eq('id', userId)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) {
          throw error ?? new Error('Could not load profile');
        }
        return data as AppUser;
      })
    );
  }

  /**
   * Sign the user out of Supabase. Does not clear any Signals; that's up to AuthService.
   */
  signOut(): Observable<void> {
    return from(this.supabase.auth.signOut()).pipe(map(() => {}));
  }
}
