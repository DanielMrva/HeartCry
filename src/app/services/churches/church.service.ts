import { Injectable, signal, computed, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { ChurchSupabaseService } from './church-supabase.service';
import { Church, ChurchName } from '../../../types/types';

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  private readonly churchSupabase = inject(ChurchSupabaseService);


  readonly _churchNames = toSignal(
    this.churchSupabase.getChurchNames().pipe(
      map(churches => churches.map(c => ({
        id: c.id,
        name: c.name
      })))
    ),
    { initialValue: [] as ChurchName[] }
  );

  readonly _allChurches = toSignal(
    this.churchSupabase.getAllChurches().pipe(
      map(churches => churches.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        settings: c.settings,
        created_at: c.created_at,
        updated_at: c.updated_at
      })))
    ),
    { initialValue: [] as Church[] }
  );



  filteredChurchNames(filter: string) {
    return computed(() => {
      const term = filter.toLowerCase();
      return this._churchNames().filter(c =>
        c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term)
      );
    });
  };


}
