import {
  BehaviorSubject
} from 'rxjs';


export class DataService {
  // 人视模式
  selectedMode = {
    value: 'false',
    placeholder: '飞行'
  };
  // 罗盘显示
  compass = false;
  // 是否旋转
  rotation = false;
  // 当前的楼道层数
  currentLift = [1, 1, 1, 1];
  // 灯光的状态
  lampState = [false, false, false, false];
  // 示例代码
  _code = new BehaviorSubject('');
  code = this._code.asObservable();

  constructor() {
    this.changeCode('client.applyScene("场景切换")');
  }
  changeCode(...code) {
    if (!code || !code.length) return;
    this._code.next(code.reduce((pre, cur) => pre + '\n' + cur));
  }
}