
# Robô Marciano!
![Curiosity](https://github.com/guipiveti/mars-rover/blob/doker/imagens/curiosity.jpg?raw=true)

 Projeto simulando o comando de um rover em marte. 

  
A documentação da API se encontra disponível em: https://app.swaggerhub.com/apis-docs/guipiveti/MarsApi/1.0.0
## :computer: Instalação
### **Via Docker Composer (Recomendado):**
1. Clonar o repositório.

2. No diretório do projeto executar o comando: 

``` bash
docker-compose -f mars.yml up -d
```
O Docker Composer criará uma instância de banco de dados PostgreSQL com a tabela utilizada neste projeto e uma instância do backend.
*O frontend ainda não está integrado ao Docker-Composer, por isso deve ser iniciado manualmente.
### **Front-End**:
1. Clonar o repositório.

2. Acessar o diretório do frontend

``` bash
cd frontend
```

3. Instalar as dependências

``` bash
npm install
```
4. Iniciar o projeto
```
npm start
```

### Back-End (Manualmente - Não recomendado) :

1. Clonar o repositório.

2. Acessar o diretório do backend

``` bash
cd backend-nodejs
```

3. Instalar as dependências

``` bash
npm install
```

4. Iniciar o servidor

```
npm start
```

  ### Banco de Dados (Manualmente - Não recomendado) :

1. Criar um banco de dados PostgreSQL

2. Criar uma tabela com o seguinte comando: 
```
CREATE TABLE commands_log (
	user_id uuid NOT NULL,
	original_x int4 NOT NULL,
	original_y int4 NOT NULL,
	original_direction CHAR NOT NULL,
	command text NULL,
	"timestamp" timestamp NOT NULL,
	"valid" boolean NOT NULL,
	new_x int4 NOT NULL,
	new_y int4 NOT NULL,
	new_direction CHAR NOT NULL,
	CONSTRAINT transaction_pkey PRIMARY KEY (user_id, timestamp)
);
```
3. Ajustar o arquivo de conexão com o banco (backend-nodejs/services/db.js) com as credencias de acesso ao banco, o  host e a porta.

![Estrutura do banco](https://github.com/guipiveti/mars-rover/blob/doker/imagens/database.jpg?raw=true)

