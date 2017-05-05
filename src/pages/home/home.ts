import { Component, ElementRef } from '@angular/core';
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
  scrollelement: string;


  constructor(public navCtrl: NavController, public af: AngularFire, public el: ElementRef) {
      this.items = af.database.list('/messages',{
        query: {
          limitToLast: 10
        }
      });

      this.af.auth.subscribe(auth=>{
        if(auth){
          this.name = auth;
        }
      });

      this.scrollelement = el.nativeElement('scroll');

      console.log(this.scrollelement);


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
