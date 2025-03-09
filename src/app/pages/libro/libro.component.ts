import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { firstValueFrom } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  //Propiedades
  libros: any;
  libro = new Libro();

  //Constructor
  constructor(private libroService: LibroService) {
    this.getLibros();
  }

  //Metodo que hace la peticion al sercice para obtener los libros
  async getLibros(): Promise<void> {
    this.libros = await firstValueFrom(this.libroService.getLibros());
  }

  //Metodo para agregar un libro desde el formulario
  insertartLibro(){
    this.libroService.agregarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //Metodo para seleccionar un libro de la tabla
  selectLibro(libroSeleccionado: Libro){
    this.libro = libroSeleccionado;
  }

  //Metodo para modificar un libro
  updateLibro(){
    this.libroService.modificarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //Metodo para eliminar un libro
  deleteLibro(){
    this.libroService.eliminarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //Metodo para limpiar formulario
  limpiarFormulario(){
    this.libro = new Libro();
  }
}