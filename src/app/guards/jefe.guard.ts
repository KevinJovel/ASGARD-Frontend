import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router'
import { SeguridadGuard } from './seguridad.guard';

@Injectable({
  providedIn: 'root'
})
export class JefeGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let usuario=sessionStorage.getItem("nombre");
      let tipo=sessionStorage.getItem("tipo"); 
        if(usuario&&tipo=="2"){
          return true;
        }else{
          this.router.navigate(["/pagina-error-login"]);
          return false;
        }
  }
  
}
