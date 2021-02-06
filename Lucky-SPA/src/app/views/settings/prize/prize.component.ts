import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Prize } from 'src/app/_core/_models/prize';
import { AdminService } from 'src/app/_core/_services/admin.service';
import { SweetAlertService } from 'src/app/_core/_services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.scss']
})
export class PrizeComponent implements OnInit {
  rootUrl = environment.rootUrl;
  prizeImgSrc = `${this.rootUrl}images/gift-icon.jpg`;
  prizes: Prize[] = [];
  defaultPrizeForm = { prizeID: '', image: '', prizeName: '', qty: '', seq: 1, spinTime: '', visible: true };
  prizeForm = this.fb.group({
    prizeID: [''],
    prizeName: ['', Validators.required],
    qty: ['', Validators.required],
    spinTime: ['', Validators.required],
    image: [''],
    visible: [true],
    seq: [1]
  });

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getData();
    console.log(this.prizeForm.value);
  }

  getData() {
    this.adminService.getAllPrizes().subscribe(res => {
      this.prizes = res;
    });
  }

  resetForm() {
    this.prizeForm.reset(this.defaultPrizeForm);
    this.prizeImgSrc = `${this.rootUrl}images/gift-icon.jpg`;
    console.log(this.prizeForm.value);
  }

  save() {
    console.log(this.prizeForm.value);
    if (this.prizeForm.value.prizeID) { // Trường hợp có prizeID --> Update
      this.adminService.updatePrize(this.prizeForm.value).subscribe(res => {
        if (res.success) {
          this.getData();
          this.resetForm();
          this.sweetAlertService.success('Success!', res.message);
        } else {
          this.sweetAlertService.error('Error!', res.message);
        }
      }, (error) => {
        console.log(error);
      });
    } else { // Trường hợp thêm mới --> Add
      this.adminService.addPrize(this.prizeForm.value).subscribe(res => {
        if (res.success) {
          this.getData();
          this.resetForm();
          this.sweetAlertService.success('Success!', res.message);
        } else {
          this.sweetAlertService.error('Error!', res.message);
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // Check file name extension
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      const fileZise = event.target.files[0].size;
      if (fileNameExtension !== 'jpg' && fileNameExtension !== 'jpeg'
        && fileNameExtension !== 'png' && fileNameExtension !== 'JPG'
        && fileNameExtension !== 'JPEG' && fileNameExtension !== 'PNG') {
        return this.sweetAlertService.warning('Invalid File Format', 'Allowed file extensions are .jpg, .png, .jpeg');
      }

      // Images cannot be larger than 5MB
      if (fileZise > 5242880) {
        return this.sweetAlertService.warning('Please select a File cannot be larger than 5MB');
      }

      // Read file as data url
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        this.prizeImgSrc = e.target.result.toString();
        this.prizeForm.controls.image.patchValue(e.target.result.toString());
      };
    }
  }

  switchPrizeVisible(prizeID: string) {
    this.adminService.switchPrizeVisible(prizeID).subscribe(res => console.log(res));
  }

  deletePrize(prizeID: string) {
    this.sweetAlertService.confirm('Delete Prize', 'Are you sure you want to delete this prize?', () => {
      this.adminService.deletePrize(prizeID).subscribe(res => {
        if (res) {
          this.getData();
          this.sweetAlertService.success('Success!', 'Prize was successfully deleted.');
        } else {
          this.sweetAlertService.error('Error!', 'Deleting prize failed on save.');
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  updatePrize(prize: Prize) {
    console.log('updatePrize', prize);
    // Cập nhật link hình ảnh
    if (prize.image) {
      this.prizeImgSrc = `${this.rootUrl}images/${prize.image}`;
    }
    this.prizeForm.patchValue(prize);
  }
}
