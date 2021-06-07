import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavComponent } from './shared/nav/nav.component';
import { SliderComponent } from './shared/slider/slider.component';
import { AboutsectionComponent } from './shared/aboutsection/aboutsection.component';
import { ContactformComponent } from './shared/contactform/contactform.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    SliderComponent,
    AboutsectionComponent,
    ContactformComponent,
    FooterComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
