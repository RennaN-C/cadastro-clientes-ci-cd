const form = document.querySelector('#cadastro-form');
const mensagem = document.querySelector('#mensagem');
const tbody = document.querySelector('#clientes');

let clientes = JSON.parse(localStorage.getItem('clientes-ci-cd') || '[]');

function salvar() {
  localStorage.setItem('clientes-ci-cd', JSON.stringify(clientes));
}

function renderizar() {
  tbody.innerHTML = '';

  clientes.forEach((cliente, indice) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone}</td>
      <td><button class="excluir" data-indice="${indice}">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cliente = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value,
  };

  const erros = Validacoes.validarCliente(cliente);

  if (erros.length) {
    mensagem.textContent = erros.join(' | ');
    mensagem.className = 'erro';
    return;
  }

  clientes.push(cliente);
  salvar();
  renderizar();
  form.reset();
  mensagem.textContent = 'Cliente cadastrado com sucesso.';
  mensagem.className = 'sucesso';
});

tbody.addEventListener('click', (event) => {
  if (!event.target.matches('.excluir')) return;

  clientes.splice(Number(event.target.dataset.indice), 1);
  salvar();
  renderizar();
});

renderizar();
