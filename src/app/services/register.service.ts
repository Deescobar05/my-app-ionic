import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  async registerUser(data: any): Promise<string> {
    console.log('Registrando usuario...', data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email.includes('@')) {
          resolve('accept');
        } else {
          reject('Registro inválido');
        }
      }, 1200);
    });
  }
}
