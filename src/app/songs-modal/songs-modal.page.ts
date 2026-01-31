import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SongsModalPage implements OnInit {
  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private storageService: StorageService,
  ) {}

  songs: any;
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  async ngOnInit() {
    this.songs = this.navParams.data['songs'];
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  closeModal() {
    this.modal.dismiss();
  }

  async selectSong(id: string) {
    await this.modal.dismiss(id);
  }
}
