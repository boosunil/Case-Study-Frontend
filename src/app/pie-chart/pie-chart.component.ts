import { Component, OnInit,ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiserviceService } from '../apiservice.service';




export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions_radial : Partial<ChartOptions>
  importDataForm: FormGroup;
  import_file: any = null;
  allowedExtensions = ["xls", "xlsx"];
  fileTypeNotAllowed = false;
  share = [];
  size = [];
  category_pie = [];
  category_radial = [];
  alert = false;



  @ViewChild('dataFile', { static: false }) inputVar: ElementRef;
  @ViewChild('fileInput', {static: false}) myFileInput: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public apiService : ApiserviceService,
    
  ) {
    this.pieinit()
    this.init()
   }

   pieinit(){
     this.chartOptions = {
      series: this.share,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.category_pie,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
   }

   init(){
     this.chartOptions_radial = {
      series: this.size,
      chart: {
        height: 300,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow :{
            imageWidth: 150,
          },
          track : {
            background: '#f2f2f2',
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w) {
                return "249";
              }
            }
          }
        }
      },
      labels: this.category_radial
    };
   }

  ngOnInit() {
    this.importDataForm = this.formBuilder.group({
      datafile: ["", [Validators.required]],
    });
    this.getData()
  }

  getData(){
    this.apiService.getUploadedData().subscribe(
      (resp) =>{
        if (resp['success']){
          resp['data'].forEach(element => {
            this.size.push(element.size)
            this.category_radial.push(element.category)
            if(element.category && element.share > 0){
              this.category_pie.push(element.category)
              this.share.push(element.share)
            }
          });
          // this.pieinit()
          // this.init()
        }
      },(error) =>{
        console.log(error)
      }
    )

  }

  fileUpload(files) {
    //console.log("FILE UPLOAD", files);
    this.fileTypeNotAllowed = false;
    this.import_file = files[0];
    this.import_file.filename = this.import_file.name;
    //console.log("this.import_file:", this.import_file)
    const extension = this.import_file.filename.split(".").pop();
    if (this.allowedExtensions.indexOf(extension) === -1) {
      this.fileTypeNotAllowed = true;
      this.importDataForm.get("datafile").setErrors({ extension: true });
    }
  }

  submit(data) {
    if (this.importDataForm.valid) {
      //console.log("ON submit", data);
      const formValues = new FormData();
      formValues.append("datafile", this.import_file);
      console.log("form val", formValues);
      this.apiService.uploadData(formValues).subscribe(
        (res) => {
          // this.router.navigate(['/Charts'])
          this.getData()
          this.clearSelection()
          this.router.navigate(['/Charts'])
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        },
        (error) => {
          //console.log("this.import_file: ", this.import_file) 
        }
      );
    }
  }

  clearSelection(){
      this.myFileInput.nativeElement.reset();
  }

  closeAlert(){
    this.alert = false;
  }

}
