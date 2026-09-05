const test = require('node:test');
const assert = require('node:assert/strict');
const {
  nomeValido,
  emailValido,
  telefoneValido,
  validarCliente,
} = require('./validacoes');

test('aceita um cliente válido', () => {
  const erros = validarCliente({
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(42) 99999-9999',
  });
  assert.deepEqual(erros, []);
});

test('rejeita nome muito curto', () => {
  assert.equal(nomeValido('A'), false);
});

test('rejeita e-mail sem domínio válido', () => {
  assert.equal(emailValido('maria@'), false);
});

test('aceita telefone com 10 ou 11 dígitos', () => {
  assert.equal(telefoneValido('(42) 3333-4444'), true);
  assert.equal(telefoneValido('(42) 99999-9999'), true);
});

test('rejeita telefone incompleto', () => {
  assert.equal(telefoneValido('9999-999'), false);
});
