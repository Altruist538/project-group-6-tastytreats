const backdrop = document.querySelector('.backdrop-order');
const modalOpen = document.querySelector('.hero-btn');
const modalClose = document.querySelector('.close-modal-order');
const modal = document.querySelector('.modal-order');
const modalForm = document.querySelector('.modal-order-form');

modalOpen.addEventListener('click', openModalOrder);
modalClose.addEventListener('click', closeModalOrder);
backdrop.addEventListener('click', backdropShow);
modalForm.addEventListener('submit', sendOrderForm);

function sendOrderForm(event) {
  event.preventDefault();
  const { name, tel, email, comment } = event.currentTarget;
  const send = {
    name: name.value,
    tel: tel.value,
    email: email.value,
    comment: comment.value,
  };
  console.log(send);
  event.currentTarget.reset();
  closeModalOrder();
}

function openModalOrder() {
  window.addEventListener('keydown', onEscape);
  document.body.classList.add('overflow-hidden');
  backdrop.classList.add('active');
  modal.classList.add('active');
}

function closeModalOrder() {
  document.body.classList.remove('overflow-hidden');
  window.removeEventListener('keydown', onEscape);
  backdrop.classList.remove('active');
  modal.classList.remove('active');
}

function backdropShow(event) {
  if (event.currentTarget === event.target) {
    closeModalOrder();
  }
}

function onEscape(event) {
  if (event.code === 'Escape') {
    closeModalOrder();
  }
}
