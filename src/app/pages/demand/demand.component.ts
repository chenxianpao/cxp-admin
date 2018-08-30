import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalDataSource} from 'ng2-smart-table';
import {ApiService} from "../../@core/data/api.service";

@Component({
  selector: 'ngx-demand',
  templateUrl: './demand.component.html',
  styles: [`
      nb-card {
          transform: translate3d(0, 0, 0);
      }
  `],
})
export class DemandComponent implements OnInit {

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
        title: '需求编号',
        type: 'text',
        editable: false,
        sort: true,
        sortDirection: 'desc',
      },
      name: {
        title: '需求名称',
        type: 'string',
      },
      desc: {
        title: '需求描述',
        type: 'string',
      },
      version: {
        title: '支持版本',
        type: 'string',
      },
      principal: {
        title: '负责人',
        type: 'string',
      },
      task_progress: {
        title: '进展进度',
        type: 'string',
      },
      task_desc: {
        title: '进展描述',
        type: 'string',
      },
      design_doc: {
        title: '设计文档',
        type: 'string',
      },
      test_case: {
        title: '测试用例',
        type: 'string',
      },
    },
    mode: 'inline',
  };

  source: LocalDataSource = new LocalDataSource();
  public demand_url: string;
  constructor(private http: Http, private service: ApiService) {
    // const data = this.service.getData();
    this.demand_url = this.service.getUrl('demand');
    console.log(this.demand_url);
    this.http.get(this.demand_url).subscribe(
      (res: Response) => {
        console.log(res);
        const data = res.json();
        // console.log(data);
        this.source.load(data);
      },
      (err: any) => {
        console.log(err);
        alert(err);
      },
    );
    // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      let data = {'_id': event.data._id};
      console.log(data);
      this.http.delete(this.demand_url, {params: data}).subscribe(
        (res: Response) => {
          let data = res;
          console.log(data);
          event.confirm.resolve();
        },
        (err: any) => {
          console.log(err);
          alert(err);
        },
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    console.log(event.newData);
    const body = {
      '_id': event.newData['_id'],
      'name': event.newData['name'],
      'desc': event.newData['desc'],
      'version': event.newData['version'],
      'principal': event.newData['principal'],
      'task_progress': event.newData['task_progress'],
      'task_desc': event.newData['task_desc'],
      'design_doc': event.newData['design_doc'],
      'test_case': event.newData['test_case'],
    };
    console.log(body);

    this.http.post(this.demand_url, body).subscribe(
      (res: Response) => {
        let data = res;
        console.log(data);
        event.confirm.resolve();
      },
      (err: any) => {
        console.log(err);
        alert(err);
      },
    );
    // this.source.prepend(event.newData);
  }
  onEditConfirm(event): void {
    console.log(event);
    // let oldData = event.data;
    // let newData = event.newData;
    const body = {
      '_id': event.newData['_id'],
      'name': event.newData['name'],
      'desc': event.newData['desc'],
      'version': event.newData['version'],
      'principal': event.newData['principal'],
      'task_progress': event.newData['task_progress'],
      'task_desc': event.newData['task_desc'],
      'design_doc': event.newData['design_doc'],
      'test_case': event.newData['test_case'],
    };
    console.log(body);
    this.http.put(this.demand_url, body).subscribe(
      (res: Response) => {
        let data = res;
        console.log(data);
        event.confirm.resolve();
      },
      (err: any) => {
        console.log(err);
        alert(err);
      },
    );
  }

  ngOnInit() {
  }

}
