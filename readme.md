# Robô Marciano!

..............

## :computer: Instalação
###  **Back-End**:

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

A documentação da API se encontra disponível em: https://app.swaggerhub.com/apis-docs/guipiveti/MarsApi/1.0.0

###  **Front-End**:

 1. Clonar o repositório.
 2. Acessar o diretório do backend
	  ``` bash
	cd frontend
	```
3. Instalar as dependências
	  ``` bash
	npm install
	```
4. Iniciar o servidor
	  ``` 
	npm start
	```
## :file_cabinet: Banco de dados
O banco de dados deste projeto contém uma única tabela contendo o histórico de comandos enviados ao sistema, as coordenadas e direção do robô antes e após o recebimento do comando, o horário da requisição além de um indicador sobre a validade do comando recebido e o identificador da seção do frontend que enviou o comando). A tabela foi construída com as seguinte propriedades:
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

