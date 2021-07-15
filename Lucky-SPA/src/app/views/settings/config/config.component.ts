import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { SweetAlertService } from 'src/app/_core/_services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  backgroundUrl = '';
  watingTime = 0;
  defaultBackgroundUrl = '../../../../assets/background.jpg';

  constructor(
    private sweetAlertService: SweetAlertService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getBackground();
    this.getWatingTime();
  }

  getBackground() {
    this.adminService.getBackground().subscribe(res => {
      if (res && res.background) {
        this.backgroundUrl = `${environment.rootUrl}${res.background}`;
      } else {
        this.backgroundUrl = this.defaultBackgroundUrl;
      }
    }, error => {
      console.log(error);
    });
  }

  getWatingTime() {
    this.adminService.getWatingTime().subscribe(res => this.watingTime = res);
  }

  clearResultRecords() {
    this.sweetAlertService.confirm('Xoá kết quả?', 'Kết quả đã xoá thì không thể khôi phục.', () => {
      this.adminService.clearResultRecords().subscribe(res => {
        if (res) {
          this.sweetAlertService.success('Thành công!', 'Kết quả đã được xoá.');
        } else {
          this.sweetAlertService.error('Có lỗi!', 'Xoá kết quả có lỗi khi lưu.');
        }
      }, error => {
        console.log(error);
      });
    });
  }

  saveWatingTime() {
    this.adminService.changeWatingTime(this.watingTime).subscribe(res => {
      if (res) {
        this.sweetAlertService.success('Thành công!', 'Thời gian quay số đã được cập nhật.');
      } else {
        this.sweetAlertService.error('Có lỗi!', 'Cập nhật thời gian quay số có lỗi khi lưu.');
      }
    }, error => {
      console.log(error);
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // Kiểm tra đuôi file
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      const fileZise = event.target.files[0].size;
      if (fileNameExtension !== 'jpg' && fileNameExtension !== 'jpeg' &&
        fileNameExtension !== 'png' && fileNameExtension !== 'JPG' &&
        fileNameExtension !== 'JPEG' && fileNameExtension !== 'PNG') {
        return this.sweetAlertService.warning('Tập tin không hợp lệ', 'Vui lòng tải lên tập tin có định dạng (.jpg), (.png), (.jpeg)');
      }

      // Kiểm tra dung lượng file không quá 5MB
      if (fileZise > 5242880) {
        return this.sweetAlertService.warning('Tập tin không hợp lệ', 'Tập tin tải lên không được quá 5MB.');
      }

      // Tiến hành lưu file
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.adminService.changeBackground(formData).subscribe(res => {
        if (res) {
          this.sweetAlertService.success('Thành công!', 'Hình nền đã được cập nhật.');

          // Nếu thành công thì đổ dữ liệu vào thẻ img
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e) => {
            this.backgroundUrl = e.target.result.toString();
          };
        } else {
          this.sweetAlertService.error('Có lỗi!', 'Cập nhật hình nền có lỗi khi lưu.');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.sweetAlertService.error('Có lỗi!', 'Không tìm thấy hình ảnh.');
    }
  }
}
