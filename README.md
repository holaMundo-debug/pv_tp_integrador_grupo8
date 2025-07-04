# pv_tp_integrador_grupo8

# Integrantes del Grupo:
* Carhuavilca Velasquez, Veronica Patricia - "holaMundo-debug"
* Gaspar, Facundo Ezequiel - "Facundo897"
* Gudiño, Lara Emilia - "LaraGudino77"
* Toconás, Paola Milagros Zoé - "paola-zoe"
* Valencia, Victoria Valentina - "victoriaavalee"

# 🛍️ TP Integrador - Tienda React

Proyecto integrador grupal desarrollado para la materia Programación Visual.


## 🚀 Funcionalidades principales

- **Dependencias**

  Antes de poder probar nuestro proyecto, revisá/instalá las dependencias:

  o Asegurate de estar en la carpeta `trabajo-integrador`

  o Luego, instalá las siguientes dependencias ejecutando en la terminal:

    - `npm install`
    - `npm install react-router-dom`
    - `npm install redux`
    - `npm install react-redux`
    - `npm install @reduxjs/toolkit`
    - `npm install bootstrap`
    - `npm install react-bootstrap`

  o Finalmente, para correr la aplicación:

    - `npm run dev`

-  **Autenticación de usuario**
  
   - Sistema de registro y login personalizado con formularios diseñados en Bootstrap
   - Validación de datos en tiempo real: correo único, contraseñas coincidentes, campos requeridos
   -  Al iniciar sesión:
 
                         - Se guarda la sesión en localStorage

                         - Se actualiza el estado global con Redux

                         - Se habilitan las rutas protegidas
  


-  **Rutas protegidas con React Router + Redux**
  
     - Implementación de componente <PrivateRoute /> para proteger el acceso a vistas sensibles
     - Solo los usuarios logueados pueden acceder a Home, Favoritos, Crear producto, Editar y Cuenta
     - Redirección automática al Login si no hay sesión activa

-  **Página de Inicio (`Home`)**
    - Cards de productos con imagen, nombre, precio, descripción, categoría
    - Botón “Ver más detalles” y  para marcar como favorito
    - Búsqueda en tiempo real y ordenamiento por precio

- **Favoritos**
  - Sistema de favoritos usando **Redux** 
  - Página específica para mostrar solo productos marcados

- **Detalle del producto**
  - Información ampliada del producto (categoría, stock, etc.)
  - Botón para desmarcar de favoritos
 
- **Crear y editar producto**
  - Formulario reutilizable (ProductForm) para alta y edición de productos
  - Vista /create para agregar un nuevo producto desde cero
  - Vista /editar/:id para modificar un producto ya existente con campos precargados
  - Ingreso de título, precio, descripción, categoría y selección visual de imagen
  - Actualización dinámica del estado global mediante Redux
  - Confirmación visual mediante toast al completar la acción
 
- **Consumo de API externa**
  - Productos traídos mediante `fetch()` desde [FakeStoreAPI](https://fakestoreapi.com/)
  - Se almacenan en el estado global para compartir entre vistas

---

## 🧰 Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux](https://redux.js.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- React Bootstrap 
- Context API
- `fetch()` — para consumo de API externa
- [React Router DOM](https://reactrouter.com/)
- Git & GitHub — trabajo colaborativo con ramas y PRs



