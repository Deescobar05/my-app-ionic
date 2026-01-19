import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
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
export class HomePage implements OnInit {
  // [Tarea] Agregar informacion de minimo 3 slides para mostrar en la vista
  // [Tarea] Cambiar mediante el click de un boton el tema (color) de los slides

  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  genres = [
    {
      title: 'Música Clásica',
      image:
        'https://wallpapers.com/images/featured-full/musica-clasica-a58kbdl0oe9y9hxf.jpg',
      description:
        'La música clásica se refiere a un estilo de música que surgió durante el período clásico (aproximadamente 1750-1820) y se caracteriza por su estructura formal y su apego a la notación musical. A menudo, el término se usa para describir un rango más amplio de música culta que incluye la música barroca, renacentista y romántica.',
    },
    {
      title: 'Música Rock',
      image:
        'https://wearerock.wordpress.com/wp-content/uploads/2013/11/f61e2b21d1.jpg',
      description:
        'Género musical vibrante, surgido en EE. UU. en los 50, derivado del rock and roll, que mezcla blues, country y R&B, caracterizado por guitarras eléctricas potentes, ritmo marcado (4/4), letras sociales o personales y una fuerte presencia escénica, evolucionando en innumerables subgéneros como punk, grunge, alternativo, y más, siendo un vehículo para la rebeldía juvenil y la contracultura',
    },
    {
      title: 'Música Jazz',
      image:
        'https://ohmagazinerd.com/wp-content/uploads/2020/04/Untitled-17-1-1.jpg',
      description:
        'El jazz es un género musical que nació a finales del siglo XIX en las comunidades afroamericanas de Nueva Orleans. Se trata de una categoría en torno a la cual operan diferentes géneros musicales con características comunes. El género surge de la confrontación de la música de ascendencia afroamericana con la tradición europea, teniendo como base el swing y la improvisación: en un origen, los esclavos norteamericanos tuvieron que aprender el lenguaje musical europeo si querían seguir cantando. De este modo, la música jazz puede entenderse tanto como un género musical en sí mismo como un idioma musical propio.',
    },
  ];

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.loadStorageData();
  }

  async cambiarColor() {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    await this.storageService.set('theme', this.colorActual);
    console.log('Tema Guardado', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }
}
