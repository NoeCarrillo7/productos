import { Component } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-producto',
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  //Propiedades
  productos: any;
  producto = new Producto();
  editar = false;

  //Constructor
  constructor(private productoService: ProductoService) {
    this.getProductos();
  }

  //Metodo que hace la peticion al sercice para obtener los libros
  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  //Metodo para agregar un libro desde el formulario
  insertartProducto(){
    this.productoService.agregarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //Metodo para seleccionar un libro de la tabla
  selectProducto(productoSeleccionado: Producto){
    this.producto = productoSeleccionado;
    this.editar = true;
  }

  //Metodo para modificar un libro
  updateProducto(){
    this.productoService.modificarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
    this.editar = false;
  }

  //Metodo para eliminar un libro
  deleteProducto(productoE: Producto){
    this.productoService.eliminarProducto(productoE);
    this.getProductos();
    this.producto = new Producto();
  }

  //Metodo para limpiar formulario
  limpiarFormulario(){
    this.producto = new Producto();
    this.editar = false;
  }
}
