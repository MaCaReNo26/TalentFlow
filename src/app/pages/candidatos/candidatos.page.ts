
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonSpinner,
  IonIcon,
  IonButtons,
  IonNote
} from '@ionic/angular';

import { CandidatosService } from '../../services/candidatos.service';
import { Candidato } from '../../models/candidato.model';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.page.html',
  styleUrls: ['./candidatos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonBadge,
    IonSpinner,
    IonIcon,
    IonButtons,
    IonNote
  ]
})

export class CandidatosPage implements OnInit {

  candidatos: Candidato[] = [];
  candidatoSeleccionado: Candidato | null = null;
  cargando = false;
  error = '';
  private primeraCarga = true;

  constructor(
    private candidatosService: CandidatosService,
    private changeDetector: ChangeDetectorRef,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.cargarCandidatos();
  }

  ionViewWillEnter() {
    if (!this.primeraCarga) {
      this.cargarCandidatos();
    }
    this.primeraCarga = false;
  }

  async cargarCandidatos() {
    this.cargando = true;
    this.error = '';
    this.changeDetector.detectChanges();
    try {
      console.log('Consultando postulantes en Firebase...');
      const resultado =
        await this.candidatosService.obtenerCandidatos();
      this.candidatos = [...resultado];
      console.log('Postulantes encontrados:', this.candidatos.length);
      console.log('Datos recibidos:', this.candidatos);
    } catch (error) {
      console.error('Error al consultar candidatos:', error);
      this.error =
        'No se pudieron cargar los postulantes. Verifica tu conexión con Firebase.';
    } finally {
      this.cargando = false;
      this.changeDetector.detectChanges();
      console.log('Carga finalizada. Estado:', this.cargando);
    }
  }

  verDetalle(candidato: Candidato) {
    this.candidatoSeleccionado = candidato;
    this.changeDetector.detectChanges();
  }

  volverListado() {
    this.candidatoSeleccionado = null;
    this.changeDetector.detectChanges();
  }

  obtenerFechaRegistro(candidato: Candidato): Date | null {
    const fecha = candidato.creadoEn;
    if (!fecha) {
      return null;
    }
    if (typeof fecha.toDate === 'function') {
      return fecha.toDate();
    }
    return new Date(fecha);
  }

}
