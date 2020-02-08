import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared-module/shared-module.module';
import { SideMenuComponent } from './shared-module/side-menu/side-menu.component';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from './shared-module/shared-services/auth.service';
import { AuthGuard } from './shared-module/shared-services/auth-gaurd';

@NgModule({
  declarations: [
    AppComponent,
],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule ,
    SharedModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
