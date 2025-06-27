import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // ✅ Protected user routes
  { path: 'my-cart', component: MyCartComponent, canActivate: [UserAuthGuard] },
  { path: 'place-order/:id', component: PlaceOrderComponent, canActivate: [UserAuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [UserAuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [UserAuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [UserAuthGuard] },

  // ✅ Protected admin route
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },

  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
