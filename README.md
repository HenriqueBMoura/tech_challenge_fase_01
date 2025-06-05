# ByteBank - Aplicação de Internet Banking

Este projeto é uma aplicação de Internet Banking desenvolvida como parte do Tech Challenge da FIAP Pós-Tech, implementando funcionalidades essenciais para gestão financeira pessoal.

## 🚀 Visão Geral

ByteBank é uma aplicação web moderna que oferece serviços bancários digitais, permitindo aos usuários gerenciar suas finanças pessoais com uma interface intuitiva e segura.

## ✨ Funcionalidades Principais

- **Dashboard Completo**: Visualização clara do saldo e movimentações financeiras
- **Histórico de Transações**: Registro detalhado de operações com filtros e categorização
- **Gerenciamento de Transações**: Depósitos, transferências e pagamentos
- **Edição e Exclusão**: Controle completo sobre transações realizadas com confirmação por modal
- **Gestão de Cartões**: Visualização e configuração de cartões físicos e digitais
- **Visualização de Investimentos**: Acompanhamento de rendas fixas e variáveis

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React com renderização híbrida, otimização e roteamento avançado
- **React 18**: Biblioteca para construção de interfaces com componentes reutilizáveis
- **TypeScript**: Linguagem fortemente tipada que se compila para JavaScript
- **Tailwind CSS**: Framework CSS utilitário para design responsivo e customização
- **React Hooks**: Utilização de useState, useEffect para gerenciamento de estado

### Estilização e UI
- **Tailwind CSS**: Sistema de design flexível com classes utilitárias
- **CSS Modules**: Encapsulamento de estilos por componente
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela

### Estrutura e Ferramentas
- **App Router (Next.js)**: Sistema de roteamento baseado em arquivos
- **Client Components**: Interatividade rica do lado do cliente
- **Server Components**: Renderização eficiente no servidor
- **Next.js Image**: Otimização automática de imagens
- **ESLint**: Garantia de qualidade e consistência de código

## 📱 Recursos de UX/UI

- **Design Mobile-First**: Otimizado para experiência em dispositivos móveis
- **Modais de Confirmação**: Prevenção de ações acidentais
- **Formulários Validados**: Feedback em tempo real para o usuário
- **Feedback Visual**: Indicadores claros para todas as ações do usuário
- **Temas Consistentes**: Paleta de cores e elementos visuais padronizados
- **Página 404 Personalizada**: Experiência amigável mesmo em rotas não encontradas

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18.17.0 ou superior
- npm, yarn ou pnpm

### Passos para execução

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/tech_challenge_fase_01.git
cd tech_challenge_fase_01
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura do Projeto

```
/public           # Arquivos estáticos
  /dashboard      # Imagens usadas no dashboard
  /not-found      # Recursos para página 404
  /chart          # Gráficos e visualizações

/src
  /app            # Rotas e páginas da aplicação
    /dashboard    # Área logada do usuário
    /login        # Autenticação
    /servicos     # Serviços disponíveis
  /components     # Componentes reutilizáveis  
    /Layouts      # Componentes de layout
    /Cards.tsx    # Gerenciamento de cartões
    /Investments.tsx # Visualização de investimentos
    /TransactionForm.tsx # Formulário de transações
    /TransactionHistory.tsx # Histórico de operações
  /styles         # Estilos globais
  /utils          # Funções utilitárias
```

## 🌐 Acessando a Aplicação

- **Home**: [http://localhost:3000](http://localhost:3000)
- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Login**: [http://localhost:3000/login/signin](http://localhost:3000/login/signin)

## 📝 Funcionalidades Implementadas

### Gerenciamento de Transações
- **Criar Transações**: Depósitos, transferências e pagamentos com validação de dados
- **Editar Transações**: Modificação de transações existentes com verificação de saldo
- **Excluir Transações**: Remoção de transações com confirmação via modal
- **Categorização**: Organização por tipo e categoria de pagamento

### Interface de Usuário
- **Dashboard Responsivo**: Layout adaptável para desktop, tablet e mobile
- **Modais de Confirmação**: Interações seguras que previnem ações acidentais
- **Feedback Visual**: Alertas e mensagens informativas para todas as operações
- **Página 404 Personalizada**: Tratamento amigável para rotas não encontradas

### Visualização de Cartões
- **Cartões Físicos e Digitais**: Visualização detalhada dos cartões disponíveis
- **Opções de Configuração**: Controles para bloquear ou configurar cartões
- **Design Realista**: Representação visual fiel aos cartões bancários reais

---

Desenvolvido por Henrique Moura para o Tech Challenge da FIAP Pós-Tech em Arquitetura de Software.