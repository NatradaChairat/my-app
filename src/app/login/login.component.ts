import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../register/register.component';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import '@firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  isSuccess = false;
  isNotSuccess = false;
  content = '';

  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          this.isSuccess = true;
          this.isNotSuccess = false;
          this.content = 'Login success!';
        }, err => {
          this.isSuccess = false;
          this.isNotSuccess = true;
          this.content = 'Email or Password is not incorrect.';
        });
    });
  }

}
