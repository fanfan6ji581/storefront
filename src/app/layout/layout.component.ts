import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/root.reducers';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'sf-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    // init setting for toastr
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

}
