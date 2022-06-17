import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IssueDTO } from 'src/app/models/issue.dto';
import { ProjectDTO } from 'src/app/models/project.dto';
import { StatusEnum } from 'src/app/models/status.enum';
import { UpdateProjectDTO } from 'src/app/models/update-project.dto.';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  showProjectModal = false;

  projectName!: string | undefined;

  editMode = false;

  projectToUpdate: ProjectDTO | undefined;

  public projects$ = this.projectService.getProjects$;

  constructor(private projectService: ProjectService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.projectService.searchForProjects();
  }

  createProject(): void {
    this.showProjectModal = true;
  }

  editProject(project: ProjectDTO): void {
    this.editMode = true;
    this.projectName = project.name;
    this.projectToUpdate = project;
    this.showProjectModal = true;
  }

  submitData(): void {

    if(!this.projectName){ return; }

    let data;
    let callback$;

    if(this.editMode && this.projectToUpdate){
      this.projectToUpdate.name = this.projectName;
      callback$ = this.projectService.updateProject(this.projectToUpdate, this.projectToUpdate.id);
    } else {
      data = new UpdateProjectDTO();
      data.name = this.projectName;
      callback$ = this.projectService.createProject(data);
    }


    callback$.subscribe({
      next: (data: ProjectDTO) => {
        const title = this.editMode ? 'Úprava proběhla úspěšně!' : 'Vytvoření proběhlo úspěšně!';
        const body = this.editMode ? 'Upravení projektu proběhlo v pořádku' : 'Vytvoření projektu proběhlo úspěšně';

        this.notification.success(title, body);
        this.projectService.searchForProjects();
        this.handleCancel();
      },
      error: (data: any) => {
        this.notification.error('Problém se serverem', 'Omlouváme se ale akce neproběhla v pořádku :-(');
      }
    });

  }

  handleCancel(): void {
    this.projectName = undefined;
    this.editMode = false;
    this.showProjectModal = false;
  }

  filterProjectIssues(issues: IssueDTO[]): IssueDTO[] {
    return issues.filter(issue => issue.statusId !== StatusEnum.Done);
  }

}
