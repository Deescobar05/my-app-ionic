import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';

  private themeSubject = new BehaviorSubject<string>(this.colorOscuro);
  theme$ = this.themeSubject.asObservable();

  constructor(private storageService: StorageService) {}

  async toggleTheme() {
    const current = this.themeSubject.value;

    const newTheme =
      current === this.colorOscuro ? this.colorClaro : this.colorOscuro;

    this.themeSubject.next(newTheme);

    await this.storageService.set('theme', newTheme);
  }

  async loadTheme() {
    const saved = await this.storageService.get('theme');

    if (saved) {
      this.themeSubject.next(saved);
    }
  }
}
