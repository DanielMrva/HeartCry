import { Injectable, signal } from '@angular/core';
import { PrayerRequest } from '../../../types/types';
import { PrayerRequestFilter } from '../../../types/prayerRequest.filter.enum';


@Injectable({
  providedIn: 'root'
})
export class PrayerRequestService {
  prayerRequestSignal = signal<PrayerRequest[]>([]);
  prayerRequestFilterSignal = signal<PrayerRequestFilter>(PrayerRequestFilter.ALL);
  prayerRequestLoadingSignal = signal<boolean>(false);
  prayerRequestErrorSignal = signal<string | null>(null);

  changeFilter(filterName: PrayerRequestFilter) {
    this.prayerRequestFilterSignal.set(filterName);
  };

  addPrayerRequest(prayerRequest: PrayerRequest) {
    this.prayerRequestSignal.update((prev) => [...prev, prayerRequest]);
  };

  removePrayerRequest(id: string) {
    this.prayerRequestSignal.update((prev) => prev.filter((prayerRequest) => prayerRequest.id !== id));
  };

  updatePrayerRequest(id: string, prayerRequest: Partial<PrayerRequest>) {
    this.prayerRequestSignal.update((prev) => {
      const index = prev.findIndex((prayerRequest) => prayerRequest.id === id);
      if (index !== -1) {
        const updatedPrayerRequest = { ...prev[index], ...prayerRequest };
        return [...prev.slice(0, index), updatedPrayerRequest, ...prev.slice(index + 1)];
      }
      return prev;
    });
  };

  

  constructor() { }
}
