/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(target) {
    this.target = target;
  }

  createForm(elem) {
    const form = document.createElement('form');
    const title = document.createElement('h2');
    const shortDescription = document.createElement('div');
    const betailedВescription = document.createElement('div');
    const labelShortDescription = document.createElement('label');
    const labelВetailedВescription = document.createElement('label');
    const inputShortDescription = document.createElement('input');
    const inputВetailedВescription = document.createElement('input');
    const buttons = document.createElement('div');
    const buttonAdd = document.createElement('button');
    const buttonClose = document.createElement('button');

    inputShortDescription.id = ('short-description');
    inputВetailedВescription.id = ('detailed-description');

    inputShortDescription.name = 'name';
    inputВetailedВescription.name = 'description';

    labelShortDescription.for = ('short-description');
    labelВetailedВescription.for = ('detailed-description');

    form.classList.add('form');
    title.classList.add('form-title');
    shortDescription.classList.add('form-short-description');
    betailedВescription.classList.add('form-detailed-description');
    inputShortDescription.classList.add('input');
    inputВetailedВescription.classList.add('input');
    inputShortDescription.classList.add('short-description');
    inputВetailedВescription.classList.add('detailed-description');
    buttons.classList.add('buttons');
    buttonAdd.classList.add('btn');
    buttonAdd.classList.add('btn-form');
    buttonAdd.classList.add('btn-add');
    buttonClose.classList.add('btn');
    buttonClose.classList.add('btn-form');
    buttonClose.classList.add('btn-close');

    form.enctype = "multipart/form-data";
    inputShortDescription.type = 'text';
    inputВetailedВescription.type = 'text';
    buttonAdd.type = 'submit';

    labelShortDescription.textContent = "Краткое описание";
    labelВetailedВescription.textContent = "Подробное описание";
    buttonAdd.textContent = "Ok";
    buttonClose.textContent = "Отмена";

    if (elem) {
      const name = elem.querySelector('.ticket-name');
      const description = elem.querySelector('.description');

      title.textContent = "Изменить тикет";

      form.classList.add('form-update');

      inputShortDescription.value = name.textContent;
      inputВetailedВescription.value =description.textContent;
    } else {
      title.textContent = "Добавить тикет";

      form.classList.add('form-add')

      inputShortDescription.value = '';
      inputВetailedВescription.value = '';
    }

    buttonAdd.addEventListener('click', this.target.onClick);
    buttonClose.addEventListener('click', this.target.onClick);

    form.appendChild(title);
    shortDescription.appendChild(labelShortDescription);
    shortDescription.appendChild(inputShortDescription);
    betailedВescription.appendChild(labelВetailedВescription);
    betailedВescription.appendChild(inputВetailedВescription);
    form.appendChild(shortDescription);
    form.appendChild(betailedВescription);
    buttons.appendChild(buttonAdd);
    buttons.appendChild(buttonClose);
    form.appendChild(buttons);

    this.target.container.appendChild(form);
  }

  createConfirmation() {
    const confirmation = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const buttons = document.createElement('div');
    const buttonOk = document.createElement('button');
    const buttonCancellation = document.createElement('button');

    confirmation.classList.add('confirmation');
    confirmation.classList.add('form');
    title.classList.add('confirmation-title');
    text.classList.add('confirmation-text');
    buttons.classList.add('buttons');
    buttonOk.classList.add('btn');
    buttonOk.classList.add('btn-ok');
    buttonOk.classList.add('confirmation-btn');
    buttonCancellation.classList.add('btn');
    buttonCancellation.classList.add('btn-close');
    buttonCancellation.classList.add('confirmation-btn');

    title.textContent = "Удалить тикет";
    text.textContent = "Вы уверены, что хотите удалить тикет? Это действие необратимо.";
    buttonOk.textContent = "Ok";
    buttonCancellation.textContent = "Отмена";
    
    buttonOk.addEventListener('click', this.target.onClick);
    buttonCancellation.addEventListener('click', this.target.onClick);

    buttons.appendChild(buttonOk);
    buttons.appendChild(buttonCancellation);
    confirmation.appendChild(title);
    confirmation.appendChild(text);
    confirmation.appendChild(buttons);
    this.target.container.appendChild(confirmation);
  }

  close(e) {
    const elem = e.target;
    const parent = elem.closest('.form');

    parent.remove();
  }
}
