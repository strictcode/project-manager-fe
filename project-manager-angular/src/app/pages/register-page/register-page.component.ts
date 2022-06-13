import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginDTO } from 'src/app/models/login.dto';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  isLoading = false;

  registerForm!: FormGroup;

  returnUrl = '';

  isProd = true;

  objectGuid = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const model: LoginDTO = this.registerForm.getRawValue();
    this.isLoading = true;
    // tslint:disable-next-line: forin
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    this.accountService.register(model).subscribe({
      next: (v) => {
        this.notification.success('Registrace proběhla úspěšně!', 'Vaše registrace proběhla v pořádku, nyní budete přesměrování na hlavní stránku.');
        this.router.navigate(['auth','login']);
      },
      error: (e) => {
        this.notification.error('Registrace se nepovedla!', 'Zkuste zadat údaje správně');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
