import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  spinner$: Observable<boolean>;
  isOpen= false;

  constructor(private readonly _spinnerService: SpinnerService){
    this.spinner$ = this._spinnerService.getObservable();
  }

  ngOnInit(): void {
    this.spinner$.subscribe(value => {
      this.isOpen= value;
    });
  }

}
