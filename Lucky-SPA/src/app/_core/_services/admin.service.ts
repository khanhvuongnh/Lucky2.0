import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../_models/operation-result';
import { Prize } from '../_models/prize';

@Injectable({ providedIn: 'root' })
export class AdminService {
  baseUrl = environment.apiUrl;
  rootUrl = environment.rootUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getBackground() {
    return this.http.get<any>(`${this.baseUrl}Admin/GetBackground`);
  }

  changeBackground(formData: FormData) {
    return this.http.post<boolean>(`${this.baseUrl}Admin/ChangeBackground`, formData);
  }

  uploadEmployee(formData: FormData) {
    return this.http.post<OperationResult>(`${this.baseUrl}Admin/UploadEmployee`, formData);
  }

  getEmployeeCount() {
    return this.http.get<number>(`${this.baseUrl}Admin/GetEmployeeCount`);
  }

  clearEmployeeList() {
    return this.http.get<boolean>(`${this.baseUrl}Admin/ClearEmployeeList`);
  }

  downloadEmpTempExcel() {
    return this.http.get(`${this.rootUrl}uploads/Lucky_Emp_Template.xlsx`, { responseType: 'blob' })
      .subscribe((result: Blob) => {
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Lucky_Emp_Template.xlsx');
        document.body.appendChild(link);
        link.click();
      });
  }

  addPrize(prize: Prize) {
    return this.http.post<OperationResult>(`${this.baseUrl}Admin/AddPrize`, prize);
  }

  updatePrize(prize: Prize) {
    return this.http.post<OperationResult>(`${this.baseUrl}Admin/UpdatePrize`, prize);
  }

  getAllPrizes(hasInvisibleItems: boolean = true) {
    const value = hasInvisibleItems ? 'true' : 'false';
    return this.http.get<Prize[]>(`${this.baseUrl}Admin/GetAllPrizes`, { params: { hasInvisibleItems: value } });
  }

  deletePrize(prizeID: string) {
    return this.http.get<boolean>(`${this.baseUrl}Admin/DeletePrize`, { params: { prizeID } });
  }

  switchPrizeVisible(prizeID: string) {
    return this.http.get<boolean>(`${this.baseUrl}Admin/SwitchPrizeVisible`, { params: { prizeID } });
  }

}
