
# 🌐 Cripto Details

## 📝 Descrição

Este projeto exibe informações detalhadas de criptomoedas usando a **API CoinGecko**. A aplicação foi construída com **React**, **TypeScript** e **CSS**, oferecendo uma interface amigável para visualizar dados como preço atual, capitalização de mercado, baixa e alta de 24 horas e variação percentual de preço. Os dados são atualizados em tempo real, apresentando uma exibição organizada e responsiva.

## 🚀 Funcionalidades

- **📈 Visualização de Dados**: Consulte informações detalhadas das criptomoedas, incluindo preço atual, baixa e alta de 24 horas, capitalização de mercado e variação de preço.
- **♻️ Atualização em Tempo Real**: Informações diretamente da API CoinGecko para garantir dados atualizados.
- **📱 Design Responsivo**: Interface adaptável a diferentes tamanhos de tela para uma experiência de uso otimizada em dispositivos móveis e desktops.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - ⚛️ **ReactJS**: Biblioteca JavaScript para construção de interfaces dinâmicas e reativas.
  - 🔷 **TypeScript**: Superset de JavaScript que adiciona tipagem estática, aumentando a segurança e eficiência no desenvolvimento.
  - 🎨 **CSS**: Estilos personalizados para um visual agradável e organizado.

## 🗂️ Estrutura do Projeto

### Pastas e Arquivos

- 📂 **`src/components/`**: Componentes reutilizáveis da aplicação.
  - 🗂️ **Header**: Cabeçalho da aplicação.
  - 🗂️ **Layout**: Estrutura de layout que organiza as páginas.

- 📂 **`src/pages/`**: Páginas principais da aplicação.
  - 📊 **Detail**: Página de detalhes de uma criptomoeda específica, com os arquivos:
    - `index.tsx`: Componente principal da página de detalhes.
    - `detail.module.css`: Estilos para a página de detalhes.
  - 🏠 **Home**: Página inicial, com os arquivos:
    - `index.tsx`: Componente principal da página inicial.
    - `home.module.css`: Estilos para a página inicial.
  - 🚫 **Notfound**: Página de erro exibida para rotas inexistentes, com os arquivos:
    - `index.tsx`: Componente principal da página de erro.
    - `notfound.module.css`: Estilos para a página de erro.

- 📂 **`src/routes.tsx`**: Configuração de rotas e gerenciamento de acessos.

- 📂 **`src/App.tsx`**: Componente raiz que organiza as rotas e define a estrutura básica do layout da aplicação.

- 📂 **`src/index.css`**: Arquivo de estilos globais.

- 📂 **`src/main.tsx`**: Arquivo de entrada principal da aplicação.

## ⚙️ Instalação e Execução

1. **Clone o repositório do projeto:**
   ```bash
   git clone https://github.com/jhondharkyson520/cripto.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
   cd cripto
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute a aplicação:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   - Abra [http://localhost:5173](http://localhost:5173) no navegador para visualizar a interface.

---

### 📚 Notas sobre o Projeto

Este projeto utiliza a API **CoinGecko** para recuperar informações em tempo real das criptomoedas. É necessário estar conectado à internet para consultar os dados.
