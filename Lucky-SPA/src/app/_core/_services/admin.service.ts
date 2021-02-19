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

  getBackground = () => this.http.get<any>(`${this.baseUrl}Admin/GetBackground`);

  changeBackground = (formData: FormData) => this.http.post<boolean>(`${this.baseUrl}Admin/ChangeBackground`, formData);

  getWatingTime = () => this.http.get<number>(`${this.baseUrl}Admin/GetWatingTime`);

  changeWatingTime = (watingTime: number) => this.http.post<boolean>(`${this.baseUrl}Admin/ChangeWatingTime`, watingTime);

  uploadEmployee = (formData: FormData) => this.http.post<OperationResult>(`${this.baseUrl}Admin/UploadEmployee`, formData);

  getEmployeeCount = () => this.http.get<number>(`${this.baseUrl}Admin/GetEmployeeCount`);

  clearEmployeeList = () => this.http.get<boolean>(`${this.baseUrl}Admin/ClearEmployeeList`);

  addPrize = (prize: Prize) => this.http.post<OperationResult>(`${this.baseUrl}Admin/AddPrize`, prize);

  updatePrize = (prize: Prize) => this.http.post<OperationResult>(`${this.baseUrl}Admin/UpdatePrize`, prize);

  downloadEmpTempExcel = () => this.http.get(`${this.rootUrl}uploads/Lucky_Emp_Template.xlsx`, { responseType: 'blob' })
    .subscribe((result: Blob) => {
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Lucky_Emp_Template.xlsx');
      document.body.appendChild(link);
      link.click();
    })

  getAllPrizes(hasInvisibleItems: boolean = true) {
    const value = hasInvisibleItems ? 'true' : 'false';
    return this.http.get<Prize[]>(`${this.baseUrl}Admin/GetAllPrizes`, { params: { hasInvisibleItems: value } });
  }

  deletePrize = (prizeID: string) => this.http.get<boolean>(`${this.baseUrl}Admin/DeletePrize`, { params: { prizeID } });

  switchPrizeVisible = (prizeID: string) => this.http.get<boolean>(`${this.baseUrl}Admin/SwitchPrizeVisible`, { params: { prizeID } });

  clearResultRecords = () => this.http.get<boolean>(`${this.baseUrl}Admin/ClearResultRecords`);
}
