import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  // [Tarea] Agregar informacion de minimo 3 slides para mostrar en la vista
  genres = [
    {
      title: 'Musica clasica',
      image:
        'https://wallpapers.com/images/featured-full/musica-clasica-a58kbdl0oe9y9hxf.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veritatis provident reiciendis quam aliquid Ad harum nihil perspiciatis quaerat ex, a blanditiis adipisci alias ullam id deserunt! Dignissimos, est a',
    },
    {
      title: 'slide-2',
      image: '',
      description: '',
    },
    {
      title: 'slide-3',
      image: '',
      description: '',
    },
  ];
  constructor() {}
}
