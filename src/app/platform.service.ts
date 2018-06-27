import { Injectable } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class PlatformService {
  public isBrowser;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) 
  { 
      this.isBrowser = isPlatformBrowser(platformId);
  }
}
