import { Injectable } from '@angular/core';
import {createClient} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { Observable, from, map } from 'rxjs';
import { PrayerRequest } from '../../../types/types';
import { Database } from '../../../types/database.types';


@Injectable({
  providedIn: 'root'
})

export class PrayerRequestSupabaseService {

  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  supabase = createClient<Database>(this.supabaseUrl, this.supabaseKey);

  getAllPrayerRequests(): Observable<PrayerRequest[]> {
    const promise = this.supabase.from("prayer_requests").select("*");
    return from(promise).pipe(
      map((response) => {
        return response.data ?? []
      })
    );
  };

  addPrayerRequest(prayerRequest: PrayerRequest): Observable<PrayerRequest> {
    const promise = this.supabase
      .from("prayer_requests")
      .insert(prayerRequest)
      .select("*")
      .single();
    return from(promise).pipe(map((result) => result.data!));
  };

  removePrayerRequest(id: string): Observable<void> {
    const promise = this.supabase.from("prayer_requests").delete().match({id: id});
    return from(promise).pipe(map(() => {}))
  };

  updatePrayerRequest(id: string, prayerRequest: Partial<PrayerRequest>): Observable<PrayerRequest> {
    const promise = this.supabase
      .from("prayer_requests")
      .update(prayerRequest)
      .match({id: id})
      .select("*")
      .single();
    return from(promise).pipe(map((result) => result.data!));
  };

  constructor() { }
}
