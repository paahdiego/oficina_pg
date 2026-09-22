
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [serviceOrders, setServiceOrders] = useState()

  async function getServiceOrders() {
    const { data } = await axios.get("http://localhost:3000/ordens-de-servico")
    console.log(data)
    setServiceOrders(data);
  }

  useEffect(() => {
    getServiceOrders()
  }, [])

  return (
    <>
      <h1>Ordens de Serviço</h1>
      <ul>
        <li>Ordem de Serviço - Nome do cliente - Telefone do Cliente - Data Orçamento - Data Finalização - Desc -  Preco </li>
        {serviceOrders && serviceOrders.map(order => {
          return (<li key={order.id}>{order.id} - {order.nome} - {order.telefone} - {order.data_de_orcamento} - {order.data_de_finalizacao} - {order.descricao} - {order.preco}  </li>)
        })}
      </ul>
    </>
  )
}

export default App
