import { Injectable, inject } from '@angular/core';
import { Libro } from '../models/libro';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //Metodo para obtener todos los documentos de la coleccion
  getLibros() {
    const librosCollection = collection(this.db, 'libros');
    return collectionData((librosCollection), { idField: 'id' }).pipe(first());
  }

  //Metodo para agregar un documento a la coleccion
  agregarLibro(libro: Libro) {
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anyoPublicacion: libro.anyoPublicacion
    };
    addDoc(librosCollection, libroData);
  }

  //Metodo para modificar un documento de la coleccion
  modificarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anyoPublicacion: libro.anyoPublicacion
    })
  }

  //Metodo para eliminar un documento de la coleccion
  eliminarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    deleteDoc(documentRef);
  }
}
