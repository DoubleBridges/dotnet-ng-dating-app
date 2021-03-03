import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AccountService} from '../_services/account.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.accountService.register(this.model).subscribe(_ => {
      this.cancel();
    }, error => {
      console.error(error);
      this.toastr.error(error.error)
    })
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
