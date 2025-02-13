import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { ModelSrvService } from './srv/model-srv.service';
import { AppModel } from './model/app-model';
import { AppHeaderComponent } from "./app-header/app-header.component";
import { DocumentTocComponent } from "./document-toc/document-toc.component";
import { AppFuncModel } from './model/app-func-model';
import { FuncModelSrvService } from './srv/func-model-srv.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'login-social-FMM-v2';
  // Obliga a inicializarlo y no quiero poner | undefined
  appModel!: AppModel;
  appFuncModel!: AppFuncModel;
  modelService: ModelSrvService = inject(ModelSrvService);
  funcModelService: FuncModelSrvService = inject(FuncModelSrvService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.appModel = this.modelService.loadModel();
    if (this.appModel.isAuthenticated()) {
      this.redirectHome();
    }
    this.appModel = this.modelService.cleanModel();
    this.appFuncModel = this.funcModelService.cleanModel();
    //Hay que determinar el flujo
    // Comprobar que el usuario está logado
    //  No -> debe ir a estado-no-logado
    //        Hay que crear este estado con el botón login, etc.
    //  Sí -> go-in-redirect
  }

  redirectHome() {
    this.router.navigate(['/home']);
  }
}
