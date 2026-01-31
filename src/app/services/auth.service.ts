import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageService) {}

  async loginUser(credentials: any): Promise<string> {
    const user = await this.storage.get('user');

    if (!user) {
      return Promise.reject('No existe usuario registrado');
    }

    if (
      credentials.email === user.email &&
      credentials.password === user.password
    ) {
      await this.storage.set('login', true);
      console.log('Login exitoso');
      return Promise.resolve('Login correcto');
    }

    return Promise.reject('Email o contraseña incorrectos');
  }

  // LOGOUT por si acaso
  async logout() {
    await this.storage.remove('login');
  }

  // Validar sesión por si acaso
  async isLoggedIn(): Promise<boolean> {
    const login = await this.storage.get('login');
    return login === true;
  }
}
