import { Injectable, inject } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //Metodo para obtener todos los documentos de la coleccion
  getProductos() {
    const productosCollection = collection(this.db, 'productos');
    return collectionData((productosCollection), { idField: 'id' }).pipe(first());
  }

  //Metodo para agregar un documento a la coleccion
  agregarProducto(producto: Producto) {
    const productosCollection = collection(this.db, 'productos');
    const productoData = {
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    };
    addDoc(productosCollection, productoData);
  }

  //Metodo para modificar un documento de la coleccion
  modificarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    updateDoc(documentRef, {
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    })
  }

  //Metodo para eliminar un documento de la coleccion
  eliminarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    deleteDoc(documentRef);
  }
}
