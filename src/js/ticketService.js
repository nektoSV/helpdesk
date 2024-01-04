/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from "./api/createRequest";

export default class TicketService {
  list(callback) {
    createRequest({
      method: 'GET',
      url: '?method=allTickets',
      callback
    });
  }

  get(data, callback) {
    createRequest({
      method: 'GET',
      url: `?method=ticketById&id=${data.id}`,
      data, 
      callback
    });
  }

  create(data, callback) {
    createRequest({
      method: 'POST',
      url: '?method=createTicket',
      data, 
      callback
    });
  }

  update(data, callback) {
    createRequest({
      method: 'POST',
      url: `?method=updateById&id=${data.id}`,
      data, 
      callback
    });
  }

  delete(data, callback) {
    createRequest({
      method: 'GET',
      url: `?method=deleteById&id=${data.id}`,
      data, 
      callback
    });
  }
}
