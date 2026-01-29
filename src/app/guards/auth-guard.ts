import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const isLogged = await this.storageService.get('login');

    console.log('Guard login =>', isLogged);

    if (isLogged === true) {
      // ✅ Está logueado → puede entrar
      return true;
    }

    // ❌ No está logueado → lo mandamos al login
    this.router.navigateByUrl('/login');
    return false;
  }
}
