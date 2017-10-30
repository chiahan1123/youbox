import { Component } from '@angular/core';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  show = false;

  constructor(private progressService: ProgressService) {
    progressService.changeEmitter
      .subscribe(show => {
        this.show = show;
      });
  }

}
