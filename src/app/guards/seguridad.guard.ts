import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import {UsuarioService} from '../services/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {
  constructor(private router:Router, private usuarioService:UsuarioService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let usuario=sessionStorage.getItem("nombre");
      // let tipo=sessionStorage.getItem("tipo"); 
      //   if(usuario&&tipo=="1"){
        return true;
      // }else{
      //   this.router.navigate(["/pagina-error-login"]);
      //   return false;
      // }
      // return this.usuarioService.obtenervariableSesion();
      // this.router.navigate(["/pagina-error-login"]);
    // return false;
    
    // alert(this.usuarioService.obtenervariableSesion())
  
    
  }
  
}
