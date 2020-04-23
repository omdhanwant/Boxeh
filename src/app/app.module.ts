import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared-module/shared-module.module';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from './shared-module/shared-services/auth.service';
import { AuthGuard } from './shared-module/shared-services/auth-gaurd';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
// import { FilterPipeSearch } from './directives/filterPipeSearch';

@NgModule({
  declarations: [
    AppComponent,
    // FilterPipeSearch
],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule ,
    SharedModule,
    IonicStorageModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      fullScreenBackdrop: true,
      primaryColour: '#a0c643',
      backdropBackgroundColour: 'rgba(172, 166, 166, 0.2)'
    })
  ],
  providers: [
    // FilterPipeSearch,
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
