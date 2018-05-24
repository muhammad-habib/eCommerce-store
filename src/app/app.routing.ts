import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingPageComponent  } from './landing-page/landing-page.component';

export const routes: Routes = [
    {
        path:'landing',component : LandingPageComponent
    },
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: 'compare', loadChildren: 'app/pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' } },
            { path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
            { path: 'sign-in', loadChildren: 'app/pages/sign-in/sign-in.module#SignInModule', data: { breadcrumb: 'Sign In ' } },
            { path: 'brands', loadChildren: 'app/pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
            { path: 'products', loadChildren: 'app/pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } },
            { path: 'category', loadChildren: 'app/pages/category/category.module#CategoryModule'},
            // { path: 'orders', loadChildren: 'app/pages/orders/orders.module#OrdersModule', data: { breadcrumb: 'All Orders' } }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});