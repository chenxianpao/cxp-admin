import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalDataSource} from 'ng2-smart-table';
// import {UsageComponent} from "./usage/usage.component";
import { ApiService } from '../../@core/data/api.service';
// import { Cell, DefaultEditor, Editor } from '../../../../ng2-smart-table';
@Component({
  selector: 'ngx-machine-manager',
  templateUrl: './machine-manager.component.html',
  styles: [`
      nb-card {
          transform: translate3d(0, 0, 0);
      }
  `],
})
export class MachineManagerComponent implements OnInit {

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
      // id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      hostname: {
        title: '主机名',
        type: 'string',
        editable: false,
      },
      ip_address: {
        title: 'IP地址',
        type: 'string',
      },
      cluster: {
        title: '归属集群',
        type: 'string',
      },
      use_desc: {
        title: '使用情况',
        type: 'string',
      },
      // usage: {
      //   title: '使用情况',
      //   type: 'custom',
      //   renderComponent: UsageComponent,
      // },
      // usage1: {
      //   title: '使用情况1',
      //   type: 'html',
      //   editor: {
      //     type: 'custom',
      //     component: UsageComponent,
      //   },
      // },
      // email: {
      //   title: 'E-mail',
      //   type: 'string',
      // },
      // age: {
      //   title: 'Age',
      //   type: 'number',
      // },
    },
    mode: 'inline',
  };
  public machine_url: string;

  source: LocalDataSource = new LocalDataSource();
  constructor(private http: Http, private service: ApiService) {
    // const data = this.service.getData();
    this.machine_url = this.service.getUrl('machine');
    this.http.get(this.machine_url).subscribe((res: Response) => {
      // console.log(res);
      const data = res.json();
      // console.log(data);
      this.source.load(data);
    });
      // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    // console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      const data = {'hostname': event.data.hostname};
      // console.log(data);
      this.http.delete(this.machine_url, {params: data}).subscribe(
        (res: Response) => {
        // let data = res;
        // console.log(data);
      });
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
      'hostname': event.newData['hostname'],
      'ip_address': event.newData['ip_address'],
      'cluster': event.newData['cluster'],
      'use_desc': event.newData['use_desc'],
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
    this.http.post(this.machine_url, body).subscribe((res: Response) => {
      // let data = res;
      // console.log(data);
    });
    // this.source.prepend(event.newData);
    event.confirm.resolve();
  }
  onEditConfirm(event): void {
    // console.log(event);
    // let oldData = event.data;
    // let newData = event.newData;
    const body = {
      'hostname': event.newData['hostname'],
      'ip_address': event.newData['ip_address'],
      'cluster': event.newData['cluster'],
      'use_desc': event.newData['use_desc'],
    };
    // console.log(body);


    this.http.put(this.machine_url, body).subscribe((res: Response) => {
      // let data = res;
      // console.log(data);
    });
    event.confirm.resolve();
  }
  ngOnInit() {
  }

}
