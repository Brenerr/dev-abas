import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/Account';
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

  listAccounts: Account[] = [];
  bank!: Bank;

  FormAccount = this.fb.group({
    bankCode: [''],
    agency: ['', Validators.required],
    accountCode: ['', Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bank = this.data.bank;
    this.FormAccount.controls.bankCode.setValue(this.bank.code)
  }

  onSubmit(): void {
    if(this.FormAccount.invalid){
      this.FormAccount.markAllAsTouched();
      return;
    }
    this.listAccounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')!) : [];
    this.listAccounts.push(this.FormAccount.value)
    localStorage.setItem('account', JSON.stringify(this.listAccounts));
    this.FormAccount.reset();
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

}
