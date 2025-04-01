import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelSrvService } from '../srv/model-srv.service';
import { FuncModelSrvService } from '../srv/func-model-srv.service';

import { AppModel } from '../model/app-model';
import { AppFuncModel } from '../model/app-func-model';
import { catchError, of, switchMap } from 'rxjs';
import { BackSrvService } from '../srv/back-srv.service';

@Component({
  selector: 'app-go-in-redirect',
  imports: [],
  templateUrl: './go-in-redirect.component.html',
  styleUrl: './go-in-redirect.component.css',
})
export class GoInRedirectComponent implements OnInit {
  modelSrv: ModelSrvService = inject(ModelSrvService);
  backSrv: BackSrvService = inject(BackSrvService);
  funcModelSrv: FuncModelSrvService = inject(FuncModelSrvService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    /* Hay que pedir la información del user */
    this.backSrv.init();
//    const appFuncModel: AppFuncModel = new AppFuncModel();

    /* Por último se redirecciona a home */
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
