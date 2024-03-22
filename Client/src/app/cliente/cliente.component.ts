import { Component } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Libro } from '../Interface/libros';
import { ServicioHttpService } from '../Services/servicio-http.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  // buscador

  items: any[] = [];
  selectedItem: any;


  // Productos

  public layout: 'list' | 'grid' = 'list';
  recomendados:Libro[]=[]
  products!: Libro[];

  constructor(private servicio:ServicioHttpService,private messageService: MessageService){

    this.servicio.getLibros().subscribe(
      (response)=>{
        this.products=response
      },
      (error)=>{
          this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos')
      })


      this.servicio.getRecomendados().subscribe(
        (response)=>{
          this.recomendados=response
        },
        (error)=>{
          this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos')
        }
      )
  }

  show(severityP:string, messageP:string, summaryP:string) {
    this.messageService.add({ key:'myKey', severity: severityP, summary: summaryP, detail: messageP });
  }

  clear() {
      this.messageService.clear();
  }

   buscarLibros(){
    this.servicio.getBusqueda(this.selectedItem).subscribe(
      (response)=>{
        this.products=response
      },
      (error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error al cargar los datos')
      }
    )
   }
  // getSeverity (product: Libro) {
  //   switch (product.inventoryStatus) {
  //       case 'INSTOCK':
  //           return 'success';

  //       case 'LOWSTOCK':
  //           return 'warning';

  //       case 'OUTOFSTOCK':
  //           return 'danger';

  //       default:
  //           return null;
  //   }
  // }
}
