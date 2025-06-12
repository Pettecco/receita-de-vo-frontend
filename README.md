# Receita de Vó

Um app de receitas colaborativo feito com React, TypeScript, Vite e Mantine UI.

## Funcionalidades

- 📸 **Foto de Perfil:** Usuários podem enviar e atualizar sua foto de perfil via API.
- 📝 **Adicionar, Visualizar e Excluir Receitas:** Apenas o autor pode excluir sua própria receita.
- 👀 **Visualizações:** Cada vez que uma receita é visualizada, o contador de visualizações é incrementado e exibido.
- 💬 **Comentários:** Usuários podem comentar nas receitas, com foto de perfil ao lado de cada comentário.
- ❤️ **Curtir Receitas:** Curta e descurta receitas.
- 🔍 **Interface Moderna:** Layout responsivo e agradável usando componentes Mantine.

## Como rodar o projeto

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**

   - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

3. **Certifique-se de que o servidor backend está rodando**

   - O backend é um outro repositório e deve estar em execução para que o app funcione corretamente.

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Build para produção:**
   ```bash
   npm run build
   ```

## Estrutura do Projeto

- `src/components/` — Componentes React (RecipeCard, AddRecipeForm, RecipeDetails, etc)
- `src/pages/` — Páginas principais (HomePage, etc)
- `src/services/` — Funções de acesso à API
- `src/assets/` — Imagens e arquivos estáticos
