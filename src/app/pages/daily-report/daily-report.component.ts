import { Component, OnInit } from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {Http, Response} from '@angular/http';
// import {formatDate} from "@angular/common";

@Component({
  selector: 'ngx-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss'],
})
export class DailyReportComponent {
  ReporterInfo: Array<ReporterData>;
  reportDate: string;
  reportUsers: Array<string>;
  public daily_report_url: string = '/daily_report/';
  constructor(private http: Http) {
    // this.ReporterData = {reporter: [{task_type: 'a', task_content: 'a', task_cost: 'a', task_risk: 'a'},
    //   {task_type: 'b', task_content: 'b', task_cost: 'b', task_risk: 'b'}],
    // 'ddd': [{task_type: 'c', task_content: 'c', task_cost: 'c', task_risk: 'c'},
    //   {task_type: 'd', task_content: 'd', task_cost: 'd', task_risk: 'd'}],
    // };
    // let tmp: ReportDataItem = ;
    // console.log(formatDate(new Date().getTime()));
    // let a = new Date().toLocaleDateString('yyyy-MM-dd');
    // console.log(a);
    this.reportDate = this.getCurrentDate();
    this.reportUsers = ['ssr', 'zjx', 'txm', 'cxp'];
    this.http.get(this.daily_report_url,
      {params: {user_list: this.reportUsers, task_date: this.reportDate}}).subscribe(
      (res: Response) => {
        let data = res.json();
        console.log(data);
        this.ReporterInfo = data;
      },
      (err: any) => {
        console.log(err);
        alert(err);
      },
      );
    // this.ReporterInfo = [
    //   {
    //     reporter_name: 'cxp',
    //     reporter_data: [{task_type: 'a', task_content: 'a', task_cost: 'a', task_risk: 'a'},
    //       {task_type: 'b', task_content: 'b', task_cost: 'b', task_risk: 'b'}],
    //   },
    //   {
    //     reporter_name: 'cxp1',
    //     reporter_data: [{task_type: 'c', task_content: 'c', task_cost: 'c', task_risk: 'c'},
    //       {task_type: 'd', task_content: 'd', task_cost: 'd', task_risk: 'd'}],
    //   },
    //   {
    //     reporter_name: 'cxp3',
    //     reporter_data: [{task_type: 'c', task_content: 'c', task_cost: 'c', task_risk: 'c'},
    //       {task_type: 'd', task_content: 'd', task_cost: 'd', task_risk: 'd'}]
    //   },
    //   {
    //     reporter_name: 'cxp4',
    //     reporter_data: [{task_type: 'c', task_content: 'c', task_cost: 'c', task_risk: 'c'},
    //       {task_type: 'd', task_content: 'd', task_cost: 'd', task_risk: 'd'}]
    //   },
    // ];
  }
  checkDateTime(event): void {
    const dataTime = event;
    this.http.get(this.daily_report_url,
      {params: {user_list: this.reportUsers, task_date: dataTime}}).subscribe(
      (res: Response) => {
        let data = res.json();
        console.log(data);
        this.ReporterInfo = data;
      },
      (err: any) => {
        console.log(err);
        alert(err);
      },
    );
  }
  getCurrentDate(): string {
    const date = new Date();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
  // ngOnInit() {
  // }

}

class ReporterData {
  reporter_name: string;
  reporter_data: Array<ReportDataItem>;
}

class ReportDataItem {
  _id: string;
  task_date: string;
  task_progress: string;
  task_type: string;
  task_content: string;
  task_cost: string;
  task_risk: string;
}