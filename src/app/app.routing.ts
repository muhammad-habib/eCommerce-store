import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {MyAccountComponent} from './pages/my-account/my-account.component';
import {MyWalletComponent} from './pages/my-wallet/my-wallet.component';
import {AddressesComponent} from './addresses/addresses.component';
import {OnlyLoggedInUsersGuard} from './guards/only-logged-in-users.guard';
import {CategoriesComponent} from './shared/categories/categories.component';
export const routes: Routes = [
    {
        path: 'landing', component: LandingPageComponent
    },
    {
        path: 'addresses', component: AddressesComponent, children: [
            {path: 'new', loadChildren: 'app/addresses/add-address/add-address.module#AddAddressModule'},
            {path: 'list', loadChildren: 'app/addresses/list-addresses/list-addresses.module#ListAddressesModule'},
        ]
    },
    {
        path: '',
        component: PagesComponent, children: [
            {path: 'compare', loadChildren: 'app/pages/compare/compare.module#CompareModule', data: {breadcrumb: 'Compare'}},
            {path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule', data: {breadcrumb: 'Wishlist'}},
            {path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule', data: {breadcrumb: 'Cart'}},
            {path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule', data: {breadcrumb: 'Checkout'}},
            {path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule', data: {breadcrumb: 'Contact'}},
            {path: 'sign-in', loadChildren: 'app/pages/sign-in/sign-in.module#SignInModule', data: {breadcrumb: 'Sign In '}},
            {path: '', component:CategoriesComponent, loadChildren: 'app/shared/categories/categories.module#CategoriesModule', data: {breadcrumb: 'All Categories'}},
            {path: 'offers', loadChildren: 'app/pages/products/products.module#ProductsModule', data: {offers: true}},
            {path: 'category', loadChildren: 'app/pages/category/category.module#CategoryModule'},
            // { path: 'orders', loadChildren: 'app/pages/orders/orders.module#OrdersModule', data: { breadcrumb: 'All Orders' } }
            {
                path: 'orders',
                loadChildren: 'app/pages/orders/orders.module#OrdersModule',
                canActivate: [
                    OnlyLoggedInUsersGuard
                ],
                data: {
                    breadcrumb: 'All Orders'
                }
            },
            {
                path: 'my-account', canActivate: [
                    OnlyLoggedInUsersGuard
                ],
                component: MyAccountComponent
            },
            {
                path: 'my-wallet',canActivate: [
                    OnlyLoggedInUsersGuard
                ],
                component: MyWalletComponent}
        ]
    },
    {path: '**', component: NotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
    onSameUrlNavigation: 'reload',
});
