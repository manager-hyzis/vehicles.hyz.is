# Vehicles - Classifiados de Veículos

Plataforma de classificados de veículos usados com suporte a pacotes para revendedoras, sistema de reputação, reviews e painel administrativo.

## Requisitos

- Node.js 18+
- PostgreSQL 12+
- pnpm (gerenciador de pacotes)

## Setup Inicial

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.local` e configure as variáveis:

```bash
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/vehicles"

# NextAuth.js v5
NEXTAUTH_SECRET="gere_uma_chave_segura_aqui"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID="seu_account_id"
CLOUDFLARE_ACCESS_KEY_ID="seu_access_key"
CLOUDFLARE_SECRET_ACCESS_KEY="seu_secret_key"
CLOUDFLARE_BUCKET_NAME="vehicles-images"
CLOUDFLARE_BUCKET_URL="https://seu_bucket.seu_account_id.r2.cloudflarestorage.com"

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="seu_public_key"
MERCADOPAGO_ACCESS_TOKEN="seu_access_token"
```

### 3. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
pnpm run generate

# Executar migrações
pnpm run migrate

# (Opcional) Seed do banco de dados
pnpm run seed
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
pnpm run dev
```

Acesse `http://localhost:3000`

## Stack Tecnológico

### Frontend
- **Next.js 16+** com App Router
- **React 19**
- **TailwindCSS 4** com PostCSS
- **shadcn/ui** para componentes
- **React Hook Form** para formulários
- **Zod** para validação
- **Lucide React** para ícones

### Backend
- **Next.js API Routes**
- **NextAuth.js v5** para autenticação
- **Prisma 7** como ORM
- **PostgreSQL** como banco de dados

### Integrações
- **Cloudflare R2** para armazenamento de imagens
- **Cloudflare Turnstile** para CAPTCHA
- **Mercado Pago** para pagamentos
- **AWS SDK** para S3 (R2)

### Recursos
- **PWA** (Progressive Web App)
- **DataTable shadcn/ui** para listagens
- **Identidade Visual Vermelha**
- **Design Responsivo Mobile-First**

## Estrutura de Pastas

```
vehicles.hyz.is/
├── app/
│   ├── (auth)/              # Páginas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard do usuário
│   ├── api/                 # API Routes
│   │   ├── auth/
│   │   ├── vehicles/
│   │   ├── users/
│   │   └── admin/
│   ├── layout.tsx
│   ├── page.tsx             # Homepage
│   └── globals.css
├── components/              # Componentes React
│   └── ui/                  # Componentes shadcn/ui
├── lib/
│   ├── auth/                # Configuração NextAuth
│   ├── cloudflare/          # Utilitários Cloudflare R2
│   ├── mercadopago/         # Utilitários Mercado Pago
│   ├── validations/         # Schemas Zod
│   └── prisma.ts            # Cliente Prisma
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   └── seed.ts              # Script de seed
├── public/                  # Arquivos estáticos
│   └── manifest.json        # Manifest PWA
├── hooks/                   # React Hooks customizados
├── .env.local               # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades Principais

### Autenticação
- Login/Registro com email e senha
- OAuth (Google, Facebook, Apple, Microsoft)
- NextAuth.js v5

### Usuários
- 4 tipos de perfil: Pessoa Física, Revendedora, Garage/Logista, Concessionária
- Perfil público para revendedoras
- Métrica de reputação com reviews

### Anúncios
- Cadastro em 7 etapas
- Upload de imagens para Cloudflare R2
- Busca simples e avançada
- Filtros por tipo de anunciante
- Sistema de denúncia anônima

### Pacotes e Pagamentos
- Pacotes de renovação: 3, 6, 9 meses (R$ 39, R$ 69, R$ 99)
- Serviços de destaque: Destaque, Super Destaque, Ofertão
- Integração com Mercado Pago
- Pagamento único (sem recorrência automática)

### Sistema de Reputação
- Métrica de reputação para revendedoras
- Reviews/avaliações de compradores
- Link único de avaliação pós-venda
- Histórico de vendas

### Painel Administrativo
- Gestão de usuários
- Moderação de anúncios
- Gestão de denúncias
- Gestão de planos e preços
- DataTable shadcn/ui para listagens

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build
pnpm run build

# Produção
pnpm run start

# Linting
pnpm run lint

# Prisma
pnpm run generate      # Gerar cliente Prisma
pnpm run migrate       # Executar migrações
pnpm run seed          # Executar seed
pnpm run prisma:reset-all  # Reset completo (dev only)
```

## Documentação do Escopo

Veja `SCOPE.md` para documentação completa do projeto, incluindo:
- Descrição detalhada de todas as funcionalidades
- Fluxos de usuário
- Especificações técnicas
- 21 prompts de desenvolvimento

## Próximas Etapas

1. Instalar dependências: `pnpm install`
2. Configurar variáveis de ambiente
3. Configurar banco de dados PostgreSQL
4. Executar migrações: `pnpm run migrate`
5. Iniciar servidor: `pnpm run dev`
6. Acessar http://localhost:3000

## Suporte

Para mais informações, consulte a documentação em `SCOPE.md`.
