import * as DataArtists from './artistis.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor() {}

  urlServer = 'https://music.fly.dev';

  async getTracks() {
    const response = await fetch(this.urlServer + '/tracks');
    return await response.json();
  }

  async getAlbums() {
    const response = await fetch(this.urlServer + '/albums');
    return await response.json();
  }

  async getSongByAlbum(id: string) {
    const response = await fetch(this.urlServer + '/tracks/album/' + id)
    return await response.json()
  }

  async getArtists() {
    const response = await fetch(this.urlServer + '/artists');
    return await response.json();
  }

  async getTracksByArtists(id: string) {
    const response = await fetch(this.urlServer + '/tracks/artist/' + id)
    return await response.json()
  }

  getLocalArtists() {
    return DataArtists;
  }
}
