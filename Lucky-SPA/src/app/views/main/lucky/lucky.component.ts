import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Prize } from 'src/app/_core/_models/prize';
import { SpinData } from 'src/app/_core/_models/spin-data';
import { SpinRemain } from 'src/app/_core/_models/spin-remain';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { MainService } from 'src/app/_core/_services/main.service';
import { SweetAlertService } from 'src/app/_core/_services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lucky',
  templateUrl: './lucky.component.html',
  styleUrls: ['./lucky.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LuckyComponent implements OnInit {
  $winnerAudio: HTMLAudioElement;
  $countingAudio: HTMLAudioElement;
  @ViewChild('winnerAudio') set winnerAudio(winnerAudioRef: ElementRef<HTMLAudioElement>) {
    this.$winnerAudio = winnerAudioRef.nativeElement;
  }
  @ViewChild('countingAudio') set countingAudio(countingAudioRef: ElementRef<HTMLAudioElement>) {
    this.$countingAudio = countingAudioRef.nativeElement;
  }
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
  numberOfSpinAreas = 0;
  rootUrl = environment.rootUrl;
  spinData: SpinData[] = [];
  empCount = 0;
  watingTime = 0;
  isResultButtonShow = false;
  isResultContentShow = false;
  spinRemain: SpinRemain = {} as SpinRemain;

  constructor(
    private adminService: AdminService,
    private sweetAlertService: SweetAlertService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.getPrizeList();
    this.getEmpCount();
    this.getWatingTime();
  }

  getPrizeList() {
    this.adminService.getAllPrizes(false).subscribe(res => {
      res.unshift(this.selectedPrize);
      this.prizes = res;
    });
  }

  getEmpCount() {
    this.adminService.getEmployeeCount().subscribe(res => this.empCount = res);
  }

  getWatingTime() {
    this.adminService.getWatingTime().subscribe(res => this.watingTime = res * 1000);
  }

  togglePrizeListVisible(flag?: boolean) {
    flag != null ? this.isPrizeListVisible = flag : this.isPrizeListVisible = !this.isPrizeListVisible;
  }

  toggleResult = () => this.isResultContentShow = !this.isResultContentShow;

  resetResult = () => this.selectPrize(this.selectedPrize);

  checkSpinRemain = () => this.mainService.checkSpinRemain(this.selectedPrize.prizeID).subscribe(res => this.spinRemain = res);

  selectPrize(prize: Prize) {
    this.togglePrizeListVisible(false);
    this.selectedPrize = prize;
    this.numberOfSpinAreas = prize.qty / prize.spinTime;
    this.isResultButtonShow = false;
    this.isResultContentShow = false;
    this.checkSpinRemain();

    this.spinData = [];
    const cssClass = this.customCssClass();
    const empCode = '';
    const prizeID = 0;
    const empDept = '';
    const empName = '';
    for (let index = 0; index < this.numberOfSpinAreas; index++) {
      this.spinData.push({ empCode, cssClass, prizeID, empDept, empName });
    }
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

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  spinNumbers() {
    // Kiểm tra đã upload data chưa
    if (this.empCount === 0) {
      return this.sweetAlertService.warning('No Data', 'Please upload data to continue.');
    }

    // Kiểm tra đã chọn giải hay chưa
    if (this.selectedPrize.prizeID === 0) {
      return this.sweetAlertService.warning('Invalid Prize', 'Please choose a prize to continue.');
    }

    // Kiểm tra giải đã quay hết chưa
    if (!this.spinRemain.isValid) {
      return this.sweetAlertService.warning('Invalid Prize', 'Prize has already been done.');
    }

    // Reset giao diện
    this.resetResult();

    // Bật nhạc chờ
    this.$countingAudio.loop = true;
    this.$countingAudio.play();

    // Cho số nhảy loạn xạ
    const intervals = [];
    for (let i = 0; i < this.numberOfSpinAreas; i++) {
      const rndId = setInterval(() => {
        const rndVal = this.getRndInteger(10000, 99999);
        this.spinData[i].empCode = rndVal.toString();
      }, 50);
      intervals.push(rndId);
    }

    // Gọi API lấy danh sách trúng giải
    setTimeout(() => {
      this.mainService.getRandomPrizeRecords(this.selectedPrize.prizeID, this.numberOfSpinAreas).subscribe(res => {
        intervals.forEach(clearInterval);
        this.$countingAudio.pause();
        this.$winnerAudio.play();
        this.spinData.forEach((item, index) => {
          item.empCode = res[index].empCode;
          item.empDept = res[index].empDept;
          item.empName = res[index].empName;
        });
        this.isResultButtonShow = true;
        this.checkSpinRemain();
      });
    }, this.watingTime);
  }
}
