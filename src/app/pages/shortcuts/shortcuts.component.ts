import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss'],
})


export class ShortcutsComponent implements OnInit {
  toolList: Array<ToolItem>;
  constructor() {
    this.toolList = [
      {'url': 'http://192.169.29.247:8080/#/dashboard/self', 'name': 'gerrit(8080)', 'desc': '代码评审工具, 8080端口'},
      {'url': 'http://192.169.29.247:80/#/dashboard/self', 'name': 'gerrit(80)', 'desc': '代码评审工具，80端口'},
      {'url': 'http://192.169.29.3:8080/zentao/bug-browse.html', 'name': '禅道', 'desc': '问题单工具'},
      {'url': 'http://192.169.30.238:8181', 'name': 'MinDoc', 'desc': '云存储文档归档处'},
      {'url': 'http://192.169.29.11/index.php/apps/calendar/', 'name': '会议室预订', 'desc': '会议室预订网址'},
      {'url': 'http://192.169.28.203', 'name': 'RAP2', 'desc': '在线接口管理工具'},
      {'url': 'http://git.hikdata.com', 'name': 'GIT仓库', 'desc': '事业部GIT仓库'},
      {'url': 'http://192.169.29.214:8080', 'name': 'Jenkins(旧)', 'desc': '云存储编辑打包构建工具，用于v2.0.1.0之前的版本'},
      {'url': 'http://192.169.100.207:8080', 'name': 'Jenkins(新)', 'desc': '云存储编辑打包构建工具，用于当前版本'},
    ];
  }

  ngOnInit() {
  }

}

export class ToolItem {
  name: string;
  url?: string;
  desc: string;
}
