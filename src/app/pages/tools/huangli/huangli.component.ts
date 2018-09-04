import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-huangli',
  templateUrl: './huangli.component.html',
  styleUrls: ['./huangli.component.scss'],
})
export class HuangliComponent implements OnInit {
  public timeString: string;
  public direction: string;
  public drink: string;
  public goodList: Array<Prediction> = [];
  public badList: Array<Prediction> = [];
  constructor() {
    this.timeString = this.getTodayString();
    this.direction = this.directions[this.random(this.iday, 2) % this.directions.length];
    // console.log(this.pickRandom(this.drinks, 2).join());
    this.drink = this.pickRandom(this.drinks, 2).join();
    this.pickTodaysLuck();
    // this.goodList =
  }

  random(daySeed: number, indexSeed: number) {
    let n = daySeed % 11117;
    for (let i = 0; i < 100 + indexSeed; i++) {
      n = n * n;
      n = n % 11117;   // 11117 是个质数
    }
    return n;
  }
  private today = new Date();
  private iday = this.today.getFullYear() * 10000 + (this.today.getMonth() + 1) * 100 + this.today.getDate();

  private weeks = ['日', '一', '二', '三', '四', '五', '六'];
  private directions = ['北方', '东北方', '东方', '东南方', '南', '西南方', '西方', '西北方'];
  private activities = [
    {name: '写单元测试', good: '写单元测试将减少出错', bad: '写单元测试会降低你的开发效率'},
    // {name: '洗澡', good: '你几天没洗澡了？', bad: '会把设计方面的灵感洗掉'},
    {name: '锻炼一下身体', good: '加油，你是最胖的', bad: '能量没消耗多少，吃得却更多'},
    // {name: '抽烟', good: '抽烟有利于提神，增加思维敏捷', bad: '除非你活够了，死得早点没关系'},
    {name: '白天上线', good: '今天白天上线是安全的', bad: '可能导致灾难性后果'},
    {name: '重构', good: '代码质量得到提高', bad: '你很有可能会陷入泥潭'},
    // {name: '使用%t', good: '你看起来更有品位', bad: '别人会觉得你在装逼'},
    // {name: '跳槽', good: '该放手时就放手', bad: '鉴于当前的经济形势，你的下一份工作未必比现在强'},
    {name: '招人', good: '你遇到千里马的可能性大大增加', bad: '你只会招到一两个混饭吃的外行'},
    // {name: '面试', good: '面试官今天心情很好', bad: '面试官不爽，会拿你出气'},
    // {name: '提交辞职申请', good: '公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋', bad: '鉴于当前的经济形势，你的下一份工作未必比现在强'},
    {name: '申请加薪', good: '老板今天心情很好', bad: '公司正在考虑裁员'},
    {name: '晚上加班', good: '晚上是程序员精神最好的时候', bad: '回去干活'},
    // {name: '在妹子面前吹牛', good: '改善你矮穷挫的形象', bad: '会被识破'},
    // {name: '撸管', good: '避免缓冲区溢出', bad: '小撸怡情，大撸伤身，强撸灰飞烟灭'},
    // {name: '浏览成人网站', good: '重拾对生活的信心', bad: '你会心神不宁'},
    // {name: '命名变量\'%v\'', good: '', bad: ''},
    // {name: '写超过%l行的方法', good: '你的代码组织的很好，长一点没关系', bad: '你的代码将混乱不堪，你自己都看不懂'},
    {name: '提交代码', good: '遇到冲突的几率是最低的', bad: '你遇到的一大堆冲突会让你觉得自己是不是时间穿越了'},
    {name: '代码复审', good: '发现重要问题的几率大大增加', bad: '你什么问题都发现不了，白白浪费时间'},
    {name: '开会', good: '写代码之余放松一下打个盹，有益健康', bad: '你是背锅侠'},
    // {name: '打DOTA', good: '你将有如神助', bad: '你会被虐的很惨'},
    // {name: '晚上上线', good: '晚上是程序员精神最好的时候', bad: '你白天已经筋疲力尽了'},
    {name: '修复BUG', good: '你今天对BUG的嗅觉大大提高', bad: '新产生的BUG将比修复的更多'},
    {name: '设计评审', good: '设计评审会议将变成头脑风暴', bad: '人人筋疲力尽，评审就这么过了'},
    {name: '需求评审', good: '呵呵呵', bad: '嘿嘿嘿'},
    {name: '挣个钱', good: '一杯敬自由', bad: '一杯敬死亡'},

    // {name: '上微博', good: '今天发生的事不能错过', bad: '会被老板看到'},
    // {name: '上AB站', good: '还需要理由吗？', bad: '会被老板看到'},
  ];

  // private specials = [
  //   {date: 20130221, type: 'good', name: '防核演习', description: '万一哪个疯子丢颗核弹过来...'}
  // ];

  private tools = ['Eclipse写程序', 'MSOffice写文档', '记事本写程序', 'Windows8', 'Linux', 'MacOS', 'IE', 'Android设备', 'iOS设备'];

  private varNames = ['jieguo', 'huodong', 'pay', 'expire', 'zhangdan', 'every', 'free', 'i1',
    'a', 'virtual', 'ad', 'spider', 'mima', 'pass', 'ui'];

  private drinks = ['水', '茶', '红茶', '绿茶', '咖啡', '奶茶',
    '可乐', '牛奶', '豆奶', '果汁', '果味汽水', '苏打水', '运动饮料', '酸奶', '酒'];

  getTodayString(): string {
    return '今天是' + this.today.getFullYear() + '年' + (this.today.getMonth() + 1) +
      '月' + this.today.getDate() + '日 星期' + this.weeks[this.today.getDay()];
  }
  // 生成今日运势
  pickTodaysLuck() {
    const numGood = this.random(this.iday, 98) % 3 + 2;
    const numBad = this.random(this.iday, 87) % 3 + 2;
    const eventArr = this.pickRandomActivity(numGood + numBad);

    // const specialSize = this.pickSpecials();

    for (let i = 0; i < numGood; i++) {
      // console.log(eventArr[i]);
      this.goodList.push(eventArr[i]);
      // this.addToGood(eventArr[i]);
    }

    for (let i = 0; i < numBad; i++) {
      // console.log(eventArr[numGood + i]);
      this.badList.push(eventArr[numGood + i]);
      // this.addToBad(eventArr[numGood + i]);
    }
  }

  // 添加预定义事件
  // pickSpecials() {
  //   const specialSize = [0, 0];
  //
  //   for (let i = 0; i < this.specials.length; i++) {
  //     const special = this.specials[i];
  //
  //     if (this.iday === special.date) {
  //       if (special.type === 'good') {
  //         specialSize[0]++;
  //         this.addToGood({name: special.name, good: special.description});
  //       } else {
  //         specialSize[1]++;
  //         this.addToBad({name: special.name, bad: special.description});
  //       }
  //     }
  //   }
  //
  //   return specialSize;
  // }

  // 从 activities 中随机挑选 size 个
  pickRandomActivity(size) {
    const picked_events = this.pickRandom(this.activities, size);

    for (let i = 0; i < picked_events.length; i++) {
      picked_events[i] = this.parse(picked_events[i]);
    }

    return picked_events;
  }

  // 从数组中随机挑选 size 个
  pickRandom(array, size) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }

    for (let j = 0; j < array.length - size; j++) {
      const index = this.random(this.iday, j) % result.length;
      result.splice(index, 1);
    }

    return result;
  }

  // 解析占位符并替换成随机内容
  parse(event) {
    const result = {name: event.name, good: event.good, bad: event.bad};  // clone

    if (result.name.indexOf('%v') !== -1) {
      result.name = result.name.replace('%v',
        this.varNames[this.random(this.iday, 12) % this.varNames.length]);
    }

    if (result.name.indexOf('%t') !== -1) {
      result.name = result.name.replace('%t', this.tools[this.random(this.iday, 11) % this.tools.length]);
    }

    if (result.name.indexOf('%l') !== -1) {
      result.name = result.name.replace('%l', (this.random(this.iday, 12) % 247 + 30).toString());
    }

    return result;
  }

  // // 添加到“宜”
  // addToGood(event) {
  // }
  //
  // // 添加到“不宜”
  // addToBad(event) {
  // }
  ngOnInit() {
  }

}

class Prediction {
  name: string;
  good: string;
  bad: string;
}
