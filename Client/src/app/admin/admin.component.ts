import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cliente } from '../Interface/cliente';
import { Libro } from '../Interface/libros';
import { Usuario } from '../Interface/usuario';
import { ServicioHttpService } from '../Services/servicio-http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AdminComponent {
  items: MenuItem[] = [
    { label: 'Libros', icon: 'pi pi-database' },
    { label: 'Usuarios', icon: 'pi pi-users' },
  ];
  rol: string = '';
  valor: string = '';
  metodo: string = '';
  activeItem: MenuItem = this.items[0];
  sidebarVisible: boolean = false;
  busqueda: string = '';
  currentEventType = '';
  usuarios: Usuario[] = [];
  libros: Libro[] = [];

  libro: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tema: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ISBN: new FormControl('', [Validators.required, Validators.minLength(2)]),
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    precio: new FormControl('', [Validators.required, Validators.min(1)]),
    editorial: new FormControl('', [ Validators.required,Validators.minLength(2)]),
    tipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    descripcion: new FormControl('', [Validators.required,Validators.minLength(2)]),
    url: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  user: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,30})'),
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,30})'),
    ]),
  });

  constructor(
    private authService: AuthService,
    private servicio: ServicioHttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.servicio.getLibros().subscribe(
      (response) => {
        this.libros = response;
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );

    this.authService.getUser().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );
  }

  ngOnInit() {}

  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Está seguro de que quiere eliminar este elemento?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        if(this.currentEventType=='book'){
           this.delete(id);
        }else{
           this.deleteUser(id);
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazada',
          detail: 'Usted ha rechazado',
          life: 3000,
        });
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }

  show(severityP: string, summaryP: string, contenido: string) {
    this.messageService.add({
      severity: severityP,
      summary: summaryP,
      detail: contenido,
    });
  }

  public crearLibro() {
    this.servicio.postLibro(this.libro.value).subscribe(
      (response) => {
        this.libros.push(response);
        this.show(
          'success',
          'Éxito',
          'Usted ha agregado el registro exitosamente'
        );
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );
  }

  public modificarLibro() {
    this.servicio.modificarLibro(this.libro.value).subscribe(
      (response) => {
        this.libros.splice( this.libros.findIndex(libro => libro.id === this.libro.value.id), 1, response);
        this.show(
          'success',
          'Éxito',
          'Usted ha modificado el registro exitosamente'
        );
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );
  }

  public UpdateData(libro: Libro) {
    this.libro.setValue({
      id: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      tema: libro.tema,
      ISBN: libro.ISBN,
      cantidad: libro.cantidad,
      precio: libro.precio,
      editorial: libro.editorial,
      tipo: libro.tipo,
      descripcion: libro.descripcion,
      url: libro.url,
    });
  }

  public UpdateDataUser(usuario:Usuario){
     this.user.patchValue({
      id:usuario.id,
      name:usuario.name,
      // password:usuario.password,
      // password_confirmation:usuario.password
     })
  }

  public clearDataUser(){
    this.user.setValue({
      name:'',
      password:'',
      password_confirmation: ''
     })
  }
  public clearData() {
    this.libro.setValue({
      id: '',
      titulo: '',
      autor: '',
      tema: '',
      ISBN: '',
      cantidad: '',
      precio: '',
      editorial: '',
      tipo: '',
      descripcion: '',
      url: 'libro.png',
    });
  }

  public delete(libroP: number) {
    this.servicio.deleteLibro(libroP).subscribe(
      (response) => {
        this.libros.splice(this.libros.findIndex(libro => libro.id === libroP), 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Libro eliminado',
          life: 3000,
        });
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error');
      }
    );
  }

  buscarLibros() {
    this.servicio.getBusqueda(this.busqueda).subscribe(
      (response) => {
        this.libros = response;
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );
  }

  public limpiarBusqueda() {
    this.servicio.getLibros().subscribe(
      (response) => {
        this.libros = response;
        this.busqueda = '';
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
      }
    );
  }

  public crearUser() {
    if (this.user.valid && this.passwordMatchValidator()) {
      this.authService.register(this.user.value).subscribe(
        (response) => {
          this.usuarios.push(response.user);
          this.show('success', 'Éxito', 'Usted se ha registrado exitosamente');
        },
        (error) => {
          this.show('error', 'Error', 'Ha ocurrido un error con sus datos');
        }
      );
    } else {
      this.show('error', 'Error', 'Usuario no válido');
    }
  }

  passwordMatchValidator() {
    const password = this.user.get('password')?.value;
    const confirmPassword = this.user.get('password_confirmation')?.value;

    return this.user.get('password')?.value ==
      this.user.get('password_confirmation')?.value
      ? true
      : false;
  }

  public deleteUser(userid:number){
     this.authService.delete(userid).subscribe(
      (response) => {
        this.usuarios.splice(this.usuarios.findIndex(usuario => usuario.id === userid), 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Usuario eliminado',
          life: 3000,
        });
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error');
      }
     )
  }

  public modificarUser(){
      this.authService.modificarUser(this.user.value).subscribe(
        (response) => {
          this.usuarios.splice( this.usuarios.findIndex(usuario => usuario.id === this.user.value.id), 1, response);
          this.show(
            'success',
            'Éxito',
            'Usted ha modificado el registro exitosamente'
          );
        },
        (error) => {
          this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos');
        }
      );
    }
}
