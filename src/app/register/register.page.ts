import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  validation_message = {
    name: [{ type: 'required', message: 'El nombre es obligatorio' }],
    lastName: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Email inválido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'Mínimo 6 caracteres' },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private registerService: RegisterService,
    private storageService: StorageService,
    private navCtrl: NavController,
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  async registerUser() {
    if (!this.registerForm.valid) return;

    try {
      const response = await this.registerService.registerUser(
        this.registerForm.value,
      );

      if (response === 'accept') {
        await this.storageService.set('user', this.registerForm.value);
        await this.showAlert('🎉 Registro exitoso', response);
        this.navCtrl.navigateRoot('/login');
      }
    } catch (error: any) {
      this.errorMessage = error;
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
