const STORE_TOKEN = 'overlay';


export class LocalStorageService {
  constructor() {}

  /**
   * 将覆盖物信息存储在 localStorage 中
   */
  storeOverlay(overlay) {
    const overlays =
      JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    overlays.unshift(overlay);
    localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
  }

  /**
   * 从 localStorage 中删除相应的覆盖物信息
   */
  deleteOverlay(overlay) {
    const overlays =
      JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    const index = overlays.findIndex((over) => over.id === overlay.id);
    if (index >= 0) {
      overlays.splice(index, 1);
      localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
    }
  }

  /**
   * 获取 localStorage 中所有的覆盖物信息
   */
  getAllOverlays(k = STORE_TOKEN) {
    return JSON.parse(localStorage.getItem(k)) || [];
  }
}