import { Component, Input, OnDestroy, OnInit, NgZone } from '@angular/core';
import { SummaryItem } from './summaryItem';
import { ControlService } from '../control.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  @Input() summaryItem: SummaryItem;

  private subscription: Subscription;

  constructor(private controlService: ControlService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.subscription = this.controlService.playItemObservable
      .subscribe(playItem =>
        this.ngZone.run(() => this.summaryItem = new SummaryItem(playItem.from, playItem.title)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
