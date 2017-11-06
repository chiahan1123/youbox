import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SummaryItem } from './summaryItem';
import { ControlService } from '../control.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summaryItem: Observable<SummaryItem>;

  constructor(private controlService: ControlService) {
  }

  ngOnInit() {
    this.summaryItem = this.controlService.playItemObservable
      .map(playItem => new SummaryItem(playItem.from, playItem.title));
  }

}
