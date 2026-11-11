
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  esOscuro = true;

  async inicializarTema() {
    try {
      const { value } = await Preferences.get({
        key: 'temaTalentFlow'
      });
      this.esOscuro = value === 'light' ? false : true;
      this.aplicarTema();
    } catch (error) {
      console.error('Error al cargar el tema:', error);
      this.esOscuro = true;
      this.aplicarTema();
    }
  }

  async alternarTema() {
    this.esOscuro = !this.esOscuro;
    this.aplicarTema();
    try {
      await Preferences.set({
        key: 'temaTalentFlow',
        value: this.esOscuro ? 'dark' : 'light'
      });
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  }

  private aplicarTema() {
    document.body.classList.toggle('dark', this.esOscuro);
    document.body.classList.toggle(
      'ion-palette-dark',
      this.esOscuro
    );
  }
}
