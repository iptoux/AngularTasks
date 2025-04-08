import { Injectable } from '@angular/core';
import packageInfo from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor() { }

  /**
   * Returns the application version from package.json
   */
  getVersion(): string {
    return packageInfo.version;
  }


}
