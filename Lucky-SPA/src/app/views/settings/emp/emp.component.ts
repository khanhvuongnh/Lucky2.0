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
  label = 'Chọn một tập tin (.xlsx)...';
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
          this.sweetAlertService.success('Thành công!', res.message);
          this.getEmployeeCount();
          this.employeeForm.reset();
          this.label = 'Chọn một tập tin (.xlsx)...';
          this.file = null;
        } else {
          this.sweetAlertService.error('Có lỗi!', res.message);
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return this.sweetAlertService.error('Tập tin không hợp lệ', 'Vui lòng chọn một tập tin (.xlsx) để tải lên.');
    }
  }

  getEmployeeCount() {
    this.adminService.getEmployeeCount().subscribe(res => {
      this.employeeCount = res;
    });
  }

  clearEmployeeList() {
    this.sweetAlertService.confirm('Xoá danh sách?', 'Danh sách đã xoá thì không thể khôi phục.', () => {
      this.adminService.clearEmployeeList().subscribe(res => {
        if (res) {
          this.sweetAlertService.success('Thành công!', 'Danh sách đã được xoá.');
          this.getEmployeeCount();
        } else {
          this.sweetAlertService.error('Có lỗi!', 'Xoá danh sách có lỗi khi lưu.');
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
