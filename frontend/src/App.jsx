import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('clientes');
  
  // Estado do formulário de cliente
  const [formCliente, setFormCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  // Estado do formulário de veículo
  const [formVeiculo, setFormVeiculo] = useState({
    cliente_id: '',
    modelo: '',
    marca: '',
    ano: '',
    placa: '',
    cor: ''
  });

  // 👇 BUSCAR DADOS DO BACKEND 👇
  const carregarDados = async () => {
    try {
      const [clientesRes, veiculosRes] = await Promise.all([
        axios.get('http://localhost:5000/api/clientes'),
        axios.get('http://localhost:5000/api/veiculos')
      ]);
      setClientes(clientesRes.data);
      setVeiculos(veiculosRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados do servidor');
    }
  };

  // 👇 LIMPAR FORMULÁRIOS 👇
  const limparFormularios = () => {
    setFormCliente({ nome: '', telefone: '', email: '', endereco: '' });
    setFormVeiculo({ cliente_id: '', modelo: '', marca: '', ano: '', placa: '', cor: '' });
    setModoEdicao(false);
    setClienteEditando(null);
  };

  // 👇 CRIAR OU ATUALIZAR CLIENTE 👇
  const salvarCliente = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:5000/api/clientes/${clienteEditando.id}`, formCliente);
        alert('Cliente atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:5000/api/clientes', formCliente);
        alert('Cliente cadastrado com sucesso!');
      }
      
      limparFormularios();
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente');
    }
  };

  // 👇 EDITAR CLIENTE 👇
  const editarCliente = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setFormCliente({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco || ''
    });
    setAbaAtiva('clientes');
  };

  // 👇 EXCLUIR CLIENTE 👇
  const excluirCliente = async (id, nome) => {
    if (!confirm(`Tem certeza que deseja excluir o cliente "${nome}"?`)) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/clientes/${id}`);
      alert('Cliente excluído com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente');
    }
  };

  // 👇 CRIAR VEÍCULO 👇
  const criarVeiculo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/veiculos', {
        ...formVeiculo,
        ano: parseInt(formVeiculo.ano),
        cliente_id: parseInt(formVeiculo.cliente_id)
      });
      alert('Veículo cadastrado com sucesso!');
      setFormVeiculo({ cliente_id: '', modelo: '', marca: '', ano: '', placa: '', cor: '' });
      carregarDados();
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      alert('Erro ao criar veículo');
    }
  };

  // Carrega dados quando o componente monta
  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚗 CRV Auto - Sistema de Oficina</h1>
        <p>Gestão completa de clientes e veículos</p>
      </header>

      <div className="container">
        {/* 👇 MENU DE ABAS 👇 */}
        <nav className="abas-navegacao">
          <button 
            className={abaAtiva === 'clientes' ? 'aba-ativa' : ''}
            onClick={() => setAbaAtiva('clientes')}
          >
            👥 Clientes
          </button>
          <button 
            className={abaAtiva === 'veiculos' ? 'aba-ativa' : ''}
            onClick={() => setAbaAtiva('veiculos')}
          >
            🚗 Veículos
          </button>
          <button 
            className={abaAtiva === 'ordens' ? 'aba-ativa' : ''}
            onClick={() => setAbaAtiva('ordens')}
          >
            📋 Ordens de Serviço
          </button>
        </nav>

        {/* 👇 ABA CLIENTES 👇 */}
        {abaAtiva === 'clientes' && (
          <>
            {/* FORMULÁRIO DE CLIENTE */}
            <section className="cadastro-section">
              <h2>{modoEdicao ? '✏️ Editar Cliente' : '📝 Cadastrar Novo Cliente'}</h2>
              <form onSubmit={salvarCliente} className="cliente-form">
                <input
                  type="text"
                  placeholder="Nome completo *"
                  value={formCliente.nome}
                  onChange={(e) => setFormCliente({...formCliente, nome: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Telefone *"
                  value={formCliente.telefone}
                  onChange={(e) => setFormCliente({...formCliente, telefone: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formCliente.email}
                  onChange={(e) => setFormCliente({...formCliente, email: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  value={formCliente.endereco}
                  onChange={(e) => setFormCliente({...formCliente, endereco: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit" className="btn-salvar">
                    {modoEdicao ? 'Atualizar' : 'Cadastrar'} Cliente
                  </button>
                  {modoEdicao && (
                    <button type="button" className="btn-cancelar" onClick={limparFormularios}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* LISTA DE CLIENTES */}
            <section className="clientes-section">
              <h2>👥 Clientes Cadastrados ({clientes.length})</h2>
              <div className="clientes-grid">
                {clientes.map(cliente => (
                  <div key={cliente.id} className="cliente-card">
                    <h3>{cliente.nome}</h3>
                    <p>📞 {cliente.telefone}</p>
                    <p>✉️ {cliente.email || 'Não informado'}</p>
                    <p>🏠 {cliente.endereco || 'Não informado'}</p>
                    <p className="data-cadastro">
                      📅 Cadastrado em: {new Date(cliente.data_cadastro).toLocaleDateString()}
                    </p>
                    <div className="cliente-actions">
                      <button 
                        className="btn-editar"
                        onClick={() => editarCliente(cliente)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-excluir"
                        onClick={() => excluirCliente(cliente.id, cliente.nome)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 👇 ABA VEÍCULOS 👇 */}
        {abaAtiva === 'veiculos' && (
          <>
            {/* FORMULÁRIO DE VEÍCULO */}
            <section className="cadastro-section">
              <h2>🚗 Cadastrar Novo Veículo</h2>
              <form onSubmit={criarVeiculo} className="veiculo-form">
                <select
                  value={formVeiculo.cliente_id}
                  onChange={(e) => setFormVeiculo({...formVeiculo, cliente_id: e.target.value})}
                  required
                >
                  <option value="">Selecione o cliente *</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Modelo *"
                  value={formVeiculo.modelo}
                  onChange={(e) => setFormVeiculo({...formVeiculo, modelo: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Marca *"
                  value={formVeiculo.marca}
                  onChange={(e) => setFormVeiculo({...formVeiculo, marca: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Ano *"
                  value={formVeiculo.ano}
                  onChange={(e) => setFormVeiculo({...formVeiculo, ano: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Placa *"
                  value={formVeiculo.placa}
                  onChange={(e) => setFormVeiculo({...formVeiculo, placa: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Cor"
                  value={formVeiculo.cor}
                  onChange={(e) => setFormVeiculo({...formVeiculo, cor: e.target.value})}
                />
                <button type="submit" className="btn-salvar">
                  Cadastrar Veículo
                </button>
              </form>
            </section>

            {/* LISTA DE VEÍCULOS */}
            <section className="veiculos-section">
              <h2>🚗 Veículos Cadastrados ({veiculos.length})</h2>
              <div className="veiculos-grid">
                {veiculos.map(veiculo => (
                  <div key={veiculo.id} className="veiculo-card">
                    <h3>{veiculo.modelo} - {veiculo.marca}</h3>
                    <p>📋 Placa: {veiculo.placa}</p>
                    <p>🎨 Cor: {veiculo.cor}</p>
                    <p>📅 Ano: {veiculo.ano}</p>
                    <p>👤 Dono: {veiculo.cliente_nome}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 👇 ABA ORDENS DE SERVIÇO 👇 */}
        {abaAtiva === 'ordens' && (
          <section className="ordens-section">
            <h2>📋 Ordens de Serviço</h2>
            <div className="em-breve">
              <h3>🚧 Em Desenvolvimento</h3>
              <p>Em breve você poderá gerenciar ordens de serviço aqui!</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;