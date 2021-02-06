import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isHiddenAreaVisible = false;
  isBtnBgActive = false;
  backgroundUrl = '';
  defaultBackgroundUrl = '../../../../assets/background.jpg';

  constructor(private adminService: AdminService) { }

  ngOnInit() {
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

  onBtnBgClick() {
    this.isBtnBgActive = !this.isBtnBgActive;
  }
}
