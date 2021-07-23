import {
  Diva
} from '@sheencity/diva-sdk';
export class DivaService {
  // divaClient
  client;


  /**
   * 初始话 webRtc 链接
   * @param container (HTMLElement) 视频加载的 dom 元素
   */
  async init(container) {
    console.log({
      container
    });
    const uri = 'http://127.0.0.1:3000';
    const apiKey = '<replace_your_api_key_here>';
    console.log(uri, apiKey, container);
    const diva = new Diva({
      container,
      apiKey,
      uri
    });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}