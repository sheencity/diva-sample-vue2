import { Diva } from '@sheencity/diva-sdk';
import {  CefAdapter, WebRtcAdapter } from '@sheencity/diva-sdk-core';
export class DivaService {
  /**
   * divaClient
   * @type {import('@sheencity/diva-sdk').DivaClient}
   */
  client;

  /**
   * @type {import('@sheencity/diva-sdk-core').CefAdapter | import('@sheencity/diva-sdk-core').WebRtcAdapter}
   */
  adapter;

  /**
   * 初始话 webRtc 链接
   * @param container (HTMLElement) 视频加载的 dom 元素
   */
  async init(container) {
    console.log({ container });
    const apiKey = '<replace_your_api_key_here>';
    this.adapter = /Mars/.test(globalThis.navigator.userAgent)
      ? new CefAdapter(container) // 使用内嵌模式
      : new WebRtcAdapter(container, new URL('ws://127.0.0.1:3000')); // 使用云渲染模式
    const diva = new Diva({ apiKey, adapter: this.adapter });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
