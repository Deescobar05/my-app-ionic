import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  // [Tarea] Agregar informacion de minimo 3 slides para mostrar en la vista -> Listo
  // [Tarea] Cambiar mediante el click de un boton el tema (color) de los slides -> Listo
  // [Tarea] Al volver atras o volver al home, guardar en el storage que ya estuve o vi la pagina de intro -> Listo
  // [Tarea] Crear una funcion para ir a ver la intro, se va conectar con un boton que debamos agregar en el HTML y al hacer click ejecute esta funcion para llevarme a ver la intro -> Listo
  // [Tarea] Obtener del storage si ya vi la intro y dependiendo del resultado dejar pasar o no hacia el home -> Listo
  // [Tarea] En caso de false ( osea no vi la intro aun ), redireccionar con angular router la intro nuevamente -> Listo
  // [Tarea] Organizar toda la pagina del intro con slides dinamicos
  // [Tarea] Minimo 4 slides
  // [Tarea] Utilizar variable de class
  // [Tarea] Untilizar css utilities
  // [Tarea] Agregar un boton que nos lleve al home


  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;
  introSeen = false;

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

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.cargarDatos();
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

    const introSeen = await this.storageService.get('introSeen');
    if (introSeen) {
      this.introSeen = true;
      console.log('El usuario ya vio la intro');
    }
  }

  goToIntro() {
    this.router.navigateByUrl('/intro');
  }

  obtenerDatos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Musica Clasica', 'Rock', 'Jazz']);
      }, 1500);
    });
  }

  async cargarDatos() {
    const data = await this.obtenerDatos();
    console.log('data =>', data);
  }
}
