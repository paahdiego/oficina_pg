import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

const serviceOrderQuery = `
SELECT 
os.id, 
os.cliente_id, 
os.data_de_orcamento, 
os.data_de_finalizacao, 
os.preco, 
os.descricao,   
c.nome,  
c.cpf,  
c.telefone,  
c.endereco
FROM ordem_servico os 
INNER JOIN cliente c ON os.cliente_id = c.id ORDER BY os.data_de_orcamento desc;
`

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

app.get('/', (req, res) => {
  res.send("API OFICINA")
})

app.get('/ordens-de-servico', async (req, res) => {
  const [serviceOrders] = await connection.query(serviceOrderQuery);
  return res.json(serviceOrders);
})


app.listen(port, () => { console.log(`Oficina Server UP: ${port}`) })

