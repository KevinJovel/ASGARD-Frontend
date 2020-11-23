import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
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
  error: boolean = false;
  constructor(private usuarioService:UsuarioService,private router:Router) { 
    this.usuario=new FormGroup(
    {
      'nombreusuario': new FormControl("",[Validators.required]),
      'contra': new FormControl("",[Validators.required])   
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
          window.location.href = "/";
          // this.router.navigate(["/"]);

        }
      });
    }
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