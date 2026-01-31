import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { MusicService } from '../services/music.service';
import { CommonModule } from '@angular/common';
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
  // [Tarea] Organizar toda la pagina del intro con slides dinamicos -> Listo
  // [Tarea] Minimo 4 slides -> Listo
  // [Tarea] Utilizar variable de class -> Listo
  // [Tarea] Untilizar css utilities -> Listo
  // [Tarea] Agregar un boton que nos lleve al home -> Listo
  // [Tarea] Agregarle style generales al componente de login -> Listo
  // [Tarea] Agregarle style para mostrar mensaje de error -> Listo
  // [Tarea] Mostrar mensaje de error en la validacion del campo de password -> Listo
  // [Tarea] Crear un nuevo Guard para cuando intente entrar al home, validar si estoy logueada y si no redireccionar a login -> Listo
  // [Tarea] Validar si el login es exitoso guardar en el storage "login:true" -> Listo
  // [Tarea] Crear pagina de registro -> Listo
  // [Tarea] Crear un formulario reactivo(nombre, apellido, email, contraseña) -> Listo
  // [Tarea] Realizar validaciones, mensajes de error, habilitar el boton de registro solo si todo el formulario esta correcto -> Listo
  // [Tarea] Crear un servicio que reciba los datos de registro -> Listo
  // [Tarea] Si el servivio devuelve accept, navegar hacia login y guarda los datos de registro en el storage -> Listo
  // [Tarea] Si no que muestre el mensaje de error, si el registro no fue exitoso -> Listo
  // [Tarea] Crear un boto que pueda volver a login -> Listo
  // [Tarea] En el login, crear un boton o link que me lleve a la pagina de registro -> Listo
  // [Tarea] Agregar "Cerrar sesion" debe de redireccionar al login, borrara del storage que ya estoy logueado -> Listo
  // [Tarea] Crear un servicio para obtener los artistas desde el servidor api -> Listo
  // [Tarea] Crear un servicio para obtener las canciones por artista /track/artists/:id -> Listo

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
  artists: any;
  tracks: any;
  albums: any;
  currentSong: any = {};
  localArtists: any;
  song: any = {
    name: '',
    preview_url: '',
    playing: false,
  };
  newTime: any;

  constructor(
    private storageService: StorageService,
    private musicService: MusicService,
    private modal: ModalController,
  ) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.loadTracks();
    this.loadAlbums();
    this.loadArtists();
  }

  // Consultamos los artistas
  async loadArtists() {
    this.musicService.getArtists().then((artists) => {
      this.artists = artists;
      console.log('artists:::', artists);
    });
  }

  // Consultamos las canciones
  async loadTracks() {
    this.musicService.getTracks().then((tracks) => {
      this.tracks = tracks;
      console.log('track:::', tracks);
    });
  }

  // Consultamos los albunes
  async loadAlbums() {
    this.musicService.getAlbums().then((albums) => {
      this.albums = albums;
      console.log('albums:::', albums);
    });
  }

  // Consultamos las canciones por albun
  async showSongs(id: string) {
    const songs = await this.musicService.getSongByAlbum(id);
    const modal = await this.modal.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        console.log('Cancion-resivida', res.data);
        this.song = res.data;
      }
    });
    modal.present();
  }

  // Consultamos las canciones por artista
  async showSongsByArists(id: string) {
    const songsByArtist = await this.musicService.getTracksByArtists(id);
    const modal = await this.modal.create({
      component: SongsModalPage,
      componentProps: {
        songs: songsByArtist,
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        console.log('Cancion-resivida', res.data);
        this.song = res.data;
      }
    });
    modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime =
        (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minute = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minute}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }

    return this.currentSong.duration - this.currentSong.currentTime;
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

  getLocalArtists() {
    this.localArtists = this.musicService.getLocalArtists();
  }
}
