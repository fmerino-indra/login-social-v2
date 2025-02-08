import { Component, OnInit, inject } from '@angular/core';
import { ModelSrvService } from '../srv/model-srv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModel } from '../model/app-model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  modelSrv: ModelSrvService = inject(ModelSrvService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('Los queryParams');
      console.log(params);
      console.log(typeof params);

      const appModel: AppModel = new AppModel();

      for (var key in params) {
        console.log(key);
        if (key === 'JSESSIONID') {
          appModel.jsessionid = params[key];
          appModel.authenticated = true;
        }

      }

      localStorage.setItem(
        'appModel',
        JSON.stringify(appModel)
      );
    });
  }
}
