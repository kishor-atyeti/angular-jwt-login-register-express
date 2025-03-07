import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  authService = inject(AuthService);
  injector = inject(Injector);
  isLoggedIn = this.authService.isLoggedIn();

  ngOnInit(): void {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, {injector: this.injector});
  }
}
