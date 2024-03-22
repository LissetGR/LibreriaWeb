import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { ServicioHttpService } from '../Services/servicio-http.service';
import { AuthService } from '../Services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login:boolean=true

  user:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,30})')]),
    password_confirmation: new FormControl('', [Validators.required,Validators.minLength(8),Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,30})')])
  });

  // usuario:FormGroup={
  //   id:'',
  //   name:'',
  //   password:'',
  //   created_at:new Date(),
  //   updated_at:new Date()
  // }

  constructor(private formBuilder: FormBuilder, private servicio:ServicioHttpService, private authService:AuthService, private messageService:MessageService ) {}

  ngOnInit(): void {

  }



  passwordMatchValidator() {

    const password = this.user.get('password')?.value;
    const confirmPassword = this.user.get('password_confirmation')?.value;

    return this.user.get('password')?.value == this.user.get('password_confirmation')?.value
       ? true
       : false;
   }


  public logear(){
    this.authService.login(this.user.value).subscribe(
      (response)=>{
        this.show('success', 'Éxito', 'Usted se ha logeado exitosamente')
      },(error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error con sus datos')
      }
    )
  }

  public registrarse(){
    if(this.user.valid&&this.passwordMatchValidator()){
      this.authService.register(this.user.value).subscribe(
        (response)=>{
          this.show('success', 'Éxito', 'Usted se ha registrado exitosamente')
        },(error)=>{
          this.show('error', 'Error', 'Ha ocurrido un error con sus datos')
        }
      )
    }else{
      this.show('error', 'Error', 'Usuario no válido')
    }
  }


  show(severityP: string, summaryP:string, contenido:string) {
    this.messageService.add({ severity: severityP, summary: summaryP, detail: contenido });
  }


}
