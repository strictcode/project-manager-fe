import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectDTO } from '../models/project.dto';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailResolver implements Resolve<ProjectDTO | undefined> {

  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectDTO | undefined> {
    const id = route.paramMap.get('id');
    if(!id) {
      return of(undefined);
    }
    return this.projectService.getProjectById(id);
  }
}
