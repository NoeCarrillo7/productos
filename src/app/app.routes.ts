import { Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: 'productos', component: ProductoComponent },
    { path: 'libros', component: LibroComponent },
    { path: 'contactos', component: ContactoComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'about'},
];
