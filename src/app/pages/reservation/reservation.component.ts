import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { LayoutService } from 'src/app/_metronic/layout/layout.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  
  nb_adult: number;
  datefrom: string;
  dateto: string;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  numberOfGuests: number = 0;
  public countriesWithAreas: any[] = [];
  emirateAreas: any;
  public filteredAreas: string[] = []; 
  public filterText: string = '';
  public areas: string[] = [];
  searchForm: FormGroup;
  itemsPerPage: number = 10; // Nombre d'éléments par page
  page: any;
  orderby: string;

  receivedData: any; // Les données reçues depuis la page précédente
  propertyData: any[] = [];
  
   data : any ;
   listedProperties: any; // Variable pour stocker la réponse de l'API
  
  formBuilder: any;
  http: any;
  constructor(private layoutService: LayoutService, public cdr: ChangeDetectorRef, private router: Router,private route:ActivatedRoute) {

        

  }





  ngOnInit(): void {
    // this.sendSearch();
    let data:any ;

    this.route.queryParams
    .subscribe((params :any) => {
      console.log(params); // { orderby: "price" }
      data = JSON.parse(JSON.stringify(params));
       data.nb_adult = Number(data.nb_adult)
      console.log(data); // price


      const currency = 'AED';

      const pricesListObservable = this.layoutService.get_prices_list_available_props(data);
      const allPropertiesObservable = this.layoutService.get_all_properties_details_b2c(currency);
     
     
      // Combine both observables and wait for both to complete
      forkJoin([pricesListObservable, allPropertiesObservable]).subscribe(
        ([pricesList, allProperties]: any) => {
          const propsList = pricesList;
  
          // Call your additional function here using 'pricesList' and 'allProperties'
          const filteredPropsList = propsList.map((item: any) => {
            const matchingWeeklyExceptional = allProperties.find(
              (exceptional: any) => exceptional.airbetterId === item.airbetterId
            );
            if (matchingWeeklyExceptional) {
              return { ...item, ...matchingWeeklyExceptional };
            } else {
              return item;
            }
          });
          
         // console.log('**** filteredPropsList *****');
          // console.log(filteredPropsList);
         // console.log(data);
          this.listedProperties = filteredPropsList;
              
            console.log(this.listedProperties);
        }
      );
  
    }
  );


 
    

  
  }



  //  sendSearch() {
  //    if (this.searchForm.valid) {
     
  //      console.log(this.searchForm.value);
  //      this.layoutService.get_prices_list_available_props(this.searchForm.value).subscribe(
  //        (value) => console.log(value)
  //      );
  //    } else {
    
  //      console.log('Form is not valid');
  //    }
  //  }
  
  //  save() {
  //    if (this.searchForm.valid) {
  //      const formData = this.searchForm.value;
      
  //      this.router.navigate(['/description'], {
  //        queryParams: formData, 
  //      });
  //    } else {
  //      console.log('Form is not valid');
  //    }
  
  //  }

  
  // callApiWithUpdatedData() {
  //   const data = this.searchForm.value;

  //   // Appelez votre API
  //   this.layoutService.get_prices_list_available_props(data).subscribe((response) => {
  //     this.listedProperties = response; // Mettez à jour listedProperties avec les données de l'API


  //     console.log(this.callApiWithUpdatedData);
  //   });
  // }




  changestatus(): void {
    setTimeout(() => {
      this.cdr.detectChanges()
      this.cdr.markForCheck()
    }, 300)
  
  }
}
