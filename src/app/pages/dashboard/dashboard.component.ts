import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LayoutService } from 'src/app/_metronic/layout/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  only_one_day_offers: null;
 
  explore_in_areas: any;
  explore_in_areasUrls: any;
 
  itemsPerSlide = 3;
  http: any;
  weekly_exceptionals: any[] = []; 
   
  constructor(private router: Router,public cdr: ChangeDetectorRef,
    

    private layoutService:LayoutService) {}
    
    
  ngOnInit(
    
  ): void {
    this.loadProperties();
     console.log(this.weekly_exceptionals)

  }


  loadProperties(){


    this.only_one_day_offers = null;
    this.weekly_exceptionals
    let weekly_exceptionalsIds: any;
    let only_one_day_offersIds: any;

    
    // Start both API requests simultaneously
    forkJoin([
      this.layoutService.get_offers(),
      this.layoutService.get_all_properties_details_b2c(this.currency)
    ])
    .subscribe(([resOffers, response] : any) => {
      // Process the result of the first API request
      console.log('Résultat de l\'API get_all_properties_details_b2c :', response);
      sessionStorage.setItem('propsListAb', JSON.stringify(response));
      this.explore_in_areas = resOffers.explore_in_areas;
      this.explore_in_areasUrls = resOffers.explore_in_areas.map((x: any) => x.replace(/ /g, '%20'));
      weekly_exceptionalsIds = resOffers.weekly_exceptionals;
      only_one_day_offersIds = resOffers.only_one_day_offers;

     

      this.only_one_day_offers = only_one_day_offersIds.filter((x: any) =>
        x.fullAdress
      );
      // Process the result of the second API request using data from the first
      const filteredDaily = only_one_day_offersIds.map((item: any) => {
        const matchingWeeklyExceptional = response.find((exceptional: any) => exceptional.airbetterId === item.airbetterId);
        if (matchingWeeklyExceptional) {
          return { ...item, ...matchingWeeklyExceptional };
        } else {
          return item;
        }
      });
      const filteredWeekly = weekly_exceptionalsIds.map((item: any) => {
        const matchingWeeklyExceptional = response.find((exceptional: any) => exceptional.airbetterId === item.airbetterId);
        if (matchingWeeklyExceptional) {
          return { ...item, ...matchingWeeklyExceptional };
        } else {
          return item;
        }
      });
      this.only_one_day_offers = filteredDaily.filter((x: any) => x.fullAdress);
      console.log(filteredDaily);
      this.weekly_exceptionals = filteredWeekly.filter((x: any) => x.fullAdress);
      this.changestatus();




    });



   }
  selectRandomProperties(randomProperties: any[], arg1: number): any[] {
    throw new Error('Method not implemented.');
  }


  currency(currency: any) {
    throw new Error('Method not implemented.');
  }

  formatNumberWithThreeDecimals(value: number): string {
    return value.toFixed(3);
  }

  getTopRatedProperties(count: number): any[] {
    
    if (this.weekly_exceptionals && this.weekly_exceptionals.length > 0) {
   
      return this.weekly_exceptionals.sort((a, b) => b.rating - a.rating).slice(0, count);
    } else {
 
      return [];
    }
  }
  
   changestatus(): void {
    setTimeout(() => {
      this.cdr.detectChanges()
      this.cdr.markForCheck()
    }, 300)
  
  }



  

}
