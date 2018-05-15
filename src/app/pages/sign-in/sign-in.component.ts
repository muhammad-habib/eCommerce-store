import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import { emailValidator} from '../../theme/utils/app-validators';
import {SignInService} from './sign-in.service';
import {User} from '../../models/User.model';
import {SmsDialogComponent} from './sms-dialog/sms-dialog.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user = new User();
  constructor(
      public formBuilder: FormBuilder,
      public router:Router,
      public snackBar: MatSnackBar,
      public signInSerivce: SignInService,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          'email': ['', Validators.compose([Validators.required, emailValidator])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.registerForm = this.formBuilder.group({
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          'country_key': ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      });
  }



  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
        this.signInSerivce.register(this.user)
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                });

        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

        let dialogRef = this.dialog.open(SmsDialogComponent, {
            panelClass: 'product-dialog',
            data: this.user
        });
    }
  }

}

