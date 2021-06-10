import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private spinner: NgxSpinnerService,
  ) {}
}
