import {
  DivaService
} from './services/diva.service';
import {
  DataService
} from './services/data.service';
export const diva = new DivaService();
export let data = new DataService();