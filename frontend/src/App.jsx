import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getServiceOrders() {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        "http://localhost:3000/ordens-de-servico"
      );

      setServiceOrders(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as ordens de serviço.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getServiceOrders();
  }, []);

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function formatCurrency(value) {
    if (value === null || value === undefined) return "-";

    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Ordens de Serviço</h1>
          <p>Gerencie suas ordens de serviço</p>
        </div>

        <button className="btn-primary" onClick={getServiceOrders}>
          Atualizar
        </button>
      </header>

      <main className="content">
        {loading && (
          <div className="message">
            Carregando ordens de serviço...
          </div>
        )}

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {!loading && !error && serviceOrders.length === 0 && (
          <div className="message">
            Nenhuma ordem de serviço encontrada.
          </div>
        )}

        {!loading && !error && serviceOrders.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Data do Orçamento</th>
                  <th>Data de Finalização</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                </tr>
              </thead>

              <tbody>
                {serviceOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>

                    <td className="client">
                      {order.nome}
                    </td>

                    <td>
                      {order.telefone}
                    </td>

                    <td>
                      {formatDate(order.data_de_orcamento)}
                    </td>

                    <td>
                      {formatDate(order.data_de_finalizacao)}
                    </td>

                    <td className="description">
                      {order.descricao || "-"}
                    </td>

                    <td className="price">
                      {formatCurrency(order.preco)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
