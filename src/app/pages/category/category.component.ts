import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router) { 

    this.router.navigate(['/products'], { queryParams: this.activatedRoute.snapshot.queryParamMap['params'] });

  }

  ngOnInit() {
      // console.log(this.activatedRoute.snapshot.queryParamMap['params']);
      // this.router.createUrlTree(['products'],this.activatedRoute.snapshot.queryParamMap['params']);

  //   this.activatedRoute.queryParams.subscribe(params => {
  //     console.log(params);
  // });

  }

}
