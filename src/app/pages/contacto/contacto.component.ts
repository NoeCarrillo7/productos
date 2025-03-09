import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../services/contacto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactos: any;
  contacto = new Contacto();
  editar = false;

  constructor(private contactoService : ContactoService) {
    this.getContactos();
  }

  async getContactos(): Promise<void> {
    this.contactos = await firstValueFrom(this.contactoService.getContactos());
  }

  insertartContacto(){
    if (this.contacto.favorito === undefined) {
      this.contacto.favorito = false;
    }
    this.contactoService.agregarContacto(this.contacto);
    this.getContactos();
    this.contacto = new Contacto();
  }
  

  //Metodo para seleccionar un libro de la tabla
  selectContacto(contactoSeleccionado: Contacto){
    this.contacto = contactoSeleccionado;
    this.editar = true;
  }

  //Metodo para modificar un libro
  updateContacto(){
    this.contactoService.modificarContacto(this.contacto);
    this.getContactos();
    this.contacto = new Contacto();
    this.editar = false;
  }

  //Metodo para eliminar un libro
  deleteContacto(contactoE: Contacto){
    this.contactoService.eliminarContacto(contactoE);
    this.getContactos();
    this.contacto = new Contacto();
  }

  //Metodo para limpiar formulario
  limpiarFormulario(){
    this.contacto = new Contacto();
    this.editar = false;
  }
}
