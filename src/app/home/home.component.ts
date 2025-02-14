import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { ModelSrvService } from '../srv/model-srv.service';
import { FuncModelSrvService } from '../srv/func-model-srv.service';
import { AppModel } from '../model/app-model';
import { AppFuncModel } from '../model/app-func-model';

import { DocumentTocComponent } from '../document-toc/document-toc.component';

@Component({
  selector: 'app-home',
  imports: [DocumentTocComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  modelService: ModelSrvService = inject(ModelSrvService);
  appModel!: AppModel;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.modelService.appModel$.subscribe((model) => {
      if (model) this.appModel = model;
      else this.appModel = this.modelService.getAppModel();
    });
  }
}
