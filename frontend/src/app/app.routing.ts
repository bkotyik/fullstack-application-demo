import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ThankYouComponent} from './thankyou/thankyou.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'thankyou', component: ThankYouComponent},
];

