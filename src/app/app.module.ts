import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { TableComponent } from "./table/table.component";
import { MatTableModule } from "@angular/material/table";
import { TaskComponent } from "./task/task.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtendedInputComponent } from './extended-input/extended-input.component';
import { HeaderComponent } from './header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [AppComponent, TableComponent, TaskComponent, ExtendedInputComponent, HeaderComponent, PieChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
