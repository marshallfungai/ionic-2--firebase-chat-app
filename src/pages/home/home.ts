import { Component, ElementRef, ViewChild, ViewChildren, QueryList , AfterViewChecked , OnInit } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  queries: {
    scroll: new ViewChild('scroll')
  }
})
export class HomePage  {

  items: FirebaseListObservable<any>;
  name: any;
  chatBox: string = '';
  scrollElement: string;
  //@ViewChild('scroll') private scroll: ElementRef;
  @ViewChild(Content) content: Content;
  // @ViewChildren('messages') divs:QueryList<ElementRef>;


  constructor(public navCtrl: NavController, public af: AngularFire, public el: ElementRef) {
      this.items = af.database.list('/messages',{
        query: {
          limitToLast: 6
        }
      });

      this.af.auth.subscribe(auth=>{
        if(auth){
          this.name = auth;
        }
      });

    //this.scrollElement = el.nativeElement('scroll');

      //console.log(this.scroll);
      //console.log(this.divs);

  }

  ScrollToBottom () {
    //this.content.scrollToBottom();
    let Dimensions = this.content.getContentDimensions();
    //console.log(dimensions);
    this.content.scrollTo(0, Dimensions.contentBottom, 100);
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



  ionViewDidEnter() {
    this.ScrollToBottom();
  }

  // ngOnInit() {
  //     this.ScrollToBottom();
  //   }
  //
  //   ngAfterViewChecked() {
  //     this.ScrollToBottom();
  //   }




}
