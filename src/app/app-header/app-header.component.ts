import { Component, inject, OnInit } from '@angular/core';
import { ModelSrvService } from '../srv/model-srv.service';
import { BackSrvService } from '../srv/back-srv.service';
import { Router, RouterLink } from '@angular/router';
import { AppModel } from '../model/app-model';

@Component({
  selector: 'app-app-header',
  imports: [RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit {
  modelService: ModelSrvService = inject(ModelSrvService);
  backService: BackSrvService = inject(BackSrvService);
  appModel!: AppModel;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.appModel = this.modelService.loadModel();
  }
  onLogout() {
    this.backService.postLogout();
    this.navigate();
  }

  private navigate() {
    this.router.navigate(['/']);
  }
}
