import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  form: FormGroup;
  infoId : any;
  heading : any;
  editForm = false;
  details : any

  constructor(
    private fb: FormBuilder,
    // private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiserviceService, 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      number : [null, [Validators.required]],
      email : [null,[Validators.email,Validators.required]],
      address : [null,[Validators.required]]
    })

    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.heading = "Update Contact-Info";
        this.infoId = params["id"];
        this.editForm = true;
        this.getContactInfo()
      }
    });
  }

  submit(val){

    if (this.editForm){
      this.apiService.updateContact(val,this.infoId).subscribe(
        res =>{
          this.router.navigate(['/Contact-List'])
          console.log(res)
        },
        error =>{
          console.log(error)
        }
      )
    }
    else{
    this.apiService.createContact(val).subscribe(
      res => {
            console.log(res)
            this.router.navigate(['/Contact-List'])
          },
          error => {
            console.log(error)
          }
    )
        }
  }

  getContactInfo(){
    this.apiService.getContact(this.infoId).subscribe(
      (resp) =>{
        this.details = resp['data']
        this.updateForm()
      },(error) =>{
        console.log(error)
      }
    )
  }

  updateForm(){
    const formValues = {
      name : this.details.name,
      number : this.details.number,
      email : this.details.email,
      address : this.details.address
    }
    this.patchFormValues(formValues);
  }

  patchFormValues(object) {
    this.form.patchValue(object);
  }
}

