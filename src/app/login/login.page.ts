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
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_message = {
    email: [
      {
        type: 'required',
        message: 'El email es obligatorio',
      },
      {
        type: 'email',
        message: 'Email invalido',
      },
    ],
  };

  constructor(private formBuildder: FormBuilder) {
    this.loginForm = this.formBuildder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email]),
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.min(6)]),
      ),
    });
  }

  ngOnInit() {}

  loginUser(credentials: any){
    console.log('credentials:', credentials)
  }
}
