import { Diva } from '@sheencity/diva-sdk';

export class DivaService {
  /**
   * divaClient
   * @type {import('@sheencity/diva-sdk').DivaClient}
   */
  client;

  /**
   * 初始话 webRtc 链接
   * @param element (HTMLElement) 视频加载的 dom 元素
   */
  async init(element) {
    console.log({ element });
    let diva;
    if (this.isEmbeddedMode()) {
      // 使用内嵌模式
      diva = new Diva({
        mode: 'embedded',
        apiKey: 'xxx',
        container: element,
      });
    } else {
      // 使用云渲染模式
      diva = new Diva({
        mode: 'cloud',
        apiKey: 'xxx',
        container: element,
        url: new URL('ws://127.0.0.1:3000'),
        logType: 'resolved',
      });
    }
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }

  /**
   * 判断是否启用内嵌模式
   * @returns 内嵌模式下返回 true
   */
  isEmbeddedMode() {
    if (window.navigator.userAgent.includes('Mars')) {
      return true;
    } else {
      return false;
    }
  }
}
