export type RootJobs = Jobs[];

export interface Jobs {
  jobName: string;
  jobGroup: string;
  syncJob: boolean;
  dialogsDeleteJob: boolean;
  accountId: number;
  accountUserName: string;
  accountFirstName: string;
  accountLastName: string;
  accountPhone: string;
  deleteEnable: boolean;
  triggerList: TriggerList[];
}

export interface TriggerList {
  trigger: string;
  startTime: string;
  nextFireTime: string;
  previousFireTime: string;
  cronExpression: string;
  cronExpressionSummary: string;
  triggerState: string;
}

export enum TriggerState {
  NONE,
  NORMAL,
  PAUSED,
  COMPLETE,
  ERROR,
  BLOCKED,
}
