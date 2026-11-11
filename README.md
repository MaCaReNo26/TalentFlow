# TalentFlow S.A. - Registro e Inspección de Postulantes

Aplicación móvil híbrida desarrollada con **Ionic Framework (Angular Standalone Components)** y **Firebase Cloud Firestore**, diseñada para la empresa ficticia **TalentFlow S.A.**. El sistema permite digitalizar, capturar de forma estructurada y consultar en tiempo real las hojas de vida de candidatos a puestos de trabajo, reemplazando el flujo ineficiente de recepción de postulaciones mediante correos electrónicos.

## Características principales

- **Caso empresarial:** Digitalización del proceso de selección de personal para el área de Talento Humano.
- **Formulario digital de postulación:** Registro estructurado de información personal, académica, profesional y habilidades, sin requerir la carga de archivos PDF ni autenticación previa (prototipo MVP).
- **Integración con Firebase Firestore:** Almacenamiento de postulaciones y recuperación dinámica de información para su consulta.
- **Modo oscuro y claro:** Soporte para alternar entre ambos temas visuales en toda la aplicación.
- **Filtros y consultas:** Visualización de candidatos registrados, conteo de postulaciones y consulta detallada de cada hoja de vida digital.

## Modelo de datos (Firestore)

Cada postulación se almacena como un documento dentro de la colección `candidatos` de Firebase Firestore, utilizando la siguiente estructura:

```json
{
  "nombres": "Alex Suarez",
  "correo": "suarezalex833@gmail.com",
  "telefono": "0979204047",
  "fechaNacimiento": "2002-12-26",
  "cargo": "Soporte TI",
  "nivelAcademico": "Tecnología",
  "experiencia": "0 años",
  "modalidad": "Remota",
  "habilidades": [
    "Angular",
    "Ionic",
    "JavaScript",
    "Python",
    "SQL",
    "Git",
    "Firebase"
  ],
  "fechaInicio": "2026-11-13",
  "aspiracionSalaria": "$1200",
  "resumen": "El mejor chambeador que podrían tener",
  "consentimiento": true,
  "fechaRegistro": "11/11/2026 14:58"
}
```

## Tecnologías utilizadas

| Tecnología | Descripción |
|---|---|
| Ionic Framework | Desarrollo de la interfaz móvil híbrida. |
| Angular | Arquitectura basada en Standalone Components. |
| TypeScript | Lenguaje principal de desarrollo. |
| HTML5 | Estructura de las interfaces. |
| SCSS | Diseño y estilos de la aplicación. |
| Firebase Cloud Firestore | Almacenamiento y consulta de postulaciones. |
| Capacitor | Integración y compilación para Android. |

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/MaCaReNo26/TalentFlow.git
cd talentflow
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Crear un proyecto en Firebase Console y habilitar Cloud Firestore.

Configurar las credenciales en el archivo `src/app/config/firebase.config.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO_ID",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

### 4. Ejecutar en entorno de desarrollo

```bash
ionic serve
```

### 5. Compilar para Android

```bash
ionic build
npx cap sync android
npx cap open android
```

## Evidencias de funcionamiento

### Icono y pantalla de inicio

<p align="center">
  <img src="https://github.com/user-attachments/assets/506340e2-f9bd-46a0-b183-3aa59b09a805" width="260" alt="Icono y pantalla de inicio de TalentFlow"/>
</p>

### Formulario de postulación

<p align="center">
  <img src="https://github.com/user-attachments/assets/52299944-2999-477c-a5c1-cfee8fbd3ced" width="260" alt="Formulario de datos personales"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/7331c84e-c469-4c36-8211-16b5ae65e422" width="260" alt="Formulario de postulación"/>
</p>

### Listado de postulantes registrados

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b8a33ae-671e-42bd-8cfd-4d31aee21aad" width="260" alt="Listado de postulantes registrados"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/661cec73-6cc2-4c0c-901f-caa0284da06e" width="260" alt="Resumen y consentimiento"/>
</p>

### Hoja de vida digital

<p align="center">
  <img src="https://github.com/user-attachments/assets/766e90b0-6cf3-4dff-b874-662fac040910" width="260" alt="Hoja de vida digital parte 1"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/2c6c020d-6326-42ca-a027-d0745c0755b7" width="260" alt="Hoja de vida digital parte 2"/>
</p>

---

**By Alex Suárez** 
