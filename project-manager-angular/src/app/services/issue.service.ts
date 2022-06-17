import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IssueDTO } from '../models/issue.dto';
import { UpdateIssueDTO } from '../models/update-issue.dto';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issuesSubject$ = new BehaviorSubject<IssueDTO[]>([]);

  public getIssues$ = this.issuesSubject$.asObservable();

  constructor(private http: HttpClient) {
  }

  searchForIssues() {
    this.http.get<IssueDTO[]>('/api/Issue').subscribe({
      next: (issues) => {
        this.issuesSubject$.next(issues);
      }
    })
  }

  getIssueById(id: string): Observable<IssueDTO> {
    return this.http.get<IssueDTO>('/api/Issue/'+id);
  }

  createIssue(model: UpdateIssueDTO): Observable<IssueDTO> {
    return this.http.post<IssueDTO>('/api/Issue', model);
  }

  updateIssue(model: UpdateIssueDTO, id: string): Observable<IssueDTO> {
    return this.http.put<IssueDTO>('/api/Issue/' + id, model);
  }

  patchStatus(id: string, statusId: number): Observable<IssueDTO> {
    return this.http.patch<IssueDTO>('/api/Issue/' + id + '/Status/'+ statusId, null);
  }


}
