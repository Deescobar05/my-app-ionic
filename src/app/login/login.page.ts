import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  validation_message = {
    email: [
      {
        type: 'required',
        message: 'El email es obligatorio',
      },
      {
        type: 'email',
        message: 'Email inválido',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es obligatoria',
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener mínimo 6 caracteres',
      },
    ],
  };

  constructor(
    private formBuildder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
  ) {
    this.loginForm = this.formBuildder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email]),
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ),
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loginForm.reset();
    this.errorMessage = '';
  }

  loginUser(credentials: any) {
    this.authService
      .loginUser(credentials)
      .then(async (res) => {
        this.errorMessage = '';

        // ✅ Guardamos login:true
        await this.storageService.set('login', true);
        await this.showAlert('✅ Bienvenido', res, 'success');
        this.navController.navigateForward('/home');
      })
      .catch(async (error) => {
        await this.showAlert('❌ Error', error, 'danger');
      });
  }

  goToRegister() {
    this.navController.navigateForward('/register');
  }

  async showAlert(
    header: string,
    message: string,
    color: 'success' | 'danger' | 'warning',
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: color,
    });

    await alert.present();
  }
}
