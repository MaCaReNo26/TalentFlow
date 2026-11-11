
import { Injectable } from '@angular/core';

import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../config/firebase.config';
import { Candidato } from '../models/candidato.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  private coleccion = collection(db, 'candidatos');

  async registrarCandidato(candidato: Candidato) {
    const datos = {
      ...candidato,
      creadoEn: serverTimestamp()
    };
    const respuesta = await addDoc(this.coleccion, datos);
    return respuesta.id;
  }

  async obtenerCandidatos(): Promise<Candidato[]> {
    try {
      console.log('Iniciando consulta a Firestore...');
      const resultado = await getDocs(this.coleccion);
      console.log('Documentos encontrados:', resultado.size);

      const candidatos: Candidato[] = resultado.docs.map(documento => {
        const datos = documento.data();
        return {
          id: documento.id,
          ...datos
        } as Candidato;
      });
      console.log('Postulantes recuperados:', candidatos);
      return candidatos;
    } catch (error) {
      console.error('Error en obtenerCandidatos:', error);
      throw error;
    }
  }
}
