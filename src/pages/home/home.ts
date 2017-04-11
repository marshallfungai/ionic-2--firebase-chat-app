import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any>;
  name: any;
  chatBox: string = '';

  constructor(public navCtrl: NavController, public af: AngularFire) {
      this.items = af.database.list('/messages',{
        query: {
          limitToLast: 5
        }
      });

      this.af.auth.subscribe(auth=>{
        if(auth){
          this.name = auth;
        }
      });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    })
  }

  chatSend(theirMessage: string){
    this.items.push({message: theirMessage, name: this.name.facebook.displayName});
    this.chatBox = '';
  }

}
