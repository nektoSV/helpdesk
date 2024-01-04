import TicketService from "./ticketService";
import TicketForm from "./ticketForm";
import TicketView from "./ticketView";
import Ticket from "./ticket";

export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }

    this.container = container;
    this.activTicket = null;
    this.ticketService = new TicketService();
    this.ticketForm = new TicketForm(this);
    this.ticketView = new TicketView(this);

    this.onClick = this.onClick.bind(this);
  }

  init() {
    const addTicket = document.createElement('button');
    const tickets = document.createElement('div');

    addTicket.classList.add('btn');
    addTicket.classList.add('button-create');
    tickets.classList.add('tickets-list');

    addTicket.textContent = "Добавить тикет";

    addTicket.addEventListener('click', this.onClick);

    this.container.appendChild(addTicket);
    this.container.appendChild(tickets);

    let create = (response) => {
      if (response) {
        this.ticketView.create(response);
      }
    }
    
    this.ticketService.list(create);
  }

  onClick(e) {
    e.preventDefault();

    const elem = e.target;
    const ticket = elem.closest('.ticket');
    const form = elem.closest('.form');
    const confirmation = elem.closest('.confirmation');

    if (elem.className.includes('create')) {
      const form = document.querySelector('.form');
      
      if (ticket) {
        if (form) form.remove();

        this.activTicket = ticket;
        this.ticketForm.createForm(ticket);
      } else {
        if (form) form.remove();

        this.ticketForm.createForm();
      }

      return;
    }

    if (elem.className.includes('delete')) {
      const form = document.querySelector('.form');

      if (form) form.remove();

      this.activTicket = ticket;
      
      this.ticketForm.createConfirmation();

      return;
    } 

    if (elem.className.includes('ok')) {
      this.removeTicket(confirmation);

      return;
    }
     
    if (elem.className.includes('add')) {
      if (form.className.includes('add')) {
        this.addTicket(form);
      } else {
        this.updateTicket(form);
      }

      return;
    }

    if (elem.className.includes('status')) {
      if (elem.className.includes('false')) {
        elem.classList.remove('false');
        elem.classList.add('true');
        elem.id = 'true';
        
      } else {
        elem.classList.remove('true');
        elem.classList.add('false');
        elem.id = 'false';
      }

      this.updateStatus(ticket);
  
      return;
    }

    if (elem.className.includes('close')) {
      form.remove();

      return;
    }

    if (elem && ticket) {
      const description = ticket.querySelector('.description');

      if (description.className.includes('hidden')) {
        description.classList.remove('hidden');
      } else {
        description.classList.add('hidden');
      }

      return;
    }
  }

  addTicket(form) {
    const name = form.querySelector('#short-description');
    const description = form.querySelector('#detailed-description');
    
    const data = {name: name.value, 
      description: description.value};

    let add = (response) => {
      if (response) {
        form.remove();

        this.ticketView.create([response]);
      }
    }
    
    this.ticketService.create(data, add);
  }

  updateTicket(form) {
    const name = form.querySelector('#short-description');
    const description = form.querySelector('#detailed-description');
    const status = this.activTicket.querySelector('.ticket-status');
    const date = this.activTicket.querySelector('.ticket-date');
    
    const data = new Ticket({
      id: this.activTicket.id,
      name: name.value, 
      description: description.value, 
      status: status.id, 
      created: date.id
    });
    
    let update = (response) => {
      if (response) {
        form.remove();

        this.activTicket = null;
        const tickets = document.querySelectorAll('.ticket');

        tickets.forEach(ticket => ticket.remove());

        this.ticketView.create(response);
      }
    }
    
    this.ticketService.update(data, update);
  }

  updateStatus(ticket) {
    const name = ticket.querySelector('.ticket-name');
    const status = ticket.querySelector('.ticket-status');
    const description = ticket.querySelector('.description');
    const date = ticket.querySelector('.ticket-date');

    const data = new Ticket({
      id: ticket.id,
      name: name.textContent, 
      description: description.textContent, 
      status: status.id, 
      created: Date.now(date.textContent)
    });
    
    let update = (response) => {
      if (response) {
        const tickets = document.querySelectorAll('.ticket');

        tickets.forEach(ticket => ticket.remove());

        this.ticketView.create(response);
      }
    }
    
    this.ticketService.update(data, update);
  }

  removeTicket(confirmation) {
    const name = this.activTicket.querySelector('.ticket-name');
    const description = this.activTicket.querySelector('.description');
    const status = this.activTicket.querySelector('.ticket-status');
    const date = this.activTicket.querySelector('.ticket-date');

    const data = new Ticket({
      id: this.activTicket.id,
      name: name.textContent,
      description: description.textContent,
      status: status.id,
      created: date.id
    });
    
    this.ticketService.delete(data, confirmation.remove());
    this.activTicket.remove();

    this.activTicket = null;
  }
}
