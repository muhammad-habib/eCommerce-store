import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AppService} from '../../../app.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User.model';
import {SmsDialogService} from './sms-dialog.service';

@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SmsDialogComponent implements OnInit {

    smsForm: FormGroup;
    code: string;
    public config: SwiperConfigInterface = {};
    constructor(public appService:AppService,
                public dialogRef: MatDialogRef<SmsDialogComponent>,
                public formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public user: User,
                private smsDialogService: SmsDialogService) { }

    ngOnInit() {
        this.smsForm = this.formBuilder.group({
            'sms': ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])]
        });
    }

    ngAfterViewInit(){
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            }
        }
    }

    public close(): void {
        this.dialogRef.close();
    }

    public onSubmitCode(user): void {
        if (this.smsForm.valid) {
            user.sms = this.code;
            this.smsDialogService.submitCode(user)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                        console.log(error);
                    });
        }
    }

}
