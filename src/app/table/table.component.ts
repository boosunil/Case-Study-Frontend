import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  contactList :any;
  infoId : any;

  constructor(
    public apiService: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    
  }

  ngOnInit() {
    this.getContactList()
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.infoId = params.id;
      }else{
        this.getContactList()
      } 
    });
  }

  getContactList(){
    this.apiService.getContacts().subscribe(
      (resp) =>{
        this.contactList = resp['data']
      },(error) =>{
        console.log(error)
      }
    )
  }

  edit(id) {
    this.router.navigate(["/Home/edit", id]);
  }
  
  delete(id){
    this.apiService.deleteContact(id).subscribe(
      (resp) =>{
        console.log(resp)
        this.getContactList()
      },(error) =>{
        console.log(error)
      }
    )
  }
}
