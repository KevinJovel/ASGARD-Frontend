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
  validarCodigo: FormGroup;
  NewPassword: FormGroup;
  recup: FormGroup;
  error: boolean = false;
  displayRecuperacion='none';
  displayusuarios='none';
  displayGestion='none';
  displayCodigo='none';
  displayChange='none'
  usuarios: any;
  constructor(private usuarioService:UsuarioService,private router:Router,private seguridadService:SeguridadService) { 
    this.usuario=new FormGroup(
    {
      'nombreusuario': new FormControl("",[Validators.required]),
      'contra': new FormControl("",[Validators.required])   
  });
  this.recup=new FormGroup(
    {
      'email': new FormControl("",[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  this.validarCodigo=new FormGroup(
    {
      'codigo': new FormControl("",[Validators.required,, Validators.pattern("^[0-9]{5}$")])
  });
  this.NewPassword=new FormGroup(
    {
      'id': new FormControl("",[Validators.required]),
      'pass': new FormControl("",[Validators.required]),
      'pass2': new FormControl("",[Validators.required, this.validarContraIguales.bind(this)])
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
  gestionRecuperacion(){
    this.displayGestion='block';
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
        this.seguridadService.recupUsuario(email).subscribe(res=>{
          this.seguridadService.sendEmail(res.iidusuario,email).subscribe(data=>{
            if(data==1){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Listo!',
                text:'Correo de recuperación enviado con éxito, revise su correo electrónico para seguir con el proceso.',
                showConfirmButton: false,
                timer: 5000
            });
            this.displayRecuperacion='none';
            this.displayCodigo='block';
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: '¡Ocurrió un error!',
                showConfirmButton: false,
                timer: 3000
            })
            }
          });
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Error!',
          text:'La dirección de correo electrónico ingresada no pertenece a ningún usuario registrado ',
          showConfirmButton: false,
          timer: 3000
      })
      }
     });
  }
  recuperacion(){
    this.displayGestion='none';
    this.displayRecuperacion='block';

  }
  recuperar(id){
    let email=this.recup.controls["email"].value;
    this.seguridadService.sendEmail(id,email).subscribe(res=>{
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Listo!',
          text:'Correo de recuperación enviado con éxito, revise su correo electrónico para seguir con el proceso.',
          showConfirmButton: false,
          timer: 5000
      });
      this.displayusuarios='none';
      this.displayCodigo='block';
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
  close3(){
    this.displayGestion='none';
  }
  close4(){
    this.displayCodigo='none';
  }
  close5(){
    this.displayChange='none';
  }
  ingresoCodigo(){
this.displayGestion='none';
this.displayCodigo='block';
  }
validarCodigoRe(){
let codigo=this.validarCodigo.controls["codigo"].value;
this.seguridadService.verificarCodigo(codigo).subscribe(data=>{
  if(data==0){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡Error!',
      text:'El código ingresado no existe o esta caducado.',
      showConfirmButton: false,
      timer: 3000
  })
  }else{
   this.displayCodigo='none';
   this.displayChange='block';
   this.NewPassword.controls["id"].setValue(data);
  }
});
this.validarCodigo.controls["codigo"].setValue("");
}
recuperarContrasena(){
  let id=this.NewPassword.controls["id"].value;
  let pass=this.NewPassword.controls["pass"].value;
  this.seguridadService.changePassword(id,pass).subscribe(res=>{
    if(res==1){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Exelenete!',
        text:'Contraseña modificada con éxito',
        showConfirmButton: false,
        timer: 3000
    });
    this.displayChange='none';
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Oups!',
        text:'Ocurrió un error',
        showConfirmButton: false,
        timer: 3000
    });
    }
  })
}
validarContraIguales(control: FormControl) {
  //con value sacamos el valor del control
  if (control.value != "" && control.value != null) {
    if (this.NewPassword.controls["pass"].value != control.value) {
      //si es diferente mandamos error devolviendo un objeto
      return { noIguales: true };
    } else {
      //todo esta bien
      return null;
    }
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