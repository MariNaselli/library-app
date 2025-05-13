import { Component, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginDto } from '../login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email="";
  password="";
  errorMessage = "";


  constructor(private authService:AuthService){}

  onSubmit(){
    const credentials: LoginDto = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({next:(res)=>{
      console.log("Token recibido",res.access_token);
      this.errorMessage = "";
    },
    error:(err)=>{
      console.log("Error al iniciar sesión", err);
      // if (err.status === 404) {
      //   this.errorMessage = "El correo electrónico no está registrado.";
      // } else if (err.status === 401) {
      //   this.errorMessage = "La contraseña es incorrecta.";
      // } else {
      //   this.errorMessage = "Error inesperado. Intenta nuevamente.";
      // }
    },
  });
  }
}
