import { Component, OnInit } from '@angular/core';
import {MyAccountService} from './my-account.service';
import {User} from '../../models/User.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {SmsDialogComponent} from '../sign-in/sms-dialog/sms-dialog.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers:[MyAccountService]
})
export class MyAccountComponent implements OnInit {
  public user = new User();
  public accountForm: FormGroup;



    constructor(private myAccountService: MyAccountService,
          public formBuilder: FormBuilder,
          public snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
      this.accountForm = this.formBuilder.group({
          'name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
          'email': ['', Validators.compose([Validators.required, emailValidator])]
      });

      this.getUser();
  }

  getUser() {
    this.myAccountService.getUserInfo()
        .subscribe(
            data => {
              this.user.email = data['data']['email'];
              this.user.name = data['data']['name'];
              this.user.mobile = data['data']['mobile'];
              console.log(data);
            },
            error => {
            });
  }

  public onAccountFormSubmit(): void {
      if (this.accountForm.valid) {
          this.myAccountService.updateUserInfo(this.user)
              .subscribe(
                  data => {
                      if (data['status_code'] === 200)
                          this.snackBar.open('Profile updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });

                  },
                  error => {
                      console.log(error);
                  });
      }

  }

}
