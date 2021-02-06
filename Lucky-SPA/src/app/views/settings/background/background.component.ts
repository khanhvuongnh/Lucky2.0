import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { MainService } from 'src/app/_core/_services/main.service';
import { SweetAlertService } from 'src/app/_core/_services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  backgroundUrl = '';
  defaultBackgroundUrl = '../../../../assets/background.jpg';

  constructor(
    private sweetAlertService: SweetAlertService,
    private adminService: AdminService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // Kiểm tra đuôi file
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      const fileZise = event.target.files[0].size;
      if (fileNameExtension !== 'jpg' && fileNameExtension !== 'jpeg' &&
        fileNameExtension !== 'png' && fileNameExtension !== 'JPG' &&
        fileNameExtension !== 'JPEG' && fileNameExtension !== 'PNG') {
        return this.sweetAlertService.warning('Invalid File Format', 'Allowed file extensions are .jpg, .png, .jpeg');
      }

      // Kiểm tra dung lượng file không quá 5MB
      if (fileZise > 5242880) {
        return this.sweetAlertService.warning('Invalid File Size', 'File size must be 5MB or smaller.');
      }

      // Tiến hành lưu file
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.adminService.changeBackground(formData).subscribe(res => {
        if (res) {
          this.sweetAlertService.success('Success!', 'Background was successfully uploaded.');

          // Nếu thành công thì đổ dữ liệu vào thẻ img
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e) => {
            this.backgroundUrl = e.target.result.toString();
          };
        } else {
          this.sweetAlertService.error('Error!', 'Uploading background failed on save.');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.sweetAlertService.error('Image not found.');
    }
  }
}
