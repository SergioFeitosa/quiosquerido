import { Router } from '@angular/router';
import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatNumber } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { environment } from '../../environments/environment';
import { Produto } from '../produto/produto';
import { LoginService } from '../services/login.service';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import { MatSnackBar as MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  applicationVerifier: any;
  recaptchaVerifier: any;
  recapt: any;
  displayCode = 'none';
  teste = 'teste'
  otp!: number;
  verify: any;
  auth: any;
  app: any;
  response: any;

  displayStyle2: string = 'none'
  produto = {} as Produto;

  @Output() phoneNumberChangeEvent = new EventEmitter<number>();

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {

  }

  configCode = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputClass: 'my-custom-input',
    autofocus: "autofocus"
  };

  currentValue: string = '';

  ngOnInit() {

    this.app = initializeApp(environment.firebaseConfig);
    
    this.auth = getAuth();
    this.auth.languageCode = 'pt-Br';
    this.displayCode = 'none';

  }

  async getOtp() {

    window.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': () => {
      }
    });

    signInWithPhoneNumber(
      this.auth,
      this.phoneNumber,
      window.recaptchaVerifier,
    ).then( (confirmationResult) => {
      window.confirmationResult = confirmationResult;
      environment.telefone = this.phoneNumber
      environment.login = true;
      this.displayCode = 'block';
    }).catch((error) => {

      this.showMessage('Erro no numero do telefone. Tente Novamente!!!  ');
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
      interval(3000).subscribe(n => window.location.reload());
      this.router.navigate([''])
      
    })
  }

  onOtpChange(otp: string) {
    this.otp = +otp;
  }

  async handleClick() {

    window.confirmationResult.confirm(this.otp).then((result: any) => {

        const user = result.user;
        this.emitEvent();
        this.router.navigate(['']);
        environment.telefone = this.phoneNumber
        environment.login = true;

      }).catch((error: any) => {
        this.showMessage('Erro na verificação do código SMS');
        interval(3000).subscribe(n => window.location.reload());
        this.router.navigate([''])
    })
    this.loginService.login()
  }

  emitEvent() {
    this.phoneNumberChangeEvent.emit(this.phoneNumber);
  }

    showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar', 'custom-snackbar-panel'] 
    });
  }


}
