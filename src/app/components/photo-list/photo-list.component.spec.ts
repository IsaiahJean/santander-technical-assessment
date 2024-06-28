import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoService } from '../../services/photo.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoService: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [PhotoListComponent],
      providers: [PhotoService, provideHttpClient(),
        provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display paginated photos', () => {
    const dummyPhotos = [{ id: 1, title: 'Photo 1', thumbnailUrl: 'url1' }, { id: 2, title: 'Photo 2', thumbnailUrl: 'url2' }];
    spyOn(photoService, 'getPhotos').and.returnValue(of(dummyPhotos));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.photo-item').length).toBe(2);
    expect(compiled.querySelector('.photo-item img').src).toContain('url1');
  });

  it('should fetch next page of photos', () => {
    const dummyPhotosPage1 = [{ id: 1, title: 'Photo 1', thumbnailUrl: 'url1' }];
    const dummyPhotosPage2 = [{ id: 2, title: 'Photo 2', thumbnailUrl: 'url2' }];

    spyOn(photoService, 'getPhotos').and.returnValues(of(dummyPhotosPage1), of(dummyPhotosPage2));

    fixture.detectChanges();

    component.nextPage();
    fixture.detectChanges();

    expect(component.photos).toEqual(dummyPhotosPage2);
  });
});


