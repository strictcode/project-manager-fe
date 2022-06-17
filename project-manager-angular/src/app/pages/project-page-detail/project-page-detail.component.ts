import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueFormComponent } from 'src/app/components/issue-form/issue-form.component';
import { IssueDTO } from 'src/app/models/issue.dto';
import { ProjectDTO } from 'src/app/models/project.dto';
import { StatusEnum , StatusTranslations } from 'src/app/models/status.enum';
import { ProjectService } from 'src/app/services/project.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IssueService } from 'src/app/services/issue.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-project-page-detail',
  templateUrl: './project-page-detail.component.html',
  styleUrls: ['./project-page-detail.component.scss']
})
export class ProjectPageDetailComponent implements OnInit {

  project!: ProjectDTO;

  @ViewChild(IssueFormComponent) issueForm!: IssueFormComponent;

  newIssues: IssueDTO[] = [];

  inProgressIssues: IssueDTO[] = [];

  doneIssues: IssueDTO[] = [];

  StatusTranslations = StatusTranslations;

  StatusEnum = StatusEnum;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private issueService: IssueService, private notification: NzNotificationService) {
    this.route.data.subscribe({
      next: (data) => {
        this.project = data['project'];
        this.sortByStates();
      }
    })
  }

  ngOnInit(): void {
  }

  editIssue(issue: IssueDTO): void {
    this.issueForm.editIssue(issue, this.project.id);
  }


  showIssue(): void {
    this.issueForm.createIssue();
  }

  reloadData(): void {
    this.projectService.getProjectById(this.project.id).subscribe({
      next: (data) => {
        this.project = data;
        this.sortByStates();
      }, error: (err) => {

      }
    })
  }

  sortByStates(): void {
    this.newIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.New);
    this.inProgressIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.InProgress);
    this.doneIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.Done);
  }

  drop(event: CdkDragDrop<IssueDTO[]>, statusId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      this.issueService.patchStatus(event.previousContainer.data[event.previousIndex].id, statusId).subscribe({
        next: (data) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
          this.notification.success('Úprava proběhla úspěšně!', 'Změna stavu proběhla v pořádku.')
        }, error: (err) => {
          this.notification.success('Něco se nepovedlo!', 'Je nám líto, ale změna neproběhla v pořádku.')
        }
      })
    }
  }
}
