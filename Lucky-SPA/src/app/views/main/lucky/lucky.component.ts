import { Component, OnInit } from '@angular/core';
import { Prize } from 'src/app/_core/_models/prize';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lucky',
  templateUrl: './lucky.component.html',
  styleUrls: ['./lucky.component.scss']
})
export class LuckyComponent implements OnInit {
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
  numberOfSpinAreas: number;
  rootUrl = environment.rootUrl;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getPrizeList();
  }

  getPrizeList() {
    this.adminService.getAllPrizes(false).subscribe(res => {
      res.unshift({
        image: '',
        prizeID: 0,
        prizeName: 'MỜI CHỌN GIẢI',
        qty: 0,
        seq: 0,
        spinTime: 1,
        visible: true
      });
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
    console.log(this.numberOfSpinAreas);
  }
}
