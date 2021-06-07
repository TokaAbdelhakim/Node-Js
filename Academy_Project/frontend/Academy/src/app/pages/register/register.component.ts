import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Userdata} from 'src/app/interfaces/userdata'
import{UserserviceService} from 'src/app/services/userservice.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    newuser:Userdata = {
    FirstName:'', 
    LastName:'', 
    country:'',    
    email:'',
    username:'',
    birthdate:'',
    password:'',
    status:'',
    school:''
  }
  msg: string = ''
  constructor(private _user:UserserviceService) { }

  ngOnInit(): void {
  }
  onCreate(data : any){
    
    if (data.valid){
      console.log(data.value)
      this._user.registerUser(this.newuser).subscribe(res=>{
        // if (res.apiStatus){
          console.log('add')
          this.msg = " user successfuly added"
        data.reset()
        // }
      })
    }
    else{
      this.msg = "chceck your inputs"
    }
  }
}
