import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bank } from 'src/app/core/models/Bank';

export interface DialogData {
  bank: Bank;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  bank!: Bank;

  accountForm = this.fb.group({
    agency: '',
    account: ''
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bank = this.data.bank;
  }

  onSubmit(): void {
    this.accountForm.reset();
  }

}
