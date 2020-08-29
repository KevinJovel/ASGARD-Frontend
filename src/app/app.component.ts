import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ExcelService} from './excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
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
    constructor(private spinner: NgxSpinnerService, private excelService:ExcelService) {
        
    }
    ngOnInit(){
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
