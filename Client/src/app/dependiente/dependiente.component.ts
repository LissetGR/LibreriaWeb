import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Cliente } from '../Interface/cliente';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { venta } from '../Interface/venta';
import { ServicioHttpService } from '../Services/servicio-http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dependiente',
  templateUrl: './dependiente.component.html',
  styleUrls: ['./dependiente.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DependienteComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  sidebarVisible: boolean = false;
  valor:string='';
  cadena:string='';
  ventas:venta[]=[]
  empleado_logueado:string=''


  venta:FormGroup=new FormGroup({
    id: new FormControl('',[Validators.required]),
    libro_id:new FormControl('',[Validators.required]),
    empleado_id:new FormControl('',[Validators.required]),
    cantidad:new FormControl('',[Validators.required, Validators.min(0)]),
    cliente_id:new FormControl('',[Validators.required]),
  });

  constructor( private servicio:ServicioHttpService, private servicioAuth:AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.servicio.getVenta().subscribe(
      (response)=>{
        this.ventas=response
      },
      (error)=>{
          this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos')
      }
    )

    this.servicioAuth.logUser().subscribe(
      (response)=>{
        this.empleado_logueado=response
      },
      (error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error al mostrar su informacion')
      }
    )
  }

  ngOnInit() {
    this.items = [
      { label: 'Registrar Venta', icon: 'pi pi-shopping-cart' },
      { label: 'Clientes', icon: 'pi pi-user' },
      { label: 'Libros', icon: 'pi pi-database' },
      { label: 'Ventas', icon: 'pi pi-dollar' },
    ];
  }

  confirm2(event: Event, venta:number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Está seguro de que quiere eliminar este elemento?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.delete(venta)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Has rechazado', life: 3000});
        }
    });
  }

  public delete(ventaP: number) {
    this.servicio.deleteVenta(ventaP).subscribe(
      (response) => {
        this.ventas.splice(this.ventas.findIndex(venta => venta.id === ventaP), 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Venta eliminada',
          life: 3000,
        });
      },
      (error) => {
        this.show('error', 'Error', 'Ha ocurrido un error');
      }
    );
  }

  clearT(table: Table) {
    table.clear();
  }
  show(severityP: string, summaryP:string, contenido:string) {
    this.messageService.add({ severity: severityP, summary: summaryP, detail: contenido });
}

  clear() {
      this.messageService.clear();
  }

  updateData(venta:venta){
    this.venta.setValue({
      id: venta.id,
      libro_id:venta.libro_id,
      empleado_id:venta.empleado_id,
      cantidad:venta.cantidad,
      cliente_id:venta.cliente_id,
    })
  }

  clearData(){
    this.venta.setValue({
      id: '',
      libro_id:'',
      empleado_id:this.empleado_logueado[0],
      cantidad:'',
      cliente_id:'',
    })
  }

  public modificar() {
    this.servicio.modificarVenta(this.venta.value).subscribe(
      (response) => {
        this.ventas.splice( this.ventas.findIndex(venta => venta.id === this.venta.value.id), 1, response);
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

  public agregarVenta() {
    console.log(this.venta.value)
    this.servicio.postVenta(this.venta.value).subscribe(
      (response) => {
        this.ventas.push(response);
        this.show(
          'success',
          'Éxito',
          'Usted ha agregado el registro exitosamente'
        );
      },
      (error) => {
        this.show('error', 'Error', error);
      }
    );
  }

  public buscarVenta(){
    this.servicio.buscarVentas(this.cadena).subscribe(
      (response)=>{
        this.ventas=response
      },
      (error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos')
      }
    )
  }
}
