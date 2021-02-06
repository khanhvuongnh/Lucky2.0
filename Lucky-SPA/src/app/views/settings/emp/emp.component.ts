import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { SweetAlertService } from 'src/app/_core/_services/sweet-alert.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  @ViewChild('employeeForm') employeeForm: NgForm;
  file: File;
  label = 'Choose file...';
  employeeCount: number;

  constructor(
    private adminService: AdminService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit() {
    this.getEmployeeCount();
  }

  onFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.file = e.target.files[0];
      this.label = e.target.files[0].name;
    }
  }

  uploadFile() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.adminService.uploadEmployee(formData).subscribe(res => {
        if (res.success) {
          this.sweetAlertService.success('Success!', res.message);
          this.getEmployeeCount();
          this.employeeForm.reset();
          this.label = 'Choose file...';
        } else {
          this.sweetAlertService.error('Error!', res.message);
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return this.sweetAlertService.error('Invalid File', 'Please select a excel file to upload.');
    }
  }

  getEmployeeCount() {
    this.adminService.getEmployeeCount().subscribe(res => {
      this.employeeCount = res;
    });
  }

  clearEmployeeList() {
    this.sweetAlertService.confirm('Remove Employee Data', 'Are you sure you want to remove employee data?', () => {
      this.adminService.clearEmployeeList().subscribe(res => {
        if (res) {
          this.sweetAlertService.success('Success!', 'Employee data was successfully removed.');
          this.getEmployeeCount();
        } else {
          this.sweetAlertService.error('Error!', 'Removing employee data failed on save.');
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  downloadEmpTempExcel() {
    this.adminService.downloadEmpTempExcel();
  }
}
