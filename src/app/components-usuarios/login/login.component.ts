import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {SeguridadService} from '../../services/seguridad.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
// import {environment} from "../../../environments/environment"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: FormGroup;
  recup: FormGroup;
  error: boolean = false;
  displayRecuperacion='none';
  displayusuarios='none';
  usuarios: any;
  constructor(private usuarioService:UsuarioService,private router:Router,private seguridadService:SeguridadService) { 
    this.usuario=new FormGroup(
    {
      'nombreusuario': new FormControl("",[Validators.required]),
      'contra': new FormControl("",[Validators.required])   
  });
  this.recup=new FormGroup(
    {
      'email': new FormControl("",[Validators.required])
  });
 }

  ngOnInit(): void {
  }

  IniciarSesion(){
    
    if(this.usuario.valid==true){
      // this.usuarioService.crearSession().subscribe(res=>{
      //   alert(`entra`);
      // })
      this.usuarioService.login(this.usuario.value).subscribe(res=>{
        if(res.iidusuario==0){
          // error
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Credenciales invalidas!',
            showConfirmButton: false,
            timer: 3000
        })
          this.error=true;
        }else{
          // bien
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Bienvenido a ASGARD!',
            showConfirmButton: false,
            timer: 3000
        })
          sessionStorage.setItem("nombre",res.nombreusuario);
          sessionStorage.setItem("idUser",res.iidusuario);
          sessionStorage.setItem("empleado",res.iidEmpleado);
          sessionStorage.setItem("tipo",res.iidTipousuario);          
          this.error=false;
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),"Inició sesión en el sistema").subscribe();
          window.location.href = "/";
          // this.router.navigate(["/"]);

        }
      });
    }
  }
  ValidarCorreo(){
    let email=this.recup.controls["email"].value;
    // alert(email);
     this.seguridadService.validarCorreo(email).subscribe(res=>{
      if(res==1){
        this.displayRecuperacion='none';
        this.seguridadService.recuperarUsuarios(email).subscribe(data=>{
          this.usuarios=data;
          this.displayusuarios='block';
        });
      }else if(res==2){
        alert("se ejecuta el envio")
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Error!',
          text:'la direccion de correo ingresada no pertenece a ningun usuario registrado',
          showConfirmButton: false,
          timer: 3000
      })
      }
     });
  }
  recuperacion(){
    this.displayRecuperacion='block';
  
  }
  recuperar(id){
    this.seguridadService.sendEmail(id,"kevinjovel9@gmail.com").subscribe(res=>{
      if(res==1){
        alert("revise su correo")
      }else{
        alert("ocurrio un error")
      }
    });
  }
  close(){
    this.displayRecuperacion='none';
  }
  close2(){
    this.displayusuarios='none';
  }
}
 // console.log(res);
        // if (res.iidusuario == 0) {
        //   this.error = true;
        // } else {
        //   this.usuarioService.crearSession().subscribe(res=>{
        //     if(res==1){
        //       alert(res);
        //       this.error = false;
        //       this.router.navigate(["./"]);
        //     }