# ShopperTechnicalTest
## Funcionalidades

1. Importação de Dados: O projeto permite a importação de dados a partir de um arquivo CSV, que contém informações sobre produtos, categorias, preços, estoques e outros relacionados ao e-commerce.

2. Validação de Dados: São aplicadas verificações rigorosas para garantir a integridade e precisão dos dados. Isso inclui validação de formatos e detecção de valores inconsistentes.

3. Atualização do Banco de Dados: Os dados validados são então atualizados no banco de dados do e-commerce, mantendo-o atualizado e refletindo as últimas alterações.

4. Relatórios e Logs: O sistema gera relatórios detalhados das importações, destacando eventuais problemas encontrados durante o processo. Também mantém registros de logs para fins de auditoria.

## Requisitos

- NodeJs
- Yarn ou npm
- Docker

## Instalação
### NodeJs e NPM

Para instalar o NodeJs e o npm, acesse o site oficial e siga as instruções de instalação: https://nodejs.org/en/download/

### Dcoker

Para instalar o Docker, acesse o site oficial e siga as instruções de instalação: https://docs.docker.com/get-docker/

### Yarn (opcional)

Para instalar o Yarn, acesse o site oficial e siga as instruções de instalação: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

## Configuração
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
