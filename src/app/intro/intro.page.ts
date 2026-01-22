import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class IntroPage implements OnInit {
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  ngOnInit() {}

  async goBack() {
    await this.storageService.set('introSeen', true);
    console.log('Intro vista guardada en storage');

    this.router.navigateByUrl('/home');
  }
}
