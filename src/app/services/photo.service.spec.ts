import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';
import { provideHttpClient } from '@angular/common/http';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PhotoService,provideHttpClient(),
        provideHttpClientTesting() ]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch photos with pagination', () => {
    const dummyPhotos = [{ id: 1, title: 'Photo 1', thumbnailUrl: 'url1' }, { id: 2, title: 'Photo 2', thumbnailUrl: 'url2' }];

    service.getPhotos(1, 2).subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne(req => req.url === 'https://jsonplaceholder.typicode.com/photos' && req.params.has('_page') && req.params.has('_limit'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });
});


