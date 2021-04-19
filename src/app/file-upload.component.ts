import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// https://stackoverflow.com/questions/47936183/angular-file-upload
// https://academind.com/tutorials/angular-image-upload-made-easy/
// https://www.youtube.com/watch?v=qZ1EFnFOGvE
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  // fileToUpload!: File | any;

  selectedFile: File | any;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    this.selectedFile = (event.target.files[0] as File);

  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._httpClient.post('urls', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress' + Math.round(event.loaded / event.total! * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }




  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0)!;
  // }
}
