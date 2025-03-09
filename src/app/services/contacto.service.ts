import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  getContactos() {
    const contactosCollection = collection(this.db, 'contactos');
    return collectionData((contactosCollection), { idField: 'id' }).pipe(first());
  }

  agregarContacto(contacto: Contacto) {
    const contactosCollection = collection(this.db, 'contactos');
    const contactoData = {
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      favorito: contacto.favorito,
    };
    addDoc(contactosCollection, contactoData);
  }

  modificarContacto(contacto: Contacto) {
    const documentRef = doc(this.db, 'contactos', contacto.id);
    updateDoc(documentRef, {
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      favorito: contacto.favorito,
    })
  }

  eliminarContacto(contacto: Contacto) {
    const documentRef = doc(this.db, 'contactos', contacto.id);
    deleteDoc(documentRef);
  }
}
