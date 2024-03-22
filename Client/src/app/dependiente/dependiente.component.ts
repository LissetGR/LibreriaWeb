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

  confirm2(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Está seguro de que quiere eliminar este elemento?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
        }
    });
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
      cantidad:venta.id,
      cliente_id:venta.cliente_id,
    })
  }

  clearData(){
    this.venta.setValue({
      id: '',
      libro_id:'',
      empleado_id:this.empleado_logueado,
      cantidad:'',
      cliente_id:'',
    })
  }
}
