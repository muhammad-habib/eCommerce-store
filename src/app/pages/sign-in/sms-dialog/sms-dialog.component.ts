import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AppService} from '../../../app.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User.model';
import {SmsDialogService} from './sms-dialog.service';
import {Router} from '@angular/router';

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
                private smsDialogService: SmsDialogService,
                public snackBar: MatSnackBar,
                private router: Router) { }

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

    public onSubmitCode(user): void {
        if (this.smsForm.valid) {
            user.sms = this.code;
            this.smsDialogService.submitCode(user)
                .subscribe(
                    data => {
                        if(data['status_code'] == 200)
                        {
                            this.snackBar.open('verification Done', '×', { panelClass: 'success', verticalPosition: 'top', duration: 9000 });
                            this.user._token = data['remember_token'];
                            this.user.id = data['user_id'];
                            localStorage.setItem('user',JSON.stringify(this.user));
                            this.dialogRef.close();
                            this.router.navigate(['products']);
                            this.appService.logedIn=true;
                        }

                    },
                    error => {
                        this.snackBar.open('Error Try Agian', '×', { panelClass: 'success', verticalPosition: 'top', duration: 9000 });
                    });
        }

    }

}
