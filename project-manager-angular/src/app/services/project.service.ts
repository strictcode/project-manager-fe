import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { ProjectDTO } from '../models/project.dto';
import { UpdateProjectDTO } from '../models/update-project.dto.';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private projectsSubject$ = new BehaviorSubject<ProjectDTO[]>([]);

  public getProjects$ = this.projectsSubject$.asObservable();

  constructor(private http: HttpClient) {
  }

  searchForProjects() {
    this.http.get<ProjectDTO[]>('/api/Project').subscribe({
      next: (projects) => {
        this.projectsSubject$.next(projects);
      }
    })
  }

  getProjectById(id: string): Observable<ProjectDTO> {
    return this.http.get<ProjectDTO>('/api/Project/'+id);
  }

  createProject(model: UpdateProjectDTO): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>('/api/Project', model);
  }

  updateProject(model: UpdateProjectDTO, id: string): Observable<ProjectDTO> {
    return this.http.put<ProjectDTO>('/api/Project/' + id, model);
  }

}
