import { Component, OnInit } from '@angular/core';
import {LanguagesService} from './languages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  providers: [LanguagesService]
})
export class LanguagesComponent implements OnInit {

    public flags = [
        { name:'English', image: 'assets/images/flags/gb.svg', slug: 'en' },
        { name:'Arabic', image: 'assets/images/flags/sa.svg', slug: 'ar' }
    ];
    public flag:any;

    constructor(private languagesService: LanguagesService,
                private router: Router,
                private route: ActivatedRoute,
                public appService: AppService

    ) { }

    ngOnInit() {
        let flag = this.flags.find(function(flag) {
            return flag.slug === localStorage.getItem('lang');
        });
        if (flag)
            this.flag = flag;
        else
            this.flag = this.flags[0];

        this.appService.lang = this.flag.slug;
    }


    public changeLang(flag) {
        this.flag = flag;
        localStorage.setItem('lang', this.flag.slug);
        this.appService.lang = this.flag.slug;
        if (localStorage.getItem('user')) {
            this.languagesService.changeLanguage(this.flag.slug)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
            });
        }

        // console.log();
        const allParams = this.route.snapshot.queryParams;
        let url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
        if(url)
            this.redirectTo(url, allParams);
        else
            this.redirectTo(this.router.url);
    }

    redirectTo(uri:string, params={}) {
        this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
            this.router.navigate([uri], { queryParams: params}));
    }



}
