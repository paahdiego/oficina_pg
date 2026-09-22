SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS cliente(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL, 
  cpf CHAR(11) NOT NULL UNIQUE,
  telefone VARCHAR(25), 
  endereco VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ordem_servico(
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  data_de_orcamento DATE NOT NULL, 
  data_de_finalizacao DATE,
  preco DOUBLE NOT NULL,
  descricao VARCHAR(100) NOT NULL,

  CONSTRAINT fk_ordem_servico_cliente
        FOREIGN KEY (cliente_id) 
        REFERENCES cliente(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


INSERT INTO cliente (nome, cpf, telefone, endereco) VALUES
  ("João da Silva", "12345678900", "+5585987654321", "RUA 123, 26"),
  ("Ronaldo da Silva", "12345678901", "+5585987654324", "RUA 123, 26"),
  ("Kleber da Silva", "12345678902", "+5585987654323", "RUA 123, 26"),
  ("Robinson da Silva", "12345678903", "+5585987654322", "RUA 123, 26");


INSERT INTO ordem_servico (cliente_id, data_de_orcamento, data_de_finalizacao, preco, descricao) VALUES
  (
    (SELECT id FROM cliente WHERE cpf = '12345678900'), 
    '2026-09-22', 
    '2026-09-25', 
    180.00, 
    'Limpeza do Tambor do Freio'
  ),
  (
    (SELECT id FROM cliente WHERE cpf = '12345678901'), 
    '2026-09-22', 
    NULL, 
    70.50, 
    'Troca de Oleo + Filtro'
  ),
  (
    (SELECT id FROM cliente WHERE cpf = '12345678902'), 
    '2026-09-22', 
    NULL, 
    1200.00, 
    'Troca dos amortecedores'
  ),
  (
    (SELECT id FROM cliente WHERE cpf = '12345678901'), 
    '2026-09-22', 
    NULL, 
    250.00, 
    'Manutenção preventiva'
  )
  ;