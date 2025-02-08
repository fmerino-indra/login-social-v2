import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelSrvService } from './srv/model-srv.service';
import { AppModel } from './model/app-model';
import { AppHeaderComponent } from "./app-header/app-header.component";
import { DocumentTocComponent } from "./document-toc/document-toc.component";
import { AppFuncModel } from './model/app-func-model';
import { FuncModelSrvService } from './srv/func-model-srv.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, DocumentTocComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'login-social-FMM-v2';
  // Obliga a inicializarlo y no quiero poner | undefined
  appModel: AppModel = {
    "authenticated": false,
    "jsessionid":''
  };

  appFuncModel!: AppFuncModel;
  modelService: ModelSrvService = inject(ModelSrvService);
  funcModelService: FuncModelSrvService = inject(FuncModelSrvService);
  ngOnInit(): void {
    this.appModel = this.modelService.cleanModel();
    this.appFuncModel = this.funcModelService.cleanModel();
  }
}
