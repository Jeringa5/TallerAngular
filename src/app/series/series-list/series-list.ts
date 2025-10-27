import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-list',
  standalone: false,
  templateUrl: './series-list.html',
  styleUrls: ['./series-list.css']
})
export class SeriesList implements OnInit {
  series: Serie[] = [];
  selectedSerie?: Serie;
  averageSeasons = 0;
  errorMessage = '';

  constructor(private readonly seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe({
      next: (series) => {
        this.errorMessage = '';
        this.series = series;
        this.selectedSerie = series[0];
        this.averageSeasons = this.calculateAverageSeasons(series);
      },
      error: (error) => {
        console.error('Error loading series', error);
        this.series = [];
        this.selectedSerie = undefined;
        this.averageSeasons = 0;
        this.errorMessage = 'No pudimos cargar la información de las series. Intenta nuevamente más tarde.';
      }
    });
  }

  onSelectSerie(serie: Serie): void {
    this.selectedSerie = serie;
  }

  private calculateAverageSeasons(series: Serie[]): number {
    if (!series.length) {
      return 0;
    }
    const total = series.reduce((sum, { seasons }) => sum + seasons, 0);
    return parseFloat((total / series.length).toFixed(2));
  }
}
