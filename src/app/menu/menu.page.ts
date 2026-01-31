import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MenuPage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  async cambiarTema() {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    await this.storageService.set('theme', this.colorActual);

    // recarga la app visualmente
    window.location.reload();
  }

  goToIntro() {
    this.menu.close();
    this.router.navigate(['/intro']);
  }

  async logout() {
    if (confirm('¿Deseas cerrar sesión?')) {
      await this.authService.logout();
      await this.menu.close();
      this.navCtrl.navigateRoot('/login');
    }
  }
}
