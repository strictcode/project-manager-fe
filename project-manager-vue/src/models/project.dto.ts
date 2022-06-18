import type { IssueDTO } from "./issue.dto";

export class ProjectDTO {

  public id!: string;

  public name!: string;

  public issues: IssueDTO[] = [];

  public createdName!: string;

  public createdDate!: Date;

  public modifiedName!: string;

  public modifiedDate!: Date;

}
