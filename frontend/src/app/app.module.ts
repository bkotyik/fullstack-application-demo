import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ThankYouComponent} from './thankyou/thankyou.component';
import {routes} from './app.routing';

import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {ValidationService} from './shared/validation.service';
import {ApiService} from './shared/api.service';
import {ValidationMessageComponent} from './shared/components';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ValidationMessageComponent,
        ThankYouComponent
    ],
    providers: [ValidationService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
