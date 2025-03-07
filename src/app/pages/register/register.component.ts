import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  router = inject(Router);
  authService = inject(AuthService);

  form: FormGroup;

    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      });
    }

    onSubmit() {
      if (this.form.valid) {
        this.authService.register(this.form.value).subscribe({
          next: (response) => {
            this.router.navigate(['login']);
          }
        });
      }
    }

}
