import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DescriptionComponent } from './description.component';
import { WidgetsModule } from 'src/app/_metronic/partials';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        component:DescriptionComponent,
      },
    ]),
    WidgetsModule,
  ]
})
export class DescriptionModule { }
