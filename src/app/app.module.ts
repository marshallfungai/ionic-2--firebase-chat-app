import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//import angularfire 2 module
import { AngularFireModule } from 'angularfire2';

//angularfire 2 settings
export const firebaseConfig = {
    apiKey: "AIzaSyAqBdwVQQQPz7fcOp7lNcYQMKjS9G65Stw",
    authDomain: "chat-app-230a7.firebaseapp.com",
    databaseURL: "https://chat-app-230a7.firebaseio.com",
    projectId: "chat-app-230a7",
    storageBucket: "chat-app-230a7.appspot.com",
    messagingSenderId: "832382177813"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
