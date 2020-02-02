import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // home page
  { path: '', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},

  // auth routes
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'about-boxeh',
    loadChildren: () => import('./testimonial/about-boxeh/about-boxeh.module').then( m => m.AboutBoxehPageModule)
  },
  {
    path: 'our-story',
    loadChildren: () => import('./testimonial/our-story/our-story.module').then( m => m.OurStoryPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./testimonial/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'join-us',
    loadChildren: () => import('./testimonial/join-us/join-us.module').then( m => m.JoinUsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
