import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Record } from '../_models/record';
import { SpinRemain } from '../_models/spin-remain';

@Injectable({ providedIn: 'root' })
export class MainService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRandomPrizeRecords(prizeID: number, numberOfSpinAreas: number) {
    let params = new HttpParams();
    params = params.append('prizeID', prizeID.toString());
    params = params.append('numberOfSpinAreas', numberOfSpinAreas.toString());
    return this.http.get<Record[]>(`${this.baseUrl}Main/GetRandomPrizeRecords`, { params });
  }

  checkSpinRemain(prizeID: number) {
    let params = new HttpParams();
    params = params.append('prizeID', prizeID.toString());
    return this.http.get<SpinRemain>(`${this.baseUrl}Main/CheckSpinRemain`, { params });
  }

  getPrizeRecords(prizeID: number, isShowAllRecords: boolean) {
    let params = new HttpParams();
    params = params.append('prizeID', prizeID.toString());
    params = params.append('isShowAllRecords', isShowAllRecords.toString());
    return this.http.get<Record[]>(`${this.baseUrl}Main/GetPrizeRecords`, { params });
  }
}
