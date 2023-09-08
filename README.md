# ShopperTechnicalTest

## Instalação
Clone o projeto e instale as dependências com os seguintes comandos:
```bash
  git clone https://github.com/erickcestari/shopperTechnicalTest.git
  cd shopperTechnicalTest
  cd front
  yarn install or npm i
  cd ../back
  yarn install or npm i
```

## Back-end

Adicione as variáveis de ambiente no arquivo .env

```bash
  DATABASE_URL="mysql://root:root@localhost:3306/db"
  PORT=3333 
```

Adicione docker
```bash
  docker-compose up -d
```

Rode as migrations

```bash
  yarn prisma generate dev
```

Preencha o banco de dados
```bash
  yarn fill
```

Rode o servidor
```bash
  yarn dev or npm run dev
```

## Front-end

Adicione as variáveis de ambiente no arquivo .env
```bash
  NEXT_PUBLIC_API_URL=http://localhost:3333
```

Rode o servidor
```bash
  yarn dev or npm run dev
```

## Finalizado
