import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IssueDTO } from 'src/app/models/issue.dto';
import { UpdateIssueDTO } from 'src/app/models/update-issue.dto';
import { AccountService } from 'src/app/services/account.service';
import { IssueService } from 'src/app/services/issue.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {

  @Input() projectId: string | undefined;

  @Output() formCompleted = new EventEmitter();

  showIssueModal = false;

  editMode = false;

  issueForm!: FormGroup;

  public projects$ = this.projectService.getProjects$;

  public users$ = this.accountService.getUsers$;

  constructor(
     private projectService: ProjectService,
     private accountService: AccountService,
     private issueService: IssueService,
     private notification: NzNotificationService,
     private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectService.searchForProjects();
    this.accountService.searchForUsers();
    this.buildForm();

    if(this.projectId){
      this.issueForm.patchValue({projectId: this.projectId});
    }

  }

  buildForm(): void {
    this.issueForm = this.fb.group({
      id: [null, []],
      summary: [null, []],
      description: [null, []],
      statusId: [null, []],
      assigneeId: [null, []],
      projectId: [null, []],
    });
  }

  createIssue(): void {
    this.showIssueModal = true;
  }

  editIssue(issue: IssueDTO, projectId: string): void {
    this.showIssueModal = true;
    this.editMode = true;

    const data = new UpdateIssueDTO();
    data.assigneeId = issue.assignee.id;
    data.id = issue.id;
    data.summary = issue.summary;
    data.description = issue.description;
    data.statusId = issue.statusId;
    data.projectId = projectId;

    this.issueForm.setValue(data);

  }

  submitData(): void {
    let data = this.issueForm.getRawValue() as UpdateIssueDTO;

    let callback$ = this.editMode ? this.issueService.updateIssue(data, data.id) : this.issueService.createIssue(data);

    callback$.subscribe({
      next: (data: IssueDTO) => {
        const title = this.editMode ? 'Úprava proběhla úspěšně!' : 'Vytvoření proběhlo úspěšně!';
        const body = this.editMode ? 'Upravení issue proběhlo v pořádku' : 'Vytvoření issue proběhlo úspěšně';

        this.notification.success(title, body);
        this.formCompleted.next(null);
        this.handleCancel();
      },
      error: (data: any) => {
        this.notification.error('Problém se serverem', 'Omlouváme se ale akce neproběhla v pořádku :-(');
      }
    });

  }

  handleCancel(): void {
    this.editMode = false;
    this.showIssueModal = false;
  }

}
