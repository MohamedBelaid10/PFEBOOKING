import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { WidgetsModule } from 'src/app/_metronic/partials';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        component: ReservationComponent,
      },
    ]),
    WidgetsModule,
  ]
})
export class ReservationModule { }
