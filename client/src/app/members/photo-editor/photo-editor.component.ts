import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../_models/member';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AccountService} from '../../_services/account.service';
import {take} from 'rxjs/operators';
import {User} from '../../_models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropzone = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountSercvice : AccountService) {
    this.accountSercvice.currentUser$.pipe(take(1)).subscribe(user => this.user = user );
  }

  ngOnInit(): void {
    this.intializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzone = e;
  }

  intializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/add-photo`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

}
