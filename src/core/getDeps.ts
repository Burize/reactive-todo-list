import { Api } from 'services/api';
import { MessageService } from 'services/messages';

const api = new Api();

export default function getDeps() {
  return { api, MessageService };
}
