import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginDTO } from 'src/app/models/login.dto';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isLoading = false;

  loginForm!: FormGroup;

  returnUrl = '';

  isProd = true;

  objectGuid = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const model: LoginDTO = this.loginForm.getRawValue();
    this.isLoading = true;
    // tslint:disable-next-line: forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.accountService.login(model).subscribe({
      next: (v) => {
        this.router.navigate(['admin','projects']);
        this.notification.success('Přihlášení proběhlo úspěšně!', 'Přesměrovávám na dashboard s projekty.')
        // this.accountService.getLoggedUser$.subscribe({
        //   next: (response) => {
        //
        //   }
        // })
      },
      error: (e) => {
        this.notification.error('Přihlášení se nezdařilo!', 'Zadal jste špatné přihlašovací údaje, zkuste zkontrolovat vaše údaje a přihlásit se znovu.')
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
