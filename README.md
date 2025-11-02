# 🎬 Film System

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Workflow Status (build)](https://img.shields.io/badge/Build-Success-brightgreen)](link-para-sua-workflow-ci)
[![Coverage](https://img.shields.io/badge/Coverage-85%25-brightgreen)](link-para-seu-relatorio-de-cobertura)
[![Acessar Projeto](https://img.shields.io/badge/Acessar_Projeto-4A90E2?style=for-the-badge&logo=vercel&logoColor=white)]([URL_DO_DEPLOY_AQUI](https://movie-db-ashy-six.vercel.app/))

Um sistema moderno de listagem e gerenciamento de filmes, construído com foco em **performance, experiência do usuário (UX)** e arquitetura escalável usando React e Redux Toolkit. O projeto utiliza a API do The Movie Database (TMDB).

## 🌟 Recursos Principais

* **Gerenciamento de Favoritos:** Usuários podem adicionar e remover filmes da lista de favoritos, persistindo os dados com `redux-persist`.
* **Carregamento Infinito (Infinite Scroll):** Utiliza `useInfiniteQuery` do TanStack React Query para carregar filmes sob demanda, otimizando a performance em grandes listas.
* **Performance Otimizada:** Implementação de técnicas avançadas de memoização (`React.memo`, `useMemo`, otimização de seletores Redux) para evitar re-renderizações desnecessárias.
* **Estilo Moderno:** Desenvolvido com Tailwind CSS para um design responsivo e personalizável.
* **Rotas e Navegação:** Uso de `react-router-dom` para navegação eficiente entre Home, Detalhes do Filme e Favoritos.

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Interface de usuário moderna e performática. |
| **Estado Global** | Redux Toolkit & React Redux | Gerenciamento centralizado e eficiente do estado de favoritos. |
| **Dados Assíncronos** | TanStack React Query (v5) | Cache, sincronização e gerenciamento de dados do TMDB. |
| **Persistência** | Redux Persist | Manter o estado de favoritos no armazenamento local. |
| **Roteamento** | React Router DOM (v6) | Navegação otimizada. |
| **Estilização** | Tailwind CSS & `cva` | Design utility-first, responsivo e classes componentizadas. |
| **Testes** | Vitest(Jest) & Testing Library | Testes unitários e de integração (componentes e lógica). |
| **Bundle** | Vite | Ferramenta de build extremamente rápida. |

## 📦 Primeiros Passos

### Pré-requisitos

Certifique-se de ter o Node.js (versão LTS) e o npm/yarn/pnpm instalados em sua máquina.

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/orloke/movie_db
cd film-system
npm install
```

## Variáveis de Ambiente

O projeto requer uma chave de API para acessar os dados do The Movie Database (TMDB). Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis:
```
VITE_API_URL="SUA_CHAVE_AQUI"
VITE_API_URL="https://api.themoviedb.org/3"
VITE_API_IMAGE_URL=https://image.tmdb.org/t/p
```


## 🛠️ Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite). |
| `npm run build` | Roda testes e constrói o projeto para produção. |
| `npm run preview` | Serve o build de produção localmente. |
| `npm run lint` | Executa o linter (`eslint`) para checagem de estilo e bugs. |
| `npm run test` | Executa os testes unitários e de integração uma vez. |
| `npm run test:watch` | Inicia os testes no modo *watch* (para desenvolvimento contínuo). |
| `npm run test:coverage` | Gera o relatório de cobertura de código (`c8`). |


## 🌐 Deploy e Qualidade

O projeto utiliza a **Vercel** para o deploy, escolhida por sua excelente integração com o ecossistema React/Vite e seu foco em performance de *frontend*.

**Garantia de Qualidade:**
O processo de *build* (`npm run build`) no ambiente de deploy é configurado para **rodar todos os testes (`vitest`) antes de gerar os artefatos de produção**. Isso garante que apenas o código que passou nas verificações de qualidade e cobre as funcionalidades esperadas seja entregue em produção.

## 🔗 Acesso Rápido

Você pode visualizar e interagir com a versão real do projeto aqui:

[**Acesse o Film System**](https://movie-db-ashy-six.vercel.app/)
