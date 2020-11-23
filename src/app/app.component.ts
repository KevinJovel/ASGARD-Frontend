import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ExcelService} from './excel.service';
import {UsuarioService} from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  login:boolean=false;
  registro:boolean=false;
    // display:'none';
  data: any = [
    {
       
        "CATEGORYID": 1,
        "CATEGORYNAME": "BOOKS",
        "DESCRIPTION": "It contains all types of books",
        "IMAGE": "Books",
        "STATUS": "TRUE"
    },
    {
       
        "CATEGORYID": 2,
        "CATEGORYNAME": "EBOOKS",
        "DESCRIPTION": "It contains all types of ebooks",
        "IMAGE": "Ebooks",
        "STATUS": "TRUE"
    },
    {
     
        "CATEGORYID": 3,
        "CATEGORYNAME": "Bookss",
        "DESCRIPTION": "DESCRIPTION",
        "IMAGE": "IMAGE",
        "STATUS": "TRUE"
    }
]
    constructor(private spinner: NgxSpinnerService, private excelService:ExcelService, private usuarioService:UsuarioService) {
        
    }
    ngOnInit(){
      this.usuarioService.validarusuariosRegistrados().subscribe(res=>{
        if(res!=1){
         this.login=true;
         this.registro=true;
        }
      });
      let usuario=sessionStorage.getItem("nombre");
      if(usuario){
        this.login= false;
      }else{
        this.login= true;
      }
     this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    }
    exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.data,'myExcelFile');
    }
    
}
