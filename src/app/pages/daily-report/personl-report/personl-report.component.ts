import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalDataSource} from 'ng2-smart-table';
import {isUndefined} from 'util';
import {ApiService} from '../../../@core/data/api.service';

@Component({
  selector: 'ngx-personl-report',
  // templateUrl: './personl-report.component.html',
  template: `
    <nb-card>
      <nb-card-header>
        {{ Name }}
      </nb-card-header>

      <nb-card-body>
        <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)"
                         (createConfirm)="onCreateConfirm($event)" (editConfirm)="onEditConfirm($event)">
        </ng2-smart-table>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
      nb-card {
          transform: translate3d(0, 0, 0);
      }
  `],
})
export class PersonlReportComponent implements OnInit {

  @Input() ReportList: ReportDataItem;
  @Input() Name: string;
  @Input() taskDate: string;
  // Test: Array<String>;
  public daily_report_url: string;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // _id: {
      //   title: '类型',
      //   type: 'string',
      //   // editable: false,
      // },
      task_type: {
        title: '类型',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
                  {value: '测试代码', title: '测试代码'},
                  {value: '开发特性', title: '开发特性'},
                  {value: '解决问题', title: '解决问题'},
            ],
          },
        },
        width: '10%',
        // valuePrepareFunction: (value) => { return this._sanitizer.bypassSecurityTrustHtml(this.input); },

      },
      task_content: {
        title: '内容',
        type: 'string',
        width: '50%',
        editor: {
          type: 'textarea',
        },
      },
      task_cost: {
        title: '用时',
        type: 'text',
        width: '5%',
        editor: {
          type: 'textarea',
        },
      },
      task_progress: {
        title: '进度',
        type: 'string',
        width: '5%',
        editor: {
          type: 'textarea',
        },
      },
      task_risk: {
        title: '风险',
        type: 'string',
        editor: {
          type: 'textarea',
        },
      },
    },
    mode: 'inline',
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private http: Http, private service: ApiService) {
    this.daily_report_url = this.service.getUrl('daily_report');
    // const data = this.service.getData();
    // this.http.get('http://127.0.0.1:8000/demand/').subscribe((res: Response) => {
    //   console.log(res);
    //   const data = res.json();
    //   // console.log(data);
    //   this.source.load(data);
    // });
    // console.log(this.ReportList);
    // this.source.load(this.ReportList);
  }
  OnChanges(changes: SimpleChanges): void {
    // console.log(typeof(changes.ReportList.currentValue));
    // if (typeof(changes.ReportList.currentValue) !== 'undefined') {
    //   console.log(changes.ReportList.currentValue);
    //   this.source.load(changes.ReportList.currentValue);
    // }
    // console.log(changes);
    // console.log(isUndefined(changes.ReportList));
    if (!isUndefined(changes.ReportList)) {
      // console.log('existed');
      this.source.load(changes.ReportList.currentValue);
    } else {
      this.source.empty();
    }
    // console.log(changes.ReportList.currentValue);
  }
  onDeleteConfirm(event): void {
    // console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      const data = {'_id': event.data._id};
      // console.log(data);
      this.http.delete(this.daily_report_url, {params: data}).subscribe(
        (res: Response) => {
          // let data = res;
          // console.log(data);
          event.confirm.resolve();
        },
        (err: any) => {
          // console.log(err);
          alert(err);
        },
      );
    } else {
      event.confirm.reject();
    }
  }

  getUUID(): string {
    return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4()
    + '-' + this.S4() + this.S4() + this.S4());
  }
  S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  onCreateConfirm(event): void {
    // console.log(event.newData);
    const task_id = this.getUUID();
    // console.log(task_id);
    const body = {
      '_id': task_id,
      'task_owner': this.Name,
      'task_cost': event.newData['task_cost'],
      'task_type': event.newData['task_type'],
      'task_risk': event.newData['task_risk'],
      'task_content': event.newData['task_content'],
      'task_date': this.taskDate,
      'task_progress': event.newData['task_progress'],
    };
    // console.log(body);

    this.http.post(this.daily_report_url, body).subscribe(
      (res: Response) => {
        // let data = res;
        // console.log(data);
        event.confirm.resolve();
      },
      (err: any) => {
        // console.log(err);
        alert(err);
      },
    );
    // this.source.prepend(event.newData);
  }
  onEditConfirm(event): void {
    // console.log(event);
    // let oldData = event.data;
    // let newData = event.newData;
    const body = {
      '_id': event.newData['_id'],
      'task_owner': this.Name,
      'task_cost': event.newData['task_cost'],
      'task_type': event.newData['task_type'],
      'task_risk': event.newData['task_risk'],
      'task_content': event.newData['task_content'],
      'task_date': this.taskDate,
      'task_progress': event.newData['task_progress'],
    };
    // console.log(body);
    this.http.put(this.daily_report_url, body).subscribe(
      (res: Response) => {
        // let data = res;
        // console.log(data);
        event.confirm.resolve();
      },
      (err: any) => {
        // console.log(err);
        alert(err);
      },
      );
  }

  ngOnInit() {
  }

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
