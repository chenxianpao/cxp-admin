/**
 * Created by chenxianpao on 2018/8/30.
 */
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  private api = {
    'train': environment.apiBase + '/train/',
    'machine': environment.apiBase + '/machine/',
    'daily_report': environment.apiBase + '/daily_report/',
    'demand': environment.apiBase + '/demand/',
  };
  getUrl(component: string) {
    return this.api[component];
  }
}
