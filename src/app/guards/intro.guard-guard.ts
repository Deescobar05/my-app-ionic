import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const introSeen = await this.storageService.get('introSeen');

    if (introSeen) {
      // ✅ Ya vio la intro → puede entrar al home
      return true;
    }

    // ❌ No ha visto la intro → lo mandamos al intro
    this.router.navigateByUrl('/intro');
    return false;
  }
}
