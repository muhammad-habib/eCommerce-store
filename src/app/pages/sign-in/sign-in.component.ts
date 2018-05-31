import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SignInService} from './sign-in.service';
import {User} from '../../models/User.model';
import {SmsDialogComponent} from './sms-dialog/sms-dialog.component';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user = new User();
  country_key: any;


  myControl: FormControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;

  filter(val: string): string[] {
      return this.options.filter(option => option['code'].toLowerCase().indexOf(val.toLowerCase()) === 0 || option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  constructor(
      public formBuilder: FormBuilder,
      public router:Router,
      public snackBar: MatSnackBar,
      public signInSerivce: SignInService,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          'mobile': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          'country_key': ['', Validators.compose([Validators.required, Validators.maxLength(5)])]
      });

      this.registerForm = this.formBuilder.group({
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          'country_key': ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      });


      this.signInSerivce.countriesCodes()
          .subscribe(
              data => {
                  this.options = data['data'];
                  console.log(data['data']);
              },
              error => {
                  console.log(error);
              });

      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(val => this.filter(val))
      );
  }



  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid)
    {
        this.signInSerivce.signIn(values)
            .subscribe(
                data => {
                    console.log(data);
                    if(data['status_code'] === 400)
                        this.snackBar.open(data['message'], '×', { panelClass: 'success', verticalPosition: 'top', duration: 9000 });
                    else if (data['status_code'] === 200)
                    {
                        this.user.mobile = values['mobile'];
                        this.user.country_key = values['country_key'];
                        this.snackBar.open(data['message'], '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
                        this.dialog.open(SmsDialogComponent, {
                            panelClass: 'product-dialog',
                            data: this.user
                        });
                    }

                },
                error => {
                    console.log(error);
                });
      // this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
        this.signInSerivce.register(this.user)
            .subscribe(
                data => {
                    if(data['status_code'] === 400)
                        this.snackBar.open('User already exist', '×', { panelClass: 'success', verticalPosition: 'top', duration: 9000 });
                    else if (data['status_code'] === 200)
                    {
                        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
                        this.dialog.open(SmsDialogComponent, {
                            panelClass: 'product-dialog',
                            data: this.user
                        });
                    }

                },
                error => {
                    console.log(error);
                });
    }
  }

}

