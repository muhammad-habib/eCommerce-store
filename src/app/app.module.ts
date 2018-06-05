import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_BASE_HREF} from '@angular/common';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';

import { AuthInterceptor } from './theme/utils/auth-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SignInService} from './pages/sign-in/sign-in.service';
import { SignInModule} from './pages/sign-in/sign-in.module';
import { SmsDialogService} from './pages/sign-in/sms-dialog/sms-dialog.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductService} from './pages/products/product/product.service';
// import { CategoryComponent } from './pages/category/category.component';
import { VirtualScrollModule} from 'angular2-virtual-scroll';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyWalletComponent } from './pages/my-wallet/my-wallet.component';
import { AddressesComponent } from './addresses/addresses.component';


@NgModule({
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    routing,
    VirtualScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent,
    LandingPageComponent,
    MyAccountComponent,
    MyWalletComponent,
    AddressesComponent,
    // CategoryComponent,
  ],
  providers: [
    AppSettings,
    AppService,   
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    SignInService,
    SmsDialogService,
      ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue: '/store'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }