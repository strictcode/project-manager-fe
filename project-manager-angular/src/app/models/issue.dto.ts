import { StatusEnum } from "./status.enum";

export class IssueDTO {

  public id!: string;

  public summary!: string;

  public description!: string;

  public statusId!: StatusEnum;

  public reporter!: { mail: string; id: string;};

  public assignee!: { mail: string; id: string;};

}
