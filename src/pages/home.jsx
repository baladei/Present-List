import React, { useEffect, useState } from 'react';
import './styles.css';
import { Card } from '../components/index';

export function Lista() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [usuario, setUsuario] = useState({ name: '', avatar: ''})

  function addCliente() {
    const novoCliente = {
      name: nomeCliente,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setClientes(estadoAnterior => [...estadoAnterior, novoCliente]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/baladei')
    .then(response => response.json ())
    .then(data => {
      setUsuario({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, []);

  return (
    <div className='container'>      
      <header>
        <h1>Lista de Presença</h1>
        
        <div>
          <strong>{usuario.name}</strong>
          <img src={usuario.avatar} alt='Foto de Perfil' />
        </div>
      </header>
    

    <input
    type="text"
    placeholder='Digite o nome...' 
    onChange={TESTE => setNomeCliente(TESTE.target.value)}
    />
    
    <button type="submit" onClick={addCliente}>
      Adicionar
      </button>

    {
      clientes.map(cliente => (
      <Card
      name={cliente.name}
      time={cliente.time}
      key={cliente.time}
      />
      ))    
    }

  </div>
  )
}