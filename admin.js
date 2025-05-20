
function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  }
  function salvarUsuarios(lista) {
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }
  

  function salvarUsuario(evt) {
    evt.preventDefault();
    const idx   = document.getElementById('idxEdit').value;
    const nome  = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo  = document.getElementById('tipo').value;
  
    let lista = getUsuarios();
  
    if (idx === '') {

      if (lista.find(u => u.email === email)) {
        alert('Email já cadastrado!');
        return;
      }
      lista.push({ nome, email, senha, tipo });
    } else {

      lista[idx] = { nome, email, senha, tipo };
    }
  
    salvarUsuarios(lista);
    resetForm();
    listar();
  }
  

  function resetForm() {
    document.getElementById('formUsuario').reset();
    document.getElementById('idxEdit').value = '';
  }
  

  function listar() {
    const lista = getUsuarios();
    const saida = document.getElementById('saida');
    saida.innerHTML = '';
  
    if (lista.length === 0) {
      saida.textContent = 'Nenhum usuário cadastrado.';
      return;
    }
  
    lista.forEach((u, i) => {
      const div = document.createElement('div');
      div.innerHTML = `
        ${u.nome} — ${u.email} — ${u.tipo}
        <button onclick="editar(${i})">✏️</button>
        <button onclick="excluir(${i})">🗑️</button>
        <button onclick="alterarSenha(${i})">🔑</button>
      `;
      saida.appendChild(div);
    });
  }
  

  function pesquisar() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const lista = getUsuarios().filter(u => u.nome.toLowerCase().includes(termo));
    const saida = document.getElementById('saida');
    saida.innerHTML = '';
    if (lista.length === 0) {
      saida.textContent = 'Nenhum usuário encontrado.';
      return;
    }
    lista.forEach((u, i) => {
      const div = document.createElement('div');
      div.innerHTML = `${u.nome} — ${u.email} — ${u.tipo}`;
      saida.appendChild(div);
    });
  }
  
  function excluir(i) {
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    let lista = getUsuarios();
    lista.splice(i, 1);
    salvarUsuarios(lista);
    listar();
  }
  
  function editar(i) {
    const u = getUsuarios()[i];
    document.getElementById('nome').value = u.nome;
    document.getElementById('email').value = u.email;
    document.getElementById('senha').value = u.senha;
    document.getElementById('tipo').value = u.tipo;
    document.getElementById('idxEdit').value = i;
  }
  
  function alterarSenha(i) {
    const nova = prompt('Digite a nova senha para ' + getUsuarios()[i].email + ':');
    if (!nova) return;
    let lista = getUsuarios();
    lista[i].senha = nova;
    salvarUsuarios(lista);
    alert('Senha alterada com sucesso!');
  }
   
  window.onload = listar;
  