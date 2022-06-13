import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDTO } from 'src/app/models/project.dto';

@Component({
  selector: 'app-project-page-detail',
  templateUrl: './project-page-detail.component.html',
  styleUrls: ['./project-page-detail.component.scss']
})
export class ProjectPageDetailComponent implements OnInit {

  project!: ProjectDTO;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe({
      next: (data) => {
        this.project = data['project'];
      }
    })
  }

  ngOnInit(): void {
  }

}
