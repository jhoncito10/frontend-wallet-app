# Frontend Wallet App

Aplicación frontend desarrollada en Angular 18 para gestionar una wallet digital con un diseño minimalista y responsive.

## Características

- 🔐 **Autenticación**: Registro e inicio de sesión de usuarios
- 💰 **Gestión de Saldo**: Visualización, recarga y deducción de saldo
- 💳 **Pagos**: Sistema de pagos con descripción personalizada
- 📄 **Documentos**: Generación y visualización de documentos
- 📊 **Estadísticas**: Dashboard con métricas de ingresos y gastos
- 📈 **Gráficos**: Visualización de evolución del balance en el tiempo
- 🔄 **Historial Completo**: Lista de todas las transacciones con scroll
- 📱 **Responsive**: Diseño adaptable para escritorio y móvil
- 🎨 **Minimalista**: Interfaz limpia y moderna

## Tecnologías

- Angular 18 (Standalone Components)
- TypeScript 5.4
- RxJS 7.8
- CSS3 (Diseño responsive)

## Requisitos Previos

- Node.js 22.x o superior
- npm 10.x o superior

## Instalación

```bash
# Instalar dependencias
npm install
```

## Configuración

El archivo de configuración se encuentra en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://backend-wallet-app.onrender.com/api',
  fixedToken: 'mi-token-super-secreto-12345'
};
```

**Importante**: Asegúrate de que el `fixedToken` coincida con el configurado en el backend.

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

## Compilación

```bash
# Compilar para producción
npm run build

# Los archivos compilados estarán en la carpeta dist/
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/                      # Componentes de la aplicación
│   │   ├── login/                      # Componente de inicio de sesión
│   │   ├── register/                   # Componente de registro
│   │   ├── dashboard/                  # Dashboard principal
│   │   ├── statistics/                 # Componente de estadísticas y gráficos
│   │   ├── add-balance-modal/          # Modal para añadir saldo
│   │   ├── deduct-balance-modal/       # Modal para realizar pagos
│   │   └── generate-document-modal/    # Modal para generar documentos
│   ├── guards/                         # Guards de autenticación
│   ├── interceptors/                   # Interceptors HTTP
│   ├── models/                         # Interfaces y modelos
│   ├── services/                       # Servicios
│   │   ├── auth.service.ts            # Servicio de autenticación
│   │   ├── transaction.service.ts     # Servicio de transacciones
│   │   ├── document.service.ts        # Servicio de documentos
│   │   └── dashboard.service.ts       # Servicio del dashboard
│   ├── app.component.ts                # Componente raíz
│   ├── app.config.ts                   # Configuración de la aplicación
│   └── app.routes.ts                   # Rutas de la aplicación
├── environments/                       # Configuración de entornos
├── index.html                         # HTML principal
├── main.ts                            # Punto de entrada
└── styles.css                         # Estilos globales
```

## Funcionalidades

### Autenticación

- **Registro**: Los usuarios pueden crear una cuenta con nombre, email y contraseña
- **Login**: Acceso con email y contraseña
- **Protección de rutas**: Solo usuarios autenticados pueden acceder al dashboard

### Dashboard

El dashboard está organizado en un layout de dos columnas:

#### Columna Izquierda
- **Saldo Disponible**: Muestra el saldo actual con botones de acción
  - Botón "Añadir Saldo" (morado)
  - Botón "Pagar" (rojo)
- **Documentos**: Lista de documentos generados con:
  - Nombre del documento
  - Fecha de creación
  - Estado (Pendiente/Generado/Fallido)
  - Botón para generar nuevos documentos

#### Columna Derecha
- **Estadísticas**: Métricas visuales
  - Total de ingresos (tarjeta verde)
  - Total de gastos (tarjeta roja)
  - Gráfico de barras de evolución del balance
- **Movimientos Recientes**: Lista completa de transacciones
  - Scroll vertical para ver todas las transacciones
  - Indicadores visuales de tipo (↑ ingreso / ↓ gasto)
  - Descripción, fecha y monto de cada movimiento

### Gestión de Saldo

- **Añadir Saldo**: Modal con formulario para recargar fondos
  - Validación de monto (€1 - €10,000)
  - Actualización automática del balance
  
- **Realizar Pagos**: Modal con formulario para deducir saldo
  - Campo de monto (€1 - €10,000)
  - Campo de descripción obligatoria
  - Actualización automática del balance y transacciones

### Estadísticas

- **Tarjetas de Resumen**:
  - Total de ingresos acumulados
  - Total de gastos acumulados
  - Iconos y colores diferenciados

- **Gráfico de Evolución**:
  - Gráfico de barras interactivo
  - Muestra los últimos 10 puntos de balance
  - Scroll horizontal si hay muchos datos
  - Valores y fechas claramente visibles
  - Efecto hover en las barras

### Seguridad

- Token fijo enviado en todas las peticiones HTTP mediante interceptor
- JWT token para autenticación de usuarios
- Guard para proteger rutas privadas
- Almacenamiento seguro en localStorage

## API Endpoints

La aplicación consume los siguientes endpoints del backend:

### Autenticación
- `POST /api/auth/register` - Registro de usuario nuevo
- `POST /api/auth/login` - Inicio de sesión

### Transacciones
- `GET /api/transactions` - Obtener todas las transacciones del usuario
- `GET /api/transactions/balance` - Obtener saldo actual
- `POST /api/transactions/add-balance` - Añadir saldo a la cuenta
- `POST /api/transactions/deduct-balance` - Deducir saldo (realizar pago)

### Documentos
- `GET /api/documents` - Listar todos los documentos
- `POST /api/documents/generate` - Generar nuevo documento

### Dashboard
- `GET /api/dashboard` - Datos agregados del dashboard

## Diseño Responsive

La aplicación está optimizada para:

- 📱 **Móvil**: < 640px
- 📱 **Tablet**: 640px - 1024px
- 💻 **Desktop**: > 1024px

## Paleta de Colores

- **Primary**: Gradiente morado (#667eea - #764ba2) - Botones principales, gráficos
- **Danger**: Gradiente rojo (#e53e3e - #c53030) - Botón pagar, gastos
- **Success**: Verde azulado (#38b2ac) - Ingresos, estados exitosos
- **Warning**: Amarillo (#f39c12) - Estados pendientes
- **Background**: Gris claro (#f7fafc) - Fondo general
- **Text**: Gris oscuro (#1a202c) - Texto principal
- **Border**: Gris suave (#e2e8f0) - Bordes y divisores

## Características Técnicas

### Interceptores
- **authInterceptor**: Agrega automáticamente el header `Authorization: Bearer ${fixedToken}` a todas las peticiones HTTP

### Guards
- **authGuard**: Protege las rutas del dashboard, redirige a login si no está autenticado

### Componentes Standalone
- Todos los componentes utilizan la arquitectura standalone de Angular 18
- No requiere módulos NgModule tradicionales

### Gestión de Estado
- Uso de BehaviorSubject para el usuario actual
- Sincronización automática entre localStorage y el estado de la aplicación
- Actualización reactiva del balance tras cada operación

## Capturas de Pantalla

### Dashboard Principal
- Vista completa con saldo, estadísticas, movimientos y documentos
- Diseño en dos columnas optimizado para desktop
- Gráficos interactivos con evolución del balance

### Diseño Responsive
- Adaptación automática a dispositivos móviles
- Layout vertical en pantallas pequeñas
- Todos los elementos accesibles y usables en mobile

## Mejores Prácticas

### Código
- TypeScript con tipado estricto
- Componentes reutilizables y modulares
- Separación de responsabilidades (servicios, componentes, modelos)
- Manejo de errores consistente

### UX/UI
- Feedback visual inmediato en todas las acciones
- Validación de formularios en tiempo real
- Estados de carga claros
- Mensajes de error descriptivos
- Animaciones suaves y transiciones

### Rendimiento
- Componentes standalone para mejor tree-shaking
- Lazy loading de rutas
- Optimización de imágenes y assets
- Uso eficiente de RxJS operators

## Roadmap Futuro

- [ ] Filtros avanzados para transacciones
- [ ] Exportación de datos a PDF/Excel
- [ ] Notificaciones push
- [ ] Dark mode
- [ ] Múltiples idiomas (i18n)
- [ ] Dashboard personalizable

## Soporte

Para problemas o preguntas, por favor contacta al equipo de desarrollo.

## Licencia

ISC
