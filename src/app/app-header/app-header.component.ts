import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModelSrvService } from '../srv/model-srv.service';

@Component({
  selector: 'app-app-header',
  imports: [RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  modelService: ModelSrvService = inject(ModelSrvService);
}
