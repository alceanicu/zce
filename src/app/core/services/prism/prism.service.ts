import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// required
import 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
// optional
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
// plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers';

declare var Prism: any;

@Injectable({
  providedIn: 'root'
})
export class PrismService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  highlightAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
