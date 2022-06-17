import { Component, Input, OnInit } from '@angular/core';
import { IssueDTO } from 'src/app/models/issue.dto';

@Component({
  selector: 'app-issue-component',
  templateUrl: './issue-component.component.html',
  styleUrls: ['./issue-component.component.scss']
})
export class IssueComponentComponent implements OnInit {

  @Input() issue!: IssueDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
