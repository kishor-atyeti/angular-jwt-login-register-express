import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  authService = inject(AuthService);
  user!: User;

  constructor() {

  }

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response)=>{
        console.log(response);
        this.user = response.data;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
