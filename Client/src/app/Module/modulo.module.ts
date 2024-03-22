import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [],
  exports:[
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    SplitterModule,
    DataViewModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    TabMenuModule,
    TableModule,
    SidebarModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    MessageModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    InputNumberModule,
    RadioButtonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextareaModule 
  ],
  imports: [
    CommonModule,
    DataViewModule,
  ]
})
export class ModuloModule { }
