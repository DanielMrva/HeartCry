import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { AuthSupabaseService } from './auth-supabase.service';
import { AppUser } from '../../../types/types';
import { Session, User, AuthChangeEvent } from '@supabase/auth-js';
import { Subscription, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  sessionSignal = signal<Session | null>(null);
  profileSignal = signal<AppUser | null>(null);
  isAuthenticated = computed(() => !!this.sessionSignal());
  isLoadingProfile = signal(false);

  private authSub?: Subscription;

  constructor(private supabaseAuth: AuthSupabaseService) {
    //On init rehydrate any existing session and profile
    this.supabaseAuth.getSession$().subscribe({
      next: (session) => {
        this.sessionSignal.set(session);
        if (session) {
          this.loadProfile(session.user);
        }
      },
      error: (err) => {
        console.error('Error fetching session:', err);
        this.sessionSignal.set(null);
      }
    });

    // Subscribe to auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESH)
    this.supabaseAuth.authChanges((event, session) => {
      this.sessionSignal.set(session);

      if (event === 'SIGNED_OUT' || !session?.user) {
        this.profileSignal.set(null);
        return;
      }

      if (session.user) {
        this.loadProfile(session.user);
      }
    })

  };

  login(email: string, password: string) {
    //Because we already subscribed to authChanges when supabase signs in, our authChanges handles loadProfile immediately, so components can simply subscribe to login.subscrie to know success/error
    return this.supabaseAuth.signIn(email, password).pipe()
  };

  signup(email: string) {
    return this.supabaseAuth.singUp(email).pipe()
  }

  logout() {
    this.profileSignal.set(null);
    this.sessionSignal.set(null);
    this.isLoadingProfile.set(false);
    return this.supabaseAuth.signOut();
  }

  private loadProfile(user: User) {
    this.isLoadingProfile.set(true);
    this.supabaseAuth.getProfileById(user.id).subscribe({
      next: (profile) => {
        this.profileSignal.set(profile);
        this.isLoadingProfile.set(false);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.profileSignal.set(null);
        this.isLoadingProfile.set(false);
      }
    });
  };

  ngOnDestroy() {
    // Unsubscribe from auth changes to prevent memory leaks
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  };


}
