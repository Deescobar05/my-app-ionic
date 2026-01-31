import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
  // ✅ Variable de clase con slides dinámicos
  slides = [
    {
      title: 'Explora la Música',
      description: 'Descubre géneros musicales de todo el mundo.',
      image: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
    },
    {
      title: 'Rock & Energía',
      description: 'Siente la potencia de las guitarras y la batería.',
      image: 'https://cdn-icons-png.flaticon.com/512/2995/2995101.png',
    },
    {
      title: 'Jazz & Estilo',
      description: 'Improvisación, ritmo y elegancia sonora.',
      image: 'https://cdn-icons-png.flaticon.com/512/3408/3408551.png',
    },
    {
      title: 'Clásica & Armonía',
      description: 'Relájate con melodías atemporales.',
      image: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
    },
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  ngOnInit() {}

  async goBack() {
    await this.storageService.set('introSeen', true);
    this.router.navigateByUrl('menu/home', { replaceUrl: true });
  }
}
