import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesList } from './series-list';
import { SeriesService } from '../series.service';
import { of } from 'rxjs';
import { Serie } from '../serie';

const mockSeries: Serie[] = [
  {
    id: 1,
    name: 'Mock Series A',
    channel: 'Mock Channel',
    seasons: 3,
    description: 'Description A',
    webpage: 'https://example.com/a',
    poster: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Mock Series B',
    channel: 'Mock Channel B',
    seasons: 5,
    description: 'Description B',
    webpage: 'https://example.com/b',
    poster: 'https://via.placeholder.com/150'
  }
];

class SeriesServiceStub {
  getSeries() {
    return of(mockSeries);
  }
}

describe('SeriesList', () => {
  let component: SeriesList;
  let fixture: ComponentFixture<SeriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesList],
      providers: [{ provide: SeriesService, useClass: SeriesServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load series data on init', () => {
    expect(component.series.length).toBe(mockSeries.length);
    expect(component.selectedSerie).toEqual(mockSeries[0]);
    expect(component.errorMessage).toBe('');
  });
});
