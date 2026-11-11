
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { ToastController } from '@ionic/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonSegment,
  IonSegmentButton,
  IonCheckbox,
  IonTextarea,
  IonDatetime,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonButtons,
  IonSpinner
} from '@ionic/angular';

import { CandidatosService } from '../../services/candidatos.service';
import { Candidato } from '../../models/candidato.model';

function validarHabilidades(
  control: AbstractControl
): ValidationErrors | null {

  const habilidades = control.value;
  return Array.isArray(habilidades) && habilidades.length > 0
    ? null
    : { sinHabilidades: true };
}

function validarFechaNacimiento(
  control: AbstractControl
): ValidationErrors | null {

  if (!control.value) {
    return null;
  }
  const hoy = new Date();
  const fechaActual =
    `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  return control.value <= fechaActual
    ? null
    : { fechaFutura: true };
}

function validarFechaDisponibilidad(
  control: AbstractControl
): ValidationErrors | null {

  if (!control.value) {
    return null;
  }
  const hoy = new Date();
  const fechaActual =
    `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  return control.value >= fechaActual
    ? null
    : { fechaPasada: true };
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonSegment,
    IonSegmentButton,
    IonCheckbox,
    IonTextarea,
    IonDatetime,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonNote,
    IonButtons,
    IonSpinner
  ]
})

export class RegistroPage implements OnInit {

  formulario!: FormGroup;
  cargando = false;
  habilidadesDisponibles: string[] = [
    'Angular',
    'Ionic',
    'JavaScript',
    'Python',
    'SQL',
    'Git',
    'Firebase'
  ];

  constructor(
    private fb: FormBuilder,
    private candidatosService: CandidatosService,
    private toastController: ToastController,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nombres: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{7,15}$/)
      ]],
      fechaNacimiento: ['', [
        Validators.required,
        validarFechaNacimiento
      ]],
      cargo: ['', Validators.required],
      nivelAcademico: ['', Validators.required],
      experienciaAnios: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(50),
        Validators.pattern(/^\d+$/)
      ]],
      modalidad: ['', Validators.required],
      habilidades: [[], validarHabilidades],
      fechaDisponibilidad: ['', [
        Validators.required,
        validarFechaDisponibilidad
      ]],
      aspiracionSalarial: ['', [
        Validators.required,
        Validators.min(0.01)
      ]],
      resumen: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      consentimiento: [false, Validators.requiredTrue]
    });
  }

  actualizarFecha(campo: string, event: any) {
    const fecha = event.detail.value;
    this.formulario.get(campo)?.setValue(
      fecha ? fecha.substring(0, 10) : ''
    );
    this.formulario.get(campo)?.markAsTouched();
    this.formulario.get(campo)?.updateValueAndValidity();
  }

  cambiarHabilidad(habilidad: string, event: any) {
    const seleccionadas: string[] =
      this.formulario.get('habilidades')?.value || [];
    if (event.detail.checked) {
      if (!seleccionadas.includes(habilidad)) {
        seleccionadas.push(habilidad);
      }
    } else {
      const indice = seleccionadas.indexOf(habilidad);
      if (indice !== -1) {
        seleccionadas.splice(indice, 1);
      }
    }
    this.formulario.get('habilidades')?.setValue([
      ...seleccionadas
    ]);
    this.formulario.get('habilidades')?.markAsTouched();
    this.formulario.get('habilidades')?.updateValueAndValidity();
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async guardarCandidato() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      await this.mostrarMensaje(
        'Por favor, completa correctamente todos los campos.',
        'warning'
      );
      return;
    }
    try {
      this.cargando = true;
      const candidato: Candidato =
        this.formulario.getRawValue();
      await this.candidatosService.registrarCandidato(candidato);
      await this.mostrarMensaje(
        '¡Postulante registrado correctamente!',
        'success'
      );
      this.formulario.reset({
        nombres: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        cargo: '',
        nivelAcademico: '',
        experienciaAnios: 0,
        modalidad: '',
        habilidades: [],
        fechaDisponibilidad: '',
        aspiracionSalarial: '',
        resumen: '',
        consentimiento: false
      });
    } catch (error) {
      console.error('Error al registrar candidato:', error);
      await this.mostrarMensaje(
        'No se pudo registrar el postulante. Inténtalo nuevamente.',
        'danger'
      );
    } finally {
      this.cargando = false;
    }
  }
}
