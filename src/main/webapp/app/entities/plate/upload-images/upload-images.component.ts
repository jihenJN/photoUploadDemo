import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/entities/plate/service/upload-file.service';

@Component({
  selector: 'jhi-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  @Output() imageUploaded: EventEmitter<string> = new EventEmitter<string>();
  selectedFiles: FileList | null = null;
  currentFile: File | undefined = undefined;
  progress = 0;
  message = '';
  fileUrl = '';
  fileInfos: Observable<any> | undefined;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: Event): void {
    this.selectedFiles = (event.target as HTMLInputElement).files;
  }

  upload(): void {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.progress = 0;

      this.currentFile = this.selectedFiles[0];
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body?.message || 'Upload successful';
            this.fileInfos = this.uploadService.getFiles();

            // Emit the file URL to the parent component
            this.imageUploaded.emit(this.message);
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
      );

      this.selectedFiles = null;
    }
  }
}
