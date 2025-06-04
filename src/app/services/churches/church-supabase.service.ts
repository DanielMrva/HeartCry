import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { Observable, from, map } from 'rxjs';
import { Church, ChurchName } from '../../../types/types';
import { Database } from '../../../types/database.types';


@Injectable({
  providedIn: 'root'
})
export class ChurchSupabaseService {

  private supabaseUrl = environment.SUPABASE_URL;
  private supabaseKey = environment.SUPABASE_KEY;

  supabase = createClient<Database>(environment.SUPABASE_URL, environment.SUPABASE_KEY);

  getAllChurches(): Observable<Church[]> {
    const promise = this.supabase.from("churches").select("*");
    return from(promise).pipe(
      map((response) => {
        return response.data ?? []
      })
    );
  };

  getChurchNames(): Observable<ChurchName[]> {
    const promise = this.supabase.from("churches").select("id, name");
    return from(promise).pipe(
      map(res => res.data ?? [])
    )
  }

  getOneChurch(id: string): Observable<Church | null> {
    const promise = this.supabase.from("churches").select("*").eq("id", id).single();
    return from(promise).pipe(
      map((response) => {
        return response.data ?? null;
      })
    );
  }

  constructor() { }
}
