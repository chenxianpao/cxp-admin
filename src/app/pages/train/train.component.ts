import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalDataSource} from 'ng2-smart-table';
import { ApiService } from '../../@core/data/api.service';

@Component({
  selector: 'ngx-train',
  templateUrl: './train.component.html',
  styles: [`
      nb-card {
          transform: translate3d(0, 0, 0);
      }
  `],
})
export class TrainComponent implements OnInit {

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
      _id: {
        title: '序号',
        type: 'number',
        editable: false,
        sort: true,
        sortDirection: 'desc',
      },
      title: {
        title: '主题',
        type: 'string',
      },
      content: {
        title: '内容',
        type: 'string',
      },
      lecturer: {
        title: '讲师',
        type: 'string',
      },
      time: {
        title: '时间',
        type: 'string',
      },
      duration: {
        title: '课时',
        type: 'string',
      },
      students: {
        title: '参与人员',
        type: 'string',
      },
      annex: {
        title: '附件',
        type: 'string',
      },
    },
    mode: 'inline',
  };

  source: LocalDataSource = new LocalDataSource();
  public train_url: string;
  // public train_url: string = 'http://127.0.0.1:8000/train/';

  constructor(private http: Http, private service: ApiService) {
    // const data = this.service.getData();
    this.train_url = this.service.getUrl('train');
    // console.log(this.train_url);
    this.http.get(this.train_url).subscribe(
      (res: Response) => {
        // console.log(res);
        const data = res.json();
        // console.log(data);
        this.source.load(data);
      },
      (err: any) => {
        // console.log(err);
        alert(err);
      },
    );
    // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    // console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      const data = {'_id': event.data._id};
      // console.log(data);
      this.http.delete(this.train_url, {params: data}).subscribe(
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
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    // console.log(event.newData);
    // const d = new URLSearchParams();
    // d.append('hostname', event.newData['hostname']);
    // d.append('hostname', event.newData['hostname']);
    // d.append('hostname', event.newData['hostname']);
    // d.append('hostname', event.newData['hostname']);
    const body = {
      '_id': event.newData['_id'],
      'title': event.newData['title'],
      'content': event.newData['content'],
      'lecturer': event.newData['lecturer'],
      'time': event.newData['time'],
      'duration': event.newData['duration'],
      'students': event.newData['students'],
      'annex': event.newData['annex'],
    };
    // console.log(body);
    // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    // // let _data = createPostSearchParams(d);
    // let myParams = new URLSearchParams();
    // myParams.set('hostname', event.newData['hostname']);
    // myParams.set('ip_address', event.newData['ip_address']);
    // myParams.set('cluster', event.newData['cluster']);
    // myParams.set('use_desc', event.newData['use_desc']);

    // let cxp = new RequestOptions({headers: headers});
    this.http.post(this.train_url, body).subscribe(
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
      'title': event.newData['title'],
      'content': event.newData['content'],
      'lecturer': event.newData['lecturer'],
      'time': event.newData['time'],
      'duration': event.newData['duration'],
      'students': event.newData['students'],
      'annex': event.newData['annex'],
    };
    // console.log(body);


    this.http.put(this.train_url, body).subscribe(
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
