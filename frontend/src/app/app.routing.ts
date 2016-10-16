import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ThankYouComponent} from './thankyou/thankyou.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'thankyou', component: ThankYouComponent},
];

export const routing = RouterModule.forRoot(routes);
