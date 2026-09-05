(function (global) {
  function limparTexto(valor) {
    return (valor ?? '').toString().trim();
  }

  function nomeValido(nome) {
    const texto = limparTexto(nome);
    return texto.length >= 3 && /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(texto);
  }

  function emailValido(email) {
    const texto = limparTexto(email);
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(texto);
  }

  function telefoneValido(telefone) {
    const digitos = limparTexto(telefone).replace(/\D/g, '');
    return digitos.length === 10 || digitos.length === 11;
  }

  function validarCliente(cliente) {
    const erros = [];
    if (!nomeValido(cliente.nome)) erros.push('Nome inválido');
    if (!emailValido(cliente.email)) erros.push('E-mail inválido');
    if (!telefoneValido(cliente.telefone)) erros.push('Telefone inválido');
    return erros;
  }

  const api = { nomeValido, emailValido, telefoneValido, validarCliente };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.Validacoes = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
