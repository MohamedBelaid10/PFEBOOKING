import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/_metronic/layout/layout.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(private layoutService: LayoutService,
     private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;

}
}
