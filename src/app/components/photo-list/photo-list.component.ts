import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: any[] = [];
  page = 1;
  limit = 20;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getPhotos(this.page, this.limit).subscribe((data) => {
      this.photos = data;
    });
  }

  nextPage(): void {
    this.page++;
    this.loadPhotos();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPhotos();
    }
  }
}

