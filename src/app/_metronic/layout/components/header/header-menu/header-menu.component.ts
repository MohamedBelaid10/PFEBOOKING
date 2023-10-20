import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

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


  constructor(private router: Router,

    
   private layoutService:LayoutService,private formBuilder: FormBuilder,) {

  


    
    this.searchForm = this.formBuilder.group({
      nb_adult: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      datefrom: [null, Validators.required],
      dateto: [null, Validators.required], 
      area: [''],
      city: ['Dubai'],
      currency: ['AED'],
    });
   }


  //  effectuerRecherche() {
  //   const data = this.searchForm.value;
  //   this.router.navigate(['/reservation'], { queryParams: data });
  // }

  ngOnInit(): void {
    this.getDest();
     this.sendSearch();
    // this.effectuerRecherche();

     
  }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }


  getDest(){
    this.layoutService.getDestination().subscribe(
      (data) => {
       
        const emirateData = data.country_city.find((countryCity:any) =>
          countryCity.country === 'United Arab Emirates'
        );

        if (emirateData) {
          this.emirateAreas = data.city_area
            .filter((cityData:any) => emirateData.city.includes(cityData.city))
            .map((cityData:any) => cityData.area)
            .flat(); 
        }
      },
  
    );
    
 }

 sendSearch() {
  if (this.searchForm.valid) {
   
    console.log(this.searchForm.value);
    this.layoutService.get_prices_list_available_props(this.searchForm.value).subscribe(
      (value) => console.log(value)
    );
  } else {
  
    console.log('Form is not valid');
  }
}

saveCall() {
  if (this.searchForm.valid) {
    const formData = this.searchForm.value;
    
    this.router.navigate(['/reservation'], {
      queryParams: formData, 
    });
  } else {
    console.log('Form is not valid');
  }

}
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
