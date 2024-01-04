/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(target) {
    this.target = target;
  }

  create(listTickets) {    
    const tickets = document.querySelector('.tickets-list');
    
    if (listTickets) {
      listTickets.forEach(listTicket => {
        const ticket = document.createElement('div');
        const main = document.createElement('div');
        const ticketStatus  = document.createElement('div');
        const ticketName = document.createElement('p');
        const info = document.createElement('div');
        const ticketData = document.createElement('time');
        const ticketCreate = document.createElement('button');
        const ticketDelete = document.createElement('button');
        const description = document.createElement('div');

        ticket.id = listTicket.id;
        ticketStatus.id = listTicket.status;
        ticketData.id = listTicket.created;

        ticket.classList.add('ticket');
        main.classList.add('main');
        description.classList.add('description');
        description.classList.add('hidden');
        ticketStatus.classList.add('btn');
        ticketStatus.classList.add('ticket-btn');
        ticketStatus.classList.add('ticket-status');
        ticketStatus.classList.add(`${listTicket.status}`);
        ticketName.classList.add('ticket-name');
        info.classList.add('info');
        ticketData.classList.add('ticket-date');
        ticketCreate.classList.add('btn');
        ticketDelete.classList.add('btn');
        ticketCreate.classList.add('ticket-btn');
        ticketDelete.classList.add('ticket-btn');
        ticketCreate.classList.add('ticket-create');
        ticketDelete.classList.add('ticket-delete');

        ticketName.textContent = listTicket.name;
        ticketData.textContent =  new Date(Number(listTicket.created)).toLocaleTimeString('ru-RU', {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'});
        description.textContent = listTicket.description;

        ticket.addEventListener('click', this.target.onClick);

        ticket.appendChild(main);
        ticket.appendChild(description);

        info.appendChild(ticketData);
        info.appendChild(ticketCreate);
        info.appendChild(ticketDelete);
        main.appendChild(ticketStatus);
        main.appendChild(ticketName);
        main.appendChild(info);

        tickets.appendChild(ticket);
      });
    }
  }
}
