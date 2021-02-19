import { Component, OnInit } from '@angular/core';
import { Prize } from 'src/app/_core/_models/prize';
import { SpinData } from 'src/app/_core/_models/spin-data';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { MainService } from 'src/app/_core/_services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  isPrizeListVisible = false;
  prizes: Prize[];
  selectedPrize: Prize = {
    image: '',
    prizeID: 0,
    prizeName: 'MỜI CHỌN GIẢI',
    qty: 0,
    seq: 0,
    spinTime: 1,
    visible: true
  };
  spinData: SpinData[] = [];
  numberOfSpinAreas = 0;
  rootUrl = environment.rootUrl;
  isShowAllRecords = false;

  constructor(
    private adminService: AdminService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.getPrizeList();
  }

  getPrizeList() {
    this.adminService.getAllPrizes(false).subscribe(res => {
      res.unshift(this.selectedPrize);
      this.prizes = res;
    });
  }

  togglePrizeListVisible(flag?: boolean) {
    flag != null ? this.isPrizeListVisible = flag : this.isPrizeListVisible = !this.isPrizeListVisible;
  }

  selectPrize(prize: Prize) {
    this.togglePrizeListVisible(false);
    this.selectedPrize = prize;
    this.numberOfSpinAreas = prize.qty / prize.spinTime;
    this.spinData = [];
    this.getPrizeRecords(this.selectedPrize.prizeID, this.isShowAllRecords);
  }

  customCssClass() {
    let result = '';
    if (this.numberOfSpinAreas <= 1) {
      result = 'col-8 mb-3';
    } else if (this.numberOfSpinAreas <= 4) {
      result = 'col-6 mb-3';
    } else if (this.numberOfSpinAreas <= 6) {
      result = 'col-4 mb-3';
    } else {
      result = 'col-3 mb-3';
    }
    return result;
  }

  getPrizeRecords(prizeID: number, isShowAllRecords: boolean = false) {
    const cssClass = this.customCssClass();
    this.mainService.getPrizeRecords(prizeID, isShowAllRecords).subscribe(res => {
      res.forEach(item => {
        this.spinData.push({
          cssClass,
          empCode: item.empCode,
          empDept: item.empDept,
          empName: item.empName,
          prizeID
        });
      });
    });
  }
}
