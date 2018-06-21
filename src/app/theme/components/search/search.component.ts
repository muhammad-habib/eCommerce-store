import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  public text;

  constructor(
      private searchService: SearchService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  search() {
      const allParams =  Object.assign({}, this.route.snapshot.queryParams);
      allParams['query'] = this.text;
      console.log(allParams);
      this.redirectTo('/products', allParams);
  }

    redirectTo(uri:string, params={}) {
        this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
            this.router.navigate([uri], { queryParams: params}));
    }

}
