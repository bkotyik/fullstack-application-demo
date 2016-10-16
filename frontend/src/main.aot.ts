import {enableProdMode} from '@angular/core';
import { platformBrowser }    from '@angular/platform-browser';
import {AppModuleNgFactory} from './app/app.module.ngfactory';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    enableProdMode();
}

export function main() {
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
