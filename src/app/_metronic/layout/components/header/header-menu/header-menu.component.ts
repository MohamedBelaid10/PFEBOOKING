import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../layout.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  public countriesWithAreas: any[] = [];
  emirateAreas: any;
  public filteredAreas: string[] = []; 
  public filterText: string = '';
  public areas: string[] = [];
  constructor(private router: Router,
   private layoutService:LayoutService) {}

  ngOnInit(): void {
    this.getDest();
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
