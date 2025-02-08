import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelSrvService } from '../srv/model-srv.service';

@Component({
  selector: 'app-go-in-redirect',
  imports: [],
  templateUrl: './go-in-redirect.component.html',
  styleUrl: './go-in-redirect.component.css',
})
export class GoInRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
