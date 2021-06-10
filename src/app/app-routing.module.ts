import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TableComponent } from './table/table.component';
import { TaskComponent } from './task/task.component';



const routes: Routes = [
  { path: "", redirectTo: "Home/create", pathMatch: "full" },
  { path: "Home/create", component: TaskComponent },
  { path: "Contact-List", component: TableComponent },
  {path : "Home/edit/:id",component: TaskComponent},
  {path:"Charts",component:PieChartComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
