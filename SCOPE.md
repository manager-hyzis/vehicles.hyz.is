# Escopo: Plataforma de Classificado de Veículos Usados

## 1. Visão Geral do Projeto

Plataforma web nacional para anúncio e busca de veículos usados, inspirada no modelo "Usado Fácil". Sistema completo com fluxo de cadastro de anúncios, gestão de usuários, busca simples e avançada de veículos com geolocalização. Maior portal automotivo do Brasil com interface amigável, sistema facilitado de busca e qualidade de serviços como referência de mercado.

---

## 2. Funcionalidades Principais

### 2.0 Busca Simples (Header Persistente)
**Componente presente em todas as páginas**
- **Localização**: Header com fundo verde (topo da página)
- **Campos de busca rápida**:
  - **Veículo** (campo de texto com autocomplete)
  - **Valor médio** (dropdown)
  - **Motorização** (dropdown)
  - **Ano** (dropdown)
  - **Cidade** (dropdown com geolocalização)
- **Botão de ação**: Buscar (ícone de lupa, laranja)
- **Funcionalidade**: Busca rápida por critérios básicos, redirecionando para resultados
- **Geolocalização**: Detecta localização do usuário para filtrar resultados por região
- **Links adicionais**:
  - "Busca avançada"
  - "Revendas por cidade"

### 2.1 Autenticação e Gestão de Usuários

#### 2.1.1 Registro de Usuários
**Página: "Faça seu cadastro"**
- **Seção: Tipo de Perfil** (NOVO - obrigatório)
  - Radio buttons para selecionar tipo de usuário:
    - **Pessoa Física** (particular)
    - **Revendedora Particular**
    - **Garage/Rotativa**
    - **Concessionária**
  - Descrição breve de cada tipo
  - Cada tipo tem funcionalidades diferentes

- **Seção: Dados do Usuário**
  - **Nome** (campo de texto obrigatório, ex: "Nome completo")
  - **E-mail** (campo de email obrigatório)
  - **Telefone** (campo com máscara, ex: "(DD) 99999-9999")
  - **Confirmar E-mail** (campo de email obrigatório)

- **Seção: Dados de Acesso**
  - **Senha** (campo de password obrigatório)
  - **Confirmar Senha** (campo de password obrigatório)

- **Seção: Verificação**
  - **CAPTCHA** (Cloudflare Turnstile - verificação numérica)
  - Campo de texto para digitar o texto da imagem

- **Seção: Preferências de Comunicação**
  - Checkbox: "Aceito receber ofertas semanais do Usado Fácil."
  - Checkbox: "Aceito receber promoções e ofertas dos parceiros."
  - Checkbox: "Aceito os termos da Política de Privacidade." (obrigatório)

- **Botão de ação**: "Cadastrar" (verde)

#### 2.1.2 Login de Usuários
**Página: "Faça login ou crie sua conta"**
- **Seção: Acessar minha conta**
  - **E-mail do usuário** (campo de email)
  - **Senha** (campo de password)
  - **Botão**: "Entrar" (verde)
  - **Link**: "Esqueceu sua senha?"
  - **Divider**: "ou continue com"
  - **Login Social** (NextAuth.js v5):
    - Google (botão com logo)
    - Facebook (botão com logo)
    - Apple (botão com logo)
    - Microsoft (botão com logo)

- **Seção: Criar nova conta**
  - Título: "Criar nova conta"
  - Descrição: "Crie sua conta gratuita e aproveite todas as vantagens do Usado Fácil:"
  - **Benefícios** (com ícones):
    - Cadastro rápido e fácil
    - Anuncie pelo melhor preço
    - Acesso em qualquer dispositivo
  - **Botão**: "Cadastre-se grátis" (laranja)

#### 2.1.3 Recuperação de Senha
- **Página: "Esqueceu sua senha?"**
  - Campo para inserir email
  - Botão "Enviar link de recuperação"
  - Email de confirmação com link para resetar senha

#### 2.1.4 Tipos de Usuários

**Usuário Normal (Pessoa Física)**
- Pode criar anúncios de veículos pessoais
- Acesso ao dashboard pessoal
- Editar dados pessoais
- Alterar senha
- Gerenciar preferências de comunicação
- Visualizar histórico de anúncios
- Sistema de favoritos
- Acesso a serviços de destaque (Destaque, Super Destaque, Ofertão)

**Revendedora Particular**
- Pode criar múltiplos anúncios (pacote de anúncios)
- Perfil de loja com:
  - Logo da empresa
  - Descrição
  - Localização
  - Contato
  - Página independente com todos os veículos da revenda
- Dashboard com estatísticas avançadas (visualizações, cliques, conversões)
- Gestão de estoque de veículos
- Relatórios de vendas
- **Sistema de Pacotes de Anúncios**:
  - Pacote 3 meses: R$ 39,00
  - Pacote 6 meses: R$ 69,00
  - Pacote 9 meses: R$ 99,00
  - Renovação automática/manual
- Acesso a serviços de destaque (Destaque, Super Destaque, Ofertão)
- Integração com sistema de pagamento

**Garage/Rotativa**
- Pode criar múltiplos anúncios (pacote de anúncios)
- Perfil de loja com:
  - Logo da empresa
  - Descrição
  - Localização
  - Contato
  - Página independente com todos os veículos da revenda
- Dashboard com estatísticas avançadas (visualizações, cliques, conversões)
- Gestão de estoque de veículos
- Relatórios de vendas
- **Sistema de Pacotes de Anúncios**:
  - Pacote 3 meses: R$ 39,00
  - Pacote 6 meses: R$ 69,00
  - Pacote 9 meses: R$ 99,00
  - Renovação automática/manual
- Acesso a serviços de destaque (Destaque, Super Destaque, Ofertão)
- Integração com sistema de pagamento

**Concessionária**
- Pode criar múltiplos anúncios (pacote de anúncios)
- Perfil de loja com:
  - Logo da empresa
  - Descrição
  - Localização
  - Contato
  - Página independente com todos os veículos da revenda
- Dashboard com estatísticas avançadas (visualizações, cliques, conversões)
- Gestão de estoque de veículos
- Relatórios de vendas
- **Sistema de Pacotes de Anúncios**:
  - Pacote 3 meses: R$ 39,00
  - Pacote 6 meses: R$ 69,00
  - Pacote 9 meses: R$ 99,00
  - Renovação automática/manual
- Acesso a serviços de destaque (Destaque, Super Destaque, Ofertão)
- Integração com sistema de pagamento

**Administrador**
- Acesso ao painel administrativo completo
- **Gestão de Usuários** (NOVO):
  - Visualizar lista de usuários (com filtros)
  - Visualizar detalhes do usuário
  - Alterar tipo de perfil:
    - Pessoa Física
    - Revendedora
    - Garage/Logista (mesmo perfil, tipo separado)
    - Concessionária
  - Ativar/Desativar usuário
  - Deletar usuário
  - Corrigir dados de cadastro (suporte)
- **Gestão de Anúncios**:
  - Moderar anúncios (verificar conteúdo)
  - Deletar anúncios (remover do ar)
  - Visualizar denúncias de anúncios
  - Classificar tipo de denúncia (golpe, conteúdo inadequado, etc.)
  - Visualizar detalhes completos do anúncio
- **Gestão de Planos**:
  - Visualizar planos de renovação (3, 6, 9 meses)
  - Visualizar serviços de destaque (Destaque, Ofertão)
  - Gerenciar preços dos planos
  - Visualizar histórico de pacotes contratados
- Visualização de relatórios e estatísticas gerais
- Gestão de categorias e marcas de veículos
- Gestão de tabela FIPE
- Configurações do sistema
- Gestão de pagamentos e transações
- Suporte a usuários

#### 2.1.5 Perfil de Usuário
- **Editar dados pessoais**
- **Alterar senha**
- **Perfil Público** (para Revendedoras, Garages, Concessionárias) - NOVO:
  - Logo/Avatar da empresa
  - Nome da empresa
  - Tipo (Revendedora, Garage, Concessionária)
  - Descrição
  - Localização (endereço, cidade, estado)
  - Contato (telefone, email, WhatsApp)
  - **Métrica de Reputação**:
    - Estrelas (1-5) - média das avaliações
    - Número total de avaliações
    - Número total de vendas
    - Tempo médio de resposta
    - Percentual de recomendação
  - **Seção de Reviews/Avaliações**:
    - Lista de reviews recebidos
    - Cada review mostra:
      - Estrelas (1-5)
      - Comentário do comprador
      - Data da avaliação
      - Veículo avaliado
    - Apenas reviews de compradores que receberam link de avaliação aparecem
  - Grid com veículos em estoque
  - Filtros por tipo, preço, ano, etc.
- **Gerenciar preferências de comunicação**
- **Dashboard do anunciante** (meus anúncios, estatísticas)
- **Tipo de conta** (Pessoa Física / Revendedor)

### 2.2 Cadastro de Anúncios (Multi-step Form)
Fluxo em 7 etapas conforme imagens:

**Etapa 1: Dados do Veículo**
- Categoria de veículo (dropdown):
  - Carros e Vans
  - Caminhões e Ônibus
  - Tratores e Máquinas Pesadas
  - Motos
  - Náutica
  - Outros
- Fabricante (dropdown com lista de marcas: Audi, BMW, BYD, CHEVROLET/GM, Citroen, Fiat, Ford, GWM, Honda, Hyundai, Jeep, Land Rover, Mercedes-Benz, Mitsubishi, Nissan, Peugeot, Renault, Toyota, Volkswagen, etc.)
- Ano Fabricação (dropdown: 2007-2025)
- Modelo (dropdown dinâmico baseado em fabricante - ex: COURIER, ECOSPORT, F-250, FIESTA, FIESTA SEDAN, FOCUS, FOCUS SEDAN, FUSION, KA, MUSTANG, RANGER)
- Versão (dropdown dinâmico baseado no modelo - ex: EcoSport 4WD 2.0, EcoSport 4WD 2.0 Flex, EcoSport XL 1.6, EcoSport XL 1.6 Flex, EcoSport XLS 1.6, EcoSport XLS 1.6 Flex, EcoSport XLS 2.0 Automático Flex, EcoSport XLS 2.0 Flex, EcoSport XLS Freestyle 1.6 Flex, EcoSport XLT 1.6, EcoSport XLT 1.6 Flex, EcoSport XLT 2.0, EcoSport XLT 2.0 Automático Flex, EcoSport XLT 2.0 Mecânico Flex, EcoSport XLT Freestyle 1.6 Flex)
- Nome Popular (campo de texto - título do anúncio, ex: "EcoSport XLT Freestyle 1.6 Flex")
- Quilometragem (KM) (campo numérico - ex: 120.000)
- Cor (dropdown com múltiplas opções: Preto, Prata, Branco, Branco Perolizado, Cinza, Laranja, Marrom, Roxo, Vermelho, Verde, Alumínio, Amarelo, Azul, Azul Marinho, Azul Perolizado, Bege, Bege Júpiter, Bege Metálico, Bordo, etc.)
- Motor (campo numérico - cilindrada em litros, ex: 1.6)
- Combustível (dropdown: Gasolina, Álcool, Diesel, Flex, GNV, Metanol, Tetrafuel, Híbrido, Elétrico)

**Etapa 2: Valor do Veículo**
- Preço do veículo (campo numérico em R$, ex: 30.000,00)
- Preço para Repasse (opcional - campo numérico em R$, ex: 28.000,00)
- **Integração com Tabela FIPE**: Exibição automática de:
  - Valor FIPE (ex: R$ 31.336)
  - Mês de Referência (ex: Novembro/2025)
  - Código FIPE (ex: 003318-9)

**Etapa 3: Componentes do Veículo**
Seleção de características/opcionais organizadas por categorias com toggle (checkboxes/badges):

**Segurança** (múltipla seleção):
- Air Bag ✓
- Alarme ✓
- Freio ABS ✓
- Sensor de Estacionamento ✓
- Farol de Neblina ✓
- Blindagem ✓

**Conforto** (múltipla seleção):
- Ar Condicionado ✓
- Direção Hidráulica ✓
- Direção Elétrica ✓
- Vidro Elétrico
- Trava Elétrica
- Bancos em Couro ✓
- Teto Solar

**Tecnologia** (múltipla seleção):
- Kit Multimídia ✓
- Computador de Bordo
- Câmera de Ré
- GPS
- Botão Start/Stop
- Partida Elétrica

**Mecânica** (múltipla seleção):
- Câmbio Automático
- Rodas de Liga Leve
- Suspensão a Ar
- Freio a Disco
- Turbo ✓

**Etapa 4: Observações**
Seleção de características pré-definidas (badges/tags) + campo de texto livre:

**Características pré-definidas** (múltipla seleção):
- Único Dono ✓
- Revisões em Concessionária
- IPVA Pago
- Pneus Novos
- Garantia de Fábrica

**Campo de Observações** (textarea):
- Texto livre para descrição detalhada (ex: "Carro em perfeito estado")
- Máximo de caracteres: 2000

**Etapa 5: Imagens do Veículo**
- **Área de upload**: Drag-and-drop ou clique para selecionar imagens
- **Limite**: Máximo 15 imagens
- **Dica**: "Clique em uma imagem após o upload para defini-la como capa"
- **Galeria de preview**: Exibição em grid das imagens enviadas
- **Funcionalidades por imagem**:
  - Botão de deletar (X)
  - Badge de "Capa" (para marcar imagem principal)
  - Ordenação (drag-and-drop para reordenar)
- **Validações**:
  - Tipos aceitos: JPG, PNG, WebP
  - Tamanho máximo por imagem: 5MB
  - Mínimo recomendado: 3 imagens

**Etapa 6: Contato do Anunciante**
- **Cidade** (dropdown com cidades brasileiras, ex: Cuiabá)
- **Nome** (campo de texto, ex: "Paulo R. Lima")
- **Celular** (campo com máscara de telefone, ex: "(11) 91080-6055")
- **Telefone/Celular Opcional** (campo adicional para segundo contato)

**Etapa 7: Revisão e Publicação**
- **Indicador de progresso**: 7 etapas com checkmarks (✓) para as concluídas
- **Preview do anúncio** com:
  - Foto principal do veículo
  - Título (ex: "EcoSport XLT Freestyle 1.6 Flex")
  - Informações resumidas em cards:
    - Ano (ex: 2006/2007)
    - Motor (ex: 1.6)
    - KM (ex: 120.000)
    - Cor (ex: Preto)
  - Preço destacado em botão verde (ex: "R$ 30.000,00")
  - Seção "Observações" (expansível)
  - Seção "Itens do Veículo" (expansível) - lista de componentes selecionados
- **Botão de ação**: "FINALIZAR CADASTRO" (verde)
- **Botão de voltar**: "VOLTAR"

### 2.3 Busca Avançada
**Página: "Busca Avançada"**
- **Filtros disponíveis** (com toggles on/off):
  - **Tipo** (toggle): Carros, Motos, Caminhões, etc.
  - **Carros** (toggle)
  - **Motos** (toggle)
  - **Caminhões, Ônibus e Vans** (toggle)
  - **Tratores e Máquinas Pesadas** (toggle)
  - **Náutica** (toggle)
  - **Marca** (dropdown: Selecione...)
  - **Versão** (campo de texto)
  - **Valor mínio** (dropdown: Selecione...)
  - **Mínio anúncio** (dropdown: Selecione...)
  - **Ano** (dropdown: Selecione...)
  - **Itens presentes** (toggles múltiplos):
    - Único dono
    - Carro importado
    - Direção elétrica
    - Alarme
    - Freio ABS
    - Direção hidráulica
    - Câmera de ré
    - Vidro elétrico
  - **Combustível** (dropdown: Selecione...)
  - **Tipo de Anunciante** (dropdown - NOVO):
    - Todos (padrão)
    - Pessoa Física
    - Revendedora
  - **Revendedora específica** (select dinâmico - aparece se selecionado "Revendedora"):
    - Dropdown com lista de revendedoras
    - Mostra logo da revendedora
    - Filtro opcional (não obrigatório)
- **Botão de ação**: "PESQUISAR" (verde)

### 2.4 Listagem de Anúncios
- Grid/lista de veículos com:
  - Foto principal
  - Marca e modelo
  - Ano
  - Preço
  - Localização
  - Quilometragem
  - **Botão de denúncia** (ícone de bandeira/alerta) - NOVO
    - Abre modal para denunciar anúncio
    - Tipos de denúncia: Golpe, Conteúdo inadequado, Veículo roubado, Outro
    - Campo de descrição (opcional)
    - Denúncia anônima (não identifica o denunciante)
    - POST /api/reports para criar denúncia
  - Data do anúncio
- Paginação
- Ordenação (mais recentes, menor preço, maior preço)
- Favoritos (salvar anúncios)

### 2.5 Detalhes do Anúncio
**Página: "Detalhes do Veículo"**
- **Galeria de imagens** (lado esquerdo):
  - Carousel/slider com imagens do veículo
  - Thumbnails abaixo para navegação
  - **Botão de denúncia** (ícone de bandeira/alerta) - NOVO
    - Abre modal para denunciar anúncio
    - Tipos de denúncia: Golpe, Conteúdo inadequado, Veículo roubado, Outro
    - Campo de descrição (opcional)
    - Denúncia anônima (não identifica o denunciante)
  - Imagem principal em destaque

- **Informações do veículo** (lado direito):
  - Título (ex: "FOX CONNECT 1.6 4P FLEX")
  - Informações resumidas em cards:
    - Ano (ex: 2021)
    - KM (ex: 50.000 km)
    - Motor (ex: 1.6)
    - Câmbio (ex: Manual)
    - Cor (ex: Vermelho)
  - **Informações do vendedor** (NOVO):
    - Foto/Avatar do vendedor
    - Nome do vendedor
    - Tipo (Pessoa Física, Revendedora, Garage, Concessionária)
    - **Métrica de Reputação** (para revendedores/garages/concessionárias):
      - Estrelas (1-5)
      - Número de avaliações
      - Número de vendas
      - Tempo médio de resposta
    - Botão "Ver Perfil do Vendedor"
    - Botão "Contato" (WhatsApp/Telefone)
    - Combustível (ex: Flex)
  - **Preço destacado** em botão verde (ex: "VALOR: R$ 58.900,00")
  - **Botão de ação**: "ENTRAR EM CONTATO" (verde com ícone)

- **Seção de Compartilhamento**:
  - Ícones de redes sociais (Facebook, Twitter, Instagram, LinkedIn, WhatsApp, etc.)
  - Texto: "COMPARTILHE"

- **Informações do Anunciante**:
  - Logo/Avatar do anunciante
  - Nome do anunciante (ex: "Mario Veículos")
  - Telefones (com ícone de WhatsApp)
  - Email
  - Endereço
  - Avaliação/Reputação

- **Seção "Fale uma Oferta Agora"** (expansível):
  - Formulário de contato com campos:
    - Nome
    - Email
    - Telefone
    - Mensagem
  - Botão de envio

- **Seção "Itens do Veículo"** (expansível):
  - Lista de componentes/opcionais selecionados

- **Funcionalidades adicionais**:
  - Denunciar anúncio (link)
  - Adicionar aos favoritos (botão/ícone)

### 2.6 Gestão de Anúncios (Anunciante) - Dashboard
**Página: "Meus Anúncios"**
- **Listagem de anúncios publicados** com:
  - Foto do veículo
  - Título/Modelo do veículo
  - Data de publicação
  - Status (Ativo, Pausado, Vendido)
  - Ações (Editar, Deletar, Pausar/Reativar, Destacar)
  
- **Filtros na listagem**:
  - Por status (Todos, Ativos, Pausados, Vendidos)
  - Por data (Mais recentes, Mais antigos)

- **Card de anúncio** exibe:
  - Número do anúncio (ex: "Anúncio nº 12345")
  - Data de publicação (ex: "Data do anúncio: 30/12/2025")
  - Categoria (ex: "Categoria: Carros e Vans")
  - Modelo (ex: "Modelo: EcoSport XLT Freestyle 1.6 Flex")
  - Botões de ação: Arquivar, Excluir, Reativar, Destacar

- **Funcionalidades**:
  - Editar anúncio (volta ao formulário multi-step)
  - Deletar anúncio (com confirmação)
  - Pausar/Reativar anúncio
  - Destacar anúncio (sistema de créditos)
  - Visualizar estatísticas (opcional: visualizações, cliques, favoritos)
  - **Marcar como Vendido** (NOVO):
    - Abre formulário para coletar informações de venda
    - Campos:
      - Data da venda
      - Preço final de venda
      - Método de pagamento
      - Observações (opcional)
    - Após submissão:
      - Gera link único de avaliação/review
      - Link pode ser compartilhado com o comprador
      - Anúncio é movido para status "Vendido"
      - Métrica de venda é registrada no perfil do vendedor
      - POST /api/vehicles/[id]/mark-sold para marcar como vendido
      - GET /api/vehicles/[id]/review-link para obter link de avaliação

### 2.7 Editar Cadastro (Perfil do Usuário)
**Página: "Alterar Cadastro"**
- **Seção: Dados do Usuário**
  - **Nome** (campo de texto obrigatório, ex: "Paulo R Lima")
  - **E-mail** (campo de email obrigatório, ex: "paulorlima333@gmail.com")
  - **Telefone** (campo de telefone, ex: "11 91080-6055")
  - **Endereço** (campo de texto)
  - **Bairro** (campo de texto)
  - **Cidade** (campo de texto)
  - **Estado** (dropdown obrigatório)
  - **País** (dropdown obrigatório)

- **Seção: Preferências de Comunicação**
  - Checkbox: "Sim, aceito receber em meu e-mail, semanalmente, as melhores ofertas do Usado Fácil."
  - Checkbox: "Sim, aceito receber em meu e-mail as promoções e ofertas que o Usado Fácil e seus parceiros realizarem."

- **Botão de ação**: "Alterar" (verde)

### 2.8 Página Inicial
**Página: "Home"**
- **Seção: Busca Rápida** (topo com fundo verde)
  - Dropdowns: Veículo, Valor mínio, Quilometragem, Ano
  - Botão de busca (laranja)
  - Links: "Busca avançada" e "Revendas por cidade"

- **Seção: Chamada para Ação**
  - Título: "Anuncie agora, fácil, rápido e seguro!"
  - 3 cards com ícones:
    1. "Inserir anúncio" - Clique aqui, insira anúncio para anunciar a venda do seu veículo
    2. "Informações" - Descreva e categorize o produto e informações adicionais
    3. "Feche negócio" - Clique nos anúncios publicados, mais de 100 mil anúncios mensais
  - Botão destacado: "Anunciar" (com mensagem: "Anuncie seu veículo e atraia compradores resultado!")

- **Seção: Ofertões** (NOVO)
  - Título: "Ofertões do Brasil"
  - Carrossel com veículos em destaque "Ofertão"
  - Cards com:
    - Foto
    - Título/Modelo
    - Preço destacado
    - Badge "Ofertão"
    - Localização (estado/cidade)
    - Botão "Ver Detalhes"
  - Válido para todo o país (não filtrado por localização)

- **Seção: Revendedoras**
  - Título: "Revendedoras"
  - Carrossel/Slider com logos de revendedoras
  - Cada logo é clicável e leva para página da revenda
  - Mostra: Logo, Nome da revenda, Número de veículos

- **Seção: Veículos em Destaque**
  - Cards de veículos com:
    - Foto
    - Título/Modelo
    - Preço
    - Botão "Ver Detalhes"
    - Badge "Destaque" se aplicável

### 2.6.1 Sistema de Avaliação/Review (NOVO)
**Página: "Avaliar Compra"** (acesso via link único)
- Link único gerado ao marcar anúncio como vendido
- Apenas quem recebeu o link pode acessar
- Formulário de avaliação:
  - **Estrelas** (1-5) - obrigatório
  - **Comentário** (textarea - opcional)
  - **Recomendaria este vendedor?** (sim/não)
  - Botão "Enviar Avaliação"
- Após submissão:
  - Review é salvo no perfil do vendedor
  - Métrica de reputação é atualizada
  - Comprador recebe confirmação
  - POST /api/reviews para criar review
  - Validação: apenas link válido pode submeter review
  - Cada link pode ser usado apenas uma vez

### 2.8.1 Página de Revendas por Cidade
**Página: "Revendas"**
- **Filtro por cidade** (dropdown com geolocalização)
- **Listagem de revendedoras** em carrossel/grid:
  - Logo da revenda
  - Nome da revenda
  - Tipo (Revendedora, Garage, Concessionária)
  - Localização (cidade, estado)
  - Número de veículos em estoque
  - Botão "Ver Veículos"
- **Página individual da revenda**:
  - Header com logo e informações da revenda
  - Descrição da revenda
  - Contato (telefone, email, endereço)
  - Grid com todos os veículos da revenda
  - Filtros por tipo, preço, ano, etc.

### 2.9 Sistema de Pacotes e Pagamento
**Página: "Pacotes de Anúncios"** (para Revendedoras)
- **Seleção de tipo de usuário**:
  - Pessoa Física: Anúncio único (preço unitário)
  - Revendedora: Pacotes de múltiplos anúncios

**Pacotes para Revendedoras**:
- **Pacote 3 meses**:
  - Duração: 3 meses
  - Quantidade de anúncios: Ilimitado
  - Preço: R$ 39,00 (exemplo)
  - Renovação: Manual

- **Pacote 6 meses**:
  - Duração: 6 meses
  - Quantidade de anúncios: Ilimitado
  - Preço: R$ 69,00 (desconto progressivo)
  - Renovação: Manual ou automática
  - Duração média de anúncio: 6 meses (renovação necessária)

- **Pacote 9 meses**:
  - Duração: 9 meses
  - Quantidade de anúncios: Ilimitado
  - Preço: R$ 99,00 (maior desconto)
  - Renovação: Manual ou automática

**Serviços de Destaque de Anúncios** (serviços à parte - opcionais):

**1. Destaque** (padrão):
- Upgrade individual para anúncios específicos
- Anúncio em destaque aparece no topo das buscas (por estado/localização)
- Duração: 30 dias
- Preço: R$ 50,00 (exemplo)
- Aplicável a qualquer tipo de usuário
- Renovação automática/manual

**2. Super Destaque** (aumentativo):
- Destaque premium com melhor posicionamento
- Anúncio aparece no topo das buscas com badge especial "Super Destaque"
- Maior visibilidade que o Destaque padrão
- Duração: 30 dias
- Preço: R$ 150,00 (exemplo)
- Aplicável a qualquer tipo de usuário
- Renovação automática/manual

**3. Ofertão** (destaque nacional):
- Destaque especial para veículos com boa margem de preço
- Aparece para o **país inteiro** (não limitado por estado/localização)
- Diferente dos filtros normais que são filtrados por estado
- Seção especial "Ofertões do Brasil" na página inicial
- Carrossel de ofertões em destaque
- Filtro de ofertões na busca avançada (checkbox "Mostrar apenas ofertões")
- Badge "Ofertão" no card do veículo
- Duração: 30 dias
- Preço: R$ 1.500,00 (exemplo)
- Aplicável a qualquer tipo de usuário
- Renovação automática/manual

**Página: "Pagamento"**
- **Resumo do pacote selecionado**:
  - Serviço: "PACOTE 3/6/9 MESES" ou "ANUNCIAR VEÍCULO" ou "DESTAQUE" ou "OFERTÃO"
  - Duração: 3/6/9 meses (para pacotes) ou 30 dias (para destaques)
  - Preço: R$ XXXX,00
  - **Aviso importante**: "Este é um pagamento único. Ao vencer o período, você poderá renovar manualmente."
  - Sem recorrência automática

- **Formas de pagamento disponíveis** (via Mercado Pago):
  - **Cartão de Crédito** (Visa, Mastercard, Elo, Hipercard, American Express)
  - **Cartão de Débito** (Visa, Mastercard, Elo, Hipercard)
  - **PIX** (transferência instantânea)
  - **Boleto Bancário** (com código de barras)
  - **Pix Parcelado** (se disponível)

- **Bandeiras aceitas**:
  - Visa, Mastercard, Elo, Diners Club, American Express, Hipercard

- **Informações adicionais**:
  - Integração com Mercado Pago
  - Processamento seguro de pagamento
  - Confirmação imediata de pagamento
  - Link para contato/suporte

- **Funcionalidades**:
  - Seleção de forma de pagamento (radio buttons)
  - Redirecionamento para Mercado Pago (checkout)
  - Webhook para confirmação de pagamento
  - Confirmação de pagamento na plataforma
  - Histórico de transações do usuário
  - **Modelo de Renovação**:
    - Sem cobrança automática
    - Usuário recebe notificação 7 dias antes do vencimento
    - Ao vencer, pacote expira
    - Usuário pode renovar manualmente pagando novamente

### 2.10 Painel Administrativo - Gestão de Usuários (NOVO)
**Página: "/admin/usuarios"** (protegida - apenas admin)
- **Listagem de usuários**:
  - Filtros:
    - Por tipo de perfil (Pessoa Física, Revendedora, Garage/Logista, Concessionária)
    - Por status (Ativo, Inativo)
    - Por data de cadastro
    - Por nome/email (busca)
  - Tabela com colunas:
    - Nome
    - Email
    - Tipo de perfil
    - Status
    - Data de cadastro
    - Ações (Editar, Visualizar, Deletar)

- **Detalhes do usuário**:
  - Informações pessoais:
    - Nome, Email, Telefone
    - Endereço, Cidade, Estado
  - **Tipo de Perfil** (dropdown para alterar):
    - Pessoa Física
    - Revendedora
    - Garage/Logista (mesmo perfil, tipo separado)
    - Concessionária
  - Status (Ativo/Inativo)
  - Data de cadastro
  - Última atividade
  - Número de anúncios
  - Número de vendas
  - Métrica de reputação (se aplicável)
  - **Ações**:
    - Botão "Salvar Alterações"
    - Botão "Ativar/Desativar"
    - Botão "Deletar Usuário" (com confirmação)
    - Botão "Visualizar Anúncios"

- **Funcionalidades**:
  - GET /api/admin/users para listar usuários
  - GET /api/admin/users/[id] para detalhes do usuário
  - PUT /api/admin/users/[id] para atualizar tipo de perfil e dados
  - PUT /api/admin/users/[id]/status para ativar/desativar
  - DELETE /api/admin/users/[id] para deletar usuário

### 2.10.1 Painel Administrativo - Moderação de Anúncios (NOVO)
**Página: "/admin/moderacao"** (protegida - apenas admin)
- **Listagem de anúncios para moderação**:
  - Filtros:
    - Por status (Pendente, Aprovado, Rejeitado)
    - Por data (mais recentes)
    - Por tipo de denúncia (se houver)
  - Cards de anúncio com:
    - Foto principal
    - Título/Modelo
    - Vendedor (nome, tipo)
    - Data de publicação
    - Número de denúncias (se houver)
    - Status atual

- **Detalhes do anúncio para moderação**:
  - Galeria completa de imagens
  - Todas as informações do veículo
  - Informações do vendedor
  - **Seção de Denúncias** (se houver):
    - Lista de denúncias anônimas
    - Cada denúncia mostra:
      - Tipo de denúncia (Golpe, Conteúdo inadequado, Veículo roubado, Outro)
      - Descrição
      - Data da denúncia
      - Número de denúncias similares
  - **Ações de moderação**:
    - Botão "Aprovar Anúncio"
    - Botão "Rejeitar Anúncio" (com motivo obrigatório)
    - Botão "Remover Anúncio" (com motivo obrigatório)
    - Botão "Marcar como Resolvido" (para denúncias)

- **Funcionalidades**:
  - PUT /api/admin/moderacao/[id]/approve para aprovar
  - PUT /api/admin/moderacao/[id]/reject para rejeitar
  - DELETE /api/admin/moderacao/[id] para remover
  - GET /api/admin/reports para listar denúncias
  - Notificação ao vendedor quando anúncio é rejeitado/removido

### 2.10.2 Painel Administrativo - Gestão de Planos (NOVO)
**Página: "/admin/planos"** (protegida - apenas admin)
- **Listagem de Planos de Renovação**:
  - Tabela com colunas:
    - Nome do plano (3 meses, 6 meses, 9 meses)
    - Preço atual
    - Tipo de usuário (Revendedora, Garage/Logista, Concessionária)
    - Número de contratos ativos
    - Ações (Editar preço, Visualizar histórico)

- **Detalhes do Plano**:
  - Nome do plano
  - Duração (meses)
  - Preço (editável)
  - Descrição
  - Número de contratos ativos
  - Histórico de preços
  - **Ações**:
    - Botão "Editar Preço"
    - Botão "Visualizar Contratos"

- **Listagem de Serviços de Destaque**:
  - Tabela com colunas:
    - Nome do serviço (Destaque, Ofertão)
    - Preço atual
    - Duração (dias)
    - Número de contratos ativos
    - Ações (Editar preço, Visualizar histórico)

- **Detalhes do Serviço**:
  - Nome do serviço
  - Preço (editável)
  - Duração (dias)
  - Descrição
  - Número de contratos ativos
  - Histórico de preços
  - **Ações**:
    - Botão "Editar Preço"
    - Botão "Visualizar Contratos"

- **Funcionalidades**:
  - GET /api/admin/plans para listar planos
  - GET /api/admin/plans/[id] para detalhes do plano
  - PUT /api/admin/plans/[id] para atualizar preço
  - GET /api/admin/highlights para listar serviços de destaque
  - GET /api/admin/highlights/[id] para detalhes do serviço
  - PUT /api/admin/highlights/[id] para atualizar preço

### 2.11 Painel Administrativo - Gestão de Denúncias (NOVO)
**Página: "/admin/denuncias"** (protegida - apenas admin)
- **Listagem de denúncias**:
  - Filtros:
    - Por status (Pendente, Em análise, Resolvido)
    - Por tipo (Golpe, Conteúdo inadequado, Veículo roubado, Outro)
    - Por data
  - Cards de denúncia com:
    - Tipo de denúncia
    - Anúncio denunciado
    - Data da denúncia
    - Status
    - Número de denúncias similares

- **Detalhes da denúncia**:
  - Informações do anúncio denunciado
  - Descrição da denúncia
  - Data e hora
  - Histórico de denúncias similares
  - **Ações**:
    - Botão "Marcar como Resolvido"
    - Botão "Remover Anúncio" (se necessário)
    - Campo de observações (para documentar ação tomada)

---

## 3. Estrutura Técnica

### 3.1 Stack Tecnológico

#### Frontend
- **Framework**: Next.js 16+ com App Router
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: React Context / Zustand
- **Formulários**: React Hook Form + Zod (validação)
- **Componentes**: shadcn/ui (Button, Input, Select, Checkbox, DataTable, etc.)
- **Identidade Visual**: Vermelha (cor primária)
- **Design**: Interface moderna, layout adaptativo (mobile-first responsivo)
- **PWA**: Sim (Progressive Web App com suporte offline)
- **Datatables**: shadcn/ui DataTable (para listagens no painel administrativo)

#### Backend
- **Framework**: Next.js App Router (API Routes)
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 7
- **Autenticação**: NextAuth.js v5
  - Autenticação local (Email + Senha com bcrypt)
  - OAuth 2.0 com provedores:
    - Google
    - Facebook
    - Apple
    - Microsoft
- **Validação**: Zod
- **Geolocalização**: Biblioteca de geolocalização (ex: geolib, turf.js)

#### Armazenamento e Segurança
- **Imagens**: Cloudflare R2 (S3-compatible object storage)
- **CAPTCHA**: Cloudflare Turnstile (verificação numérica)
- **CDN**: Cloudflare CDN para otimização de imagens

#### Pagamento
- **Gateway**: Mercado Pago
- **Modelo**: Pagamento único (sem recorrência automática)
  - Usuário paga pelo período (3, 6, 9 meses)
  - Ao vencer o período, o pacote expira
  - Usuário pode renovar manualmente pagando novamente
  - Sem cobrança automática

#### Deployment
- **Hosting**: Vercel (Next.js) ou similar
- **Banco de Dados**: Managed PostgreSQL (Railway, Supabase, etc.)
- **Variáveis de Ambiente**: .env.local com credenciais Cloudflare e Mercado Pago

### 3.2 Estrutura de Pastas (Next.js App Router)
```
vehicles.hyz.is/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── meus-anuncios/
│   │   ├── alterar-cadastro/
│   │   └── layout.tsx
│   ├── anuncios/
│   │   ├── [id]/
│   │   └── novo/
│   ├── busca/
│   │   ├── avancada/
│   │   └── resultados/
│   ├── api/
│   │   ├── auth/
│   │   ├── vehicles/
│   │   ├── users/
│   │   ├── images/
│   │   └── search/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── VehicleForm/
│   ├── VehicleCard.tsx
│   └── ...
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── cloudflare.ts
│   ├── geolocation.ts
│   └── validation.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── images/
├── .env.local
├── next.config.ts
└── tsconfig.json
```

### 3.3 Banco de Dados (Schema Prisma 7)

```prisma
// User Model
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // hashed with bcrypt
  name          String
  phone         String
  type          UserType  @default(PESSOA_FISICA) // PESSOA_FISICA | REVENDEDOR
  
  // Address
  street        String?
  neighborhood  String?
  city          String
  state         String
  country       String   @default("BR")
  zipCode       String?
  
  // Geolocation
  latitude      Float?
  longitude     Float?
  
  // Preferences
  acceptOffers  Boolean  @default(true)
  acceptPartnerOffers Boolean @default(true)
  
  // Relations
  vehicles      Vehicle[]
  favorites     Favorite[]
  contacts      Contact[]
  transactions  Transaction[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum UserType {
  PESSOA_FISICA
  REVENDEDOR
}

// Vehicle Model
model Vehicle {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Basic Info
  category      String    // Carros e Vans, Motos, etc.
  brand         String
  model         String
  version       String
  year          Int
  
  // Details
  title         String    // Nome Popular
  mileage       Int       // Quilometragem em KM
  color         String
  engineSize    Float     // Motor em litros (ex: 1.6)
  fuel          String    // Gasolina, Diesel, Flex, etc.
  transmission  String    // Manual, Automático
  
  // Pricing
  price         Decimal   @db.Decimal(10, 2)
  resalePrice   Decimal?  @db.Decimal(10, 2) // Preço para Repasse
  fipeValue     Decimal?  @db.Decimal(10, 2) // Valor FIPE
  fipeCode      String?
  fipeMonth     String?   // Mês de Referência
  
  // Description
  description   String    @db.Text
  
  // Features (JSON array)
  features      Json      // {safety: [...], comfort: [...], technology: [...], mechanics: [...]}
  observations  String[]  // Único Dono, IPVA Pago, etc.
  
  // Status
  status        VehicleStatus @default(ACTIVE) // ACTIVE, PAUSED, SOLD
  views         Int       @default(0)
  
  // Geolocation
  latitude      Float?
  longitude     Float?
  
  // Relations
  images        VehicleImage[]
  favorites     Favorite[]
  contacts      Contact[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([city])
  @@fulltext([title, description]) // MySQL fulltext search
}

enum VehicleStatus {
  ACTIVE
  PAUSED
  SOLD
}

// Vehicle Images Model
model VehicleImage {
  id            String    @id @default(cuid())
  vehicleId     String
  vehicle       Vehicle   @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  // Cloudflare R2
  imageUrl      String    // URL da imagem no R2
  imageKey      String    // Chave no R2 para deleção
  isCover       Boolean   @default(false)
  order         Int
  
  createdAt     DateTime  @default(now())
  
  @@index([vehicleId])
}

// Favorites Model
model Favorite {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  vehicleId     String
  vehicle       Vehicle   @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime  @default(now())
  
  @@unique([userId, vehicleId])
  @@index([userId])
}

// Contact/Message Model
model Contact {
  id            String    @id @default(cuid())
  vehicleId     String
  vehicle       Vehicle   @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  userId        String?
  user          User?     @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  senderName    String
  senderEmail   String
  senderPhone   String
  message       String    @db.Text
  
  createdAt     DateTime  @default(now())
  
  @@index([vehicleId])
  @@index([userId])
}

// Transactions Model (Pagamentos)
model Transaction {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  service       String    // ANUNCIAR_VEICULO, DESTACAR_ANUNCIO
  amount        Decimal   @db.Decimal(10, 2)
  paymentMethod String    // PIX, CREDIT_CARD, BOLETO
  status        TransactionStatus @default(PENDING)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([userId])
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}
```

---

## 4. Prompts para Desenvolvimento

### Prompt 1: Setup Inicial - Next.js 16 com App Router
```
Crie um projeto Next.js 16 com App Router:
- Estrutura de pastas (app/, components/, lib/, prisma/)
- Configuração de TailwindCSS
- Configuração de shadcn/ui
- Configuração de TypeScript
- Variáveis de ambiente (.env.local):
  * DATABASE_URL (PostgreSQL)
  * CLOUDFLARE_R2_ACCOUNT_ID
  * CLOUDFLARE_R2_ACCESS_KEY_ID
  * CLOUDFLARE_R2_SECRET_ACCESS_KEY
  * CLOUDFLARE_R2_BUCKET_NAME
  * CLOUDFLARE_TURNSTILE_SECRET_KEY
  * CLOUDFLARE_TURNSTILE_SITE_KEY
  * JWT_SECRET
- README com instruções de setup e variáveis de ambiente
```

### Prompt 2: Configuração Prisma 7 e Banco de Dados
```
Configure Prisma 7 com PostgreSQL:
- Schema Prisma com modelos: User, Vehicle, VehicleImage, Favorite, Contact, Transaction
- Migrations iniciais
- Seed com dados de exemplo:
  * Categorias de veículos
  * Marcas e modelos de carros
  * Estados e cidades brasileiras
- Configuração de relacionamentos com cascata
- Índices para performance (userId, status, city, geolocation)
- Fulltext search para título e descrição
```

### Prompt 3: Autenticação com NextAuth.js v5
```
Implemente sistema de autenticação com NextAuth.js v5:
- Configuração de NextAuth.js v5 com Prisma Adapter
- Autenticação local (Email + Senha):
  * Registro de usuário (POST /api/auth/register):
    - Validação com Zod
    - Hash de senha com bcrypt
    - CAPTCHA Cloudflare Turnstile
    - Email de confirmação (opcional)
  * Login (POST /api/auth/login):
    - Validação de credenciais
    - Sessão segura com NextAuth.js
- OAuth 2.0 com provedores:
  * Google (Google OAuth 2.0)
  * Facebook (Facebook Login)
  * Apple (Sign in with Apple)
  * Microsoft (Microsoft Entra ID)
- Middleware de proteção de rotas (NextAuth.js middleware)
- Recuperação de senha (POST /api/auth/forgot-password)
- Perfil de usuário (GET/PUT /api/users/[id])
- Sincronização de dados de usuário OAuth com banco de dados
- Tipos de usuário (PESSOA_FISICA, REVENDEDOR, ADMIN)
```

### Prompt 3.1: Painel Administrativo
```
Implemente painel administrativo:
- Página /admin (protegida - apenas ADMIN)
- Gestão de usuários:
  * Listagem com filtros (tipo, status, data de criação)
  * Editar tipo de usuário
  * Ativar/desativar conta
  * Deletar usuário
- Gestão de anúncios:
  * Listagem com filtros (status, usuário, data)
  * Moderar anúncios (aprovar, rejeitar, deletar)
  * Destacar anúncios
- Relatórios e estatísticas:
  * Total de usuários, anúncios, transações
  * Gráficos de crescimento
  * Receita total
- Gestão de categorias e marcas de veículos
- Gestão de tabela FIPE
- Configurações do sistema
```

### Prompt 4: Geolocalização e Busca Simples
```
Implemente busca simples com geolocalização:
- Header persistente em todas as páginas com busca rápida
- Campos: Veículo, Valor médio, Motorização, Ano
- Detecção automática de geolocalização do usuário (latitude/longitude)
- API GET /api/search/quick com filtros básicos
- Resultados ordenados por proximidade geográfica
- Paginação (limit, offset)
- Integração com biblioteca geolib ou turf.js para cálculo de distância
```

### Prompt 5: Cadastro de Anúncios (Etapas 1-3)
```
Crie formulário multi-step para cadastro de veículos:
- Etapa 1: Dados do Veículo
  * Categoria, Fabricante, Ano, Modelo, Versão (dropdowns dinâmicos)
  * Nome Popular, Quilometragem, Cor, Motor, Combustível
  * Validação com React Hook Form + Zod
- Etapa 2: Valor do Veículo
  * Preço, Preço para Repasse
  * Integração com API FIPE (valor, código, mês de referência)
- Etapa 3: Componentes do Veículo
  * Seleção de características por categoria (Segurança, Conforto, Tecnologia, Mecânica)
  * Persistência de dados entre etapas (Context ou Zustand)
- Navegação (voltar/continuar)
- Indicador de progresso (7 etapas)
```

### Prompt 6: Cadastro de Anúncios (Etapas 4-7)
```
Crie as etapas finais do cadastro:
- Etapa 4: Observações
  * Seleção de características pré-definidas (Único Dono, IPVA Pago, etc.)
  * Campo textarea para descrição detalhada
- Etapa 5: Upload de Imagens
  * Drag-and-drop ou clique para selecionar
  * Máximo 15 imagens
  * Preview em grid
  * Marcar imagem como capa
  * Reordenação (drag-and-drop)
- Etapa 6: Contato do Anunciante
  * Cidade, Nome, Celular, Telefone opcional
  * Pré-preenchimento com dados do usuário
- Etapa 7: Revisão e Publicação
  * Preview completo do anúncio
  * Botão "FINALIZAR CADASTRO"
- POST /api/vehicles para salvar anúncio
```

### Prompt 7: Upload de Imagens com Cloudflare R2
```
Implemente sistema de upload com Cloudflare R2:
- Upload múltiplo com preview
- Integração com Cloudflare R2 (S3-compatible)
- Validação: JPG, PNG, WebP, máx 5MB por imagem
- Compressão/otimização de imagens antes do upload
- Armazenamento de imageUrl e imageKey no banco (Prisma)
- Deleção de imagens (DELETE /api/images/[id])
- CDN Cloudflare para otimização automática
- Geração de URLs públicas do R2
```

### Prompt 4.1: Perfil de Revenda
```
Implemente perfil de revenda para revendedoras/garages:
- Página /revenda/[id] com informações da revenda:
  * Logo da revenda
  * Nome e descrição
  * Tipo (Revendedora, Garage, Concessionária)
  * Localização (endereço, cidade, estado)
  * Contato (telefone, email)
  * Número de veículos em estoque
- Grid com todos os veículos da revenda
- Filtros por tipo, preço, ano, combustível
- Ordenação (mais recentes, menor preço, maior preço)
- Paginação
- API GET /api/revendas/[id] e GET /api/revendas/[id]/vehicles
```

### Prompt 4.2: Página de Revendas por Cidade
```
Implemente página de revendas filtradas por cidade:
- Página /revendas com listagem de revendedoras
- Filtro por cidade (dropdown com geolocalização)
- Carrossel/Grid com revendedoras:
  * Logo
  * Nome
  * Tipo (Revendedora, Garage, Concessionária)
  * Localização
  * Número de veículos
  * Botão "Ver Veículos"
- API GET /api/revendas com filtro por cidade
- Ordenação por proximidade geográfica
```

### Prompt 8: Busca Avançada com Filtro de Revenda e Ofertões
```
Implemente página de busca avançada:
- Filtros com toggles e dropdowns:
  * Tipo de veículo (Carros, Motos, Caminhões, etc.)
  * Marca, Versão, Valor, Ano
  * Itens presentes (Único dono, Direção elétrica, etc.)
  * Combustível
  * **Tipo de Anunciante** (Todos, Pessoa Física, Revendedora) - NOVO
  * **Revendedora específica** (select dinâmico - aparece se selecionado "Revendedora") - NOVO
  * **Mostrar apenas Ofertões** (checkbox) - NOVO
- API GET /api/search/advanced com múltiplos filtros
- Geolocalização: filtrar por estado/cidade
- Ordenação (mais recentes, menor preço, maior preço)
- Paginação
- Botão "PESQUISAR"
- Filtro de revenda é opcional (não obrigatório)
- Filtro de ofertões é opcional (não obrigatório)
- Ofertões aparecem para todo o país (não filtrado por localização)
```

### Prompt 9: Listagem e Detalhes do Anúncio
```
Crie páginas de listagem e detalhes:
- Listagem (GET /api/vehicles):
  * Grid/lista de veículos com foto, marca, modelo, ano, preço, localização
  * Paginação
  * Ordenação
  * Botão de favoritar
- Detalhes do Anúncio (GET /api/vehicles/[id]):
  * Galeria de imagens (carousel com thumbnails)
  * Informações em cards (Ano, KM, Motor, Câmbio, Cor, Combustível)
  * Preço destacado
  * Compartilhamento em redes sociais
  * Informações do anunciante
  * Formulário "Fale uma Oferta Agora"
  * Seção de Itens do Veículo
  * Incrementar contador de visualizações
```

### Prompt 10: Dashboard do Anunciante
```
Crie dashboard de anúncios:
- Página /dashboard/meus-anuncios (protegida por autenticação)
- Listagem de anúncios do usuário (GET /api/vehicles/user/[userId])
- Filtros: por status (Todos, Ativos, Pausados, Vendidos)
- Ações por anúncio:
  * Editar (volta ao formulário multi-step)
  * Deletar (com confirmação)
  * Pausar/Reativar
  * Destacar (sistema de créditos)
- Estatísticas: visualizações, cliques, favoritos (opcional)
```

### Prompt 11: Editar Cadastro e Perfil
```
Implemente páginas de perfil:
- Página /dashboard/alterar-cadastro (protegida)
- Formulário com campos:
  * Nome, Email, Telefone
  * Endereço, Bairro, Cidade, Estado, País
  * Preferências de comunicação (checkboxes)
- PUT /api/users/[id] para atualizar dados
- Validação com Zod
- Feedback de sucesso/erro
```

### Prompt 12: Sistema de Favoritos
```
Implemente sistema de favoritos:
- Botão de favoritar em anúncios (POST /api/favorites)
- Página /dashboard/favoritos (GET /api/favorites/user/[userId])
- Remover de favoritos (DELETE /api/favorites/[id])
- Sincronização com banco de dados (Prisma)
- Indicador visual de favorito (coração preenchido/vazio)
```

### Prompt 13: Sistema de Pacotes de Anúncios para Revendedoras
```
Implemente sistema de pacotes de anúncios:
- Página /pacotes (protegida)
- Seleção de tipo de usuário:
  * Pessoa Física: Anúncio único
  * Revendedora/Garage/Concessionária: Pacotes (3, 6, 9 meses)
- Pacotes para Revendedoras:
  * Pacote 3 meses: R$ 39,00 (exemplo)
  * Pacote 6 meses: R$ 69,00 (desconto progressivo)
  * Pacote 9 meses: R$ 99,00 (maior desconto)
- Resumo do pacote selecionado
- Opção de renovação automática
- POST /api/packages para criar pacote
- GET /api/packages/user/[userId] para listar pacotes do usuário
```

### Prompt 13.0: Serviços de Destaque de Anúncios
```
Implemente serviços de destaque de anúncios (à parte - opcionais):
- Página /servicos-destaque (protegida)
- Três tipos de destaque:
  
  1. Destaque (padrão):
     * Anúncio em destaque aparece no topo das buscas (por estado/localização)
     * Duração: 30 dias
     * Preço: R$ 50,00 (exemplo)
     * Renovação automática/manual
  
  2. Super Destaque (aumentativo):
     * Destaque premium com melhor posicionamento
     * Badge especial "Super Destaque" no card
     * Maior visibilidade que Destaque padrão
     * Duração: 30 dias
     * Preço: R$ 150,00 (exemplo)
     * Renovação automática/manual
  
  3. Ofertão (destaque nacional):
     * Aparece para todo o país (não filtrado por localização)
     * Badge "Ofertão" no card
     * Seção especial "Ofertões do Brasil" na página inicial
     * Duração: 30 dias
     * Preço: R$ 1.500,00 (exemplo)
     * Renovação automática/manual

- Seleção de veículo para destacar
- Resumo do serviço selecionado
- POST /api/highlights para criar destaque
- GET /api/highlights/user/[userId] para listar destaques do usuário
- DELETE /api/highlights/[id] para remover destaque
- Aplicável a qualquer tipo de usuário
```

### Prompt 13.0: Sistema de Ofertões
```
Implemente sistema de Ofertões (destaque nacional):
- Página /ofertao (protegida)
- Seleção de veículo para destacar como Ofertão
- Resumo do veículo:
  * Foto
  * Título/Modelo
  * Preço
  * Localização (estado/cidade)
  * Descrição
- Duração: 30 dias
- Preço: R$ 1.500,00 (exemplo)
- Opção de renovação automática
- Ofertões aparecem para todo o país (não filtrado por localização)
- Badge "Ofertão" no card do veículo
- Seção especial "Ofertões do Brasil" na página inicial (carrossel)
- Filtro "Mostrar apenas Ofertões" na busca avançada
- API GET /api/ofertoes (sem filtro de localização)
- POST /api/ofertoes para criar ofertão
- GET /api/ofertoes/user/[userId] para listar ofertões do usuário
- DELETE /api/ofertoes/[id] para remover ofertão
```

### Prompt 13.1: Sistema de Pagamento com Mercado Pago
```
Implemente página de pagamento com Mercado Pago:
- Página /pagamento (protegida)
- Resumo do serviço (ANUNCIAR_VEÍCULO, PACOTE_3_MESES, PACOTE_6_MESES, PACOTE_9_MESES, DESTAQUE, OFERTÃO)
- Duração e preço do serviço
- **Aviso importante**: "Este é um pagamento único. Sem recorrência automática."
- Formas de pagamento (via Mercado Pago):
  * Cartão de Crédito (Visa, Mastercard, Elo, Hipercard, Amex)
  * Cartão de Débito (Visa, Mastercard, Elo, Hipercard)
  * PIX (transferência instantânea)
  * Boleto Bancário
  * Pix Parcelado (se disponível)
- Integração com Mercado Pago SDK
- Redirecionamento para checkout do Mercado Pago
- Webhook para confirmação de pagamento
- POST /api/transactions para criar transação
- POST /api/mercadopago/webhook para receber confirmação
- Confirmação de pagamento na plataforma
- Histórico de transações (GET /api/transactions/user/[userId])
- **Modelo de Renovação**:
  * Sem cobrança automática
  * Notificação 7 dias antes do vencimento
  * Ao vencer, pacote expira
  * Usuário pode renovar manualmente
- Preços diferenciados para Pessoa Física vs Revendedor
```

### Prompt 14: Sistema de Denúncia de Anúncios
```
Implemente sistema de denúncia anônima:
- Botão "Denunciar" em listagem e detalhes de anúncios
- Modal de denúncia com:
  * Tipo de denúncia (dropdown): Golpe, Conteúdo inadequado, Veículo roubado, Outro
  * Descrição (textarea - opcional)
  * Checkbox: "Denúncia anônima" (sempre marcado, não identificável)
  * Botão "Enviar Denúncia"
- POST /api/reports para criar denúncia
- Validação: não permitir múltiplas denúncias do mesmo usuário para o mesmo anúncio
- Confirmação ao usuário: "Denúncia enviada com sucesso"
- GET /api/reports/[vehicleId] para listar denúncias (apenas admin)
- Denúncias não identificam o denunciante
```

### Prompt 15: Sistema de Reputação e Reviews
```
Implemente sistema de reputação para revendedores/garages/concessionárias:
- Métrica de reputação no perfil público:
  * Estrelas (1-5) - média das avaliações
  * Número total de avaliações
  * Número total de vendas
  * Tempo médio de resposta
  * Percentual de recomendação
- Página de reviews/avaliações:
  * Lista de reviews recebidos
  * Cada review mostra: estrelas, comentário, data, veículo avaliado
  * Apenas reviews de compradores com link válido aparecem
- Cálculo automático de métrica:
  * Média de estrelas
  * Contagem de vendas
  * Contagem de avaliações
- GET /api/users/[id]/reputation para obter métrica
- GET /api/users/[id]/reviews para listar reviews
```

### Prompt 16: Sistema de Avaliação/Review
```
Implemente sistema de avaliação de compra:
- Link único gerado ao marcar anúncio como vendido
- Página /review/[token] (acesso via link único)
- Validação: apenas link válido pode acessar
- Formulário de avaliação:
  * Estrelas (1-5) - obrigatório
  * Comentário (textarea - opcional, máx 500 caracteres)
  * Recomendaria este vendedor? (sim/não)
  * Botão "Enviar Avaliação"
- Após submissão:
  * Review é salvo no perfil do vendedor
  * Métrica de reputação é atualizada
  * Link é invalidado (não pode ser usado novamente)
  * Comprador recebe confirmação
- POST /api/reviews para criar review
- Validação: cada link pode ser usado apenas uma vez
- GET /api/reviews/[token] para validar link
```

### Prompt 17: Marcar Anúncio como Vendido
```
Implemente funcionalidade de marcar anúncio como vendido:
- Botão "Marcar como Vendido" no dashboard do anunciante
- Modal com formulário:
  * Data da venda (date picker)
  * Preço final de venda (número)
  * Método de pagamento (dropdown)
  * Observações (textarea - opcional)
  * Botão "Confirmar"
- Após submissão:
  * Gera link único de avaliação/review
  * Link é exibido para o vendedor copiar/compartilhar
  * Anúncio é movido para status "Vendido"
  * Métrica de venda é registrada no perfil do vendedor
  * Email é enviado ao vendedor com o link de avaliação
- PUT /api/vehicles/[id]/mark-sold para marcar como vendido
- POST /api/vehicles/[id]/generate-review-link para gerar link
```

### Prompt 18: Painel Administrativo - Moderação de Anúncios
```
Implemente painel de moderação de anúncios:
- Página /admin/moderacao (protegida - apenas admin)
- Listagem de anúncios para moderação:
  * Filtros: status (Pendente, Aprovado, Rejeitado), data, tipo de denúncia
  * Cards com: foto, título, vendedor, data, número de denúncias
- Detalhes do anúncio:
  * Galeria completa de imagens
  * Todas as informações do veículo
  * Informações do vendedor
  * Seção de denúncias (se houver)
  * Ações: Aprovar, Rejeitar, Remover
- Funcionalidades:
  * PUT /api/admin/moderacao/[id]/approve para aprovar
  * PUT /api/admin/moderacao/[id]/reject para rejeitar (com motivo obrigatório)
  * DELETE /api/admin/moderacao/[id] para remover (com motivo obrigatório)
  * Notificação ao vendedor quando anúncio é rejeitado/removido
- Após aprovação: anúncio fica visível na plataforma
```

### Prompt 19: Painel Administrativo - Gestão de Denúncias
```
Implemente painel de gestão de denúncias:
- Página /admin/denuncias (protegida - apenas admin)
- Listagem de denúncias:
  * Filtros: status (Pendente, Em análise, Resolvido), tipo, data
  * Cards com: tipo, anúncio denunciado, data, status, número de denúncias similares
- Detalhes da denúncia:
  * Informações do anúncio denunciado
  * Descrição da denúncia
  * Data e hora
  * Histórico de denúncias similares
  * Ações: Marcar como Resolvido, Remover Anúncio
- Funcionalidades:
  * PUT /api/admin/reports/[id]/resolve para marcar como resolvido
  * DELETE /api/admin/reports/[id] para remover denúncia
  * Campo de observações para documentar ação tomada
  * GET /api/admin/reports para listar denúncias
```

### Prompt 20: Painel Administrativo - Gestão de Usuários
```
Implemente painel de gestão de usuários:
- Página /admin/usuarios (protegida - apenas admin)
- Listagem de usuários:
  * Filtros: tipo de perfil (Pessoa Física, Revendedora, Garage/Logista, Concessionária), status (Ativo, Inativo), data de cadastro, busca por nome/email
  * Tabela com colunas: Nome, Email, Tipo de perfil, Status, Data de cadastro, Ações
- Detalhes do usuário:
  * Informações pessoais: Nome, Email, Telefone, Endereço, Cidade, Estado
  * Tipo de Perfil (dropdown para alterar):
    - Pessoa Física
    - Revendedora
    - Garage/Logista (mesmo perfil, tipo separado)
    - Concessionária
  * Status (Ativo/Inativo)
  * Data de cadastro, Última atividade
  * Número de anúncios, Número de vendas
  * Métrica de reputação (se aplicável)
  * Ações: Salvar Alterações, Ativar/Desativar, Deletar Usuário, Visualizar Anúncios
- Funcionalidades:
  * GET /api/admin/users para listar usuários
  * GET /api/admin/users/[id] para detalhes do usuário
  * PUT /api/admin/users/[id] para atualizar tipo de perfil e dados
  * PUT /api/admin/users/[id]/status para ativar/desativar
  * DELETE /api/admin/users/[id] para deletar usuário
  * Admin pode corrigir erros de cadastro (suporte)
```

### Prompt 21: Painel Administrativo - Gestão de Planos
```
Implemente painel de gestão de planos e serviços de destaque:
- Página /admin/planos (protegida - apenas admin)
- Listagem de Planos de Renovação:
  * Tabela com colunas: Nome do plano (3, 6, 9 meses), Preço atual, Tipo de usuário, Número de contratos ativos, Ações
  * Detalhes do Plano: Nome, Duração, Preço (editável), Descrição, Número de contratos ativos, Histórico de preços
  * Ações: Editar Preço, Visualizar Contratos
- Listagem de Serviços de Destaque:
  * Tabela com colunas: Nome do serviço (Destaque, Ofertão), Preço atual, Duração (dias), Número de contratos ativos, Ações
  * Detalhes do Serviço: Nome, Preço (editável), Duração, Descrição, Número de contratos ativos, Histórico de preços
  * Ações: Editar Preço, Visualizar Contratos
- Funcionalidades:
  * GET /api/admin/plans para listar planos
  * GET /api/admin/plans/[id] para detalhes do plano
  * PUT /api/admin/plans/[id] para atualizar preço
  * GET /api/admin/highlights para listar serviços de destaque
  * GET /api/admin/highlights/[id] para detalhes do serviço
  * PUT /api/admin/highlights/[id] para atualizar preço
  * Histórico de alterações de preços
```

### Prompt 22: Página de Contato e Suporte
```
Implemente página de contato e suporte:
- Página /contato com formulário de contato
- Campos: Nome, Email, Assunto, Mensagem, Telefone (opcional)
- Validação com Zod
- POST /api/contact para enviar mensagem
- Integração com email (Resend ou similar)
- Confirmação de envio ao usuário
- Página /faq com perguntas frequentes
- Página /termos com termos de serviço
- Página /privacidade com política de privacidade
```

### Prompt 23: Sistema de Notificações
```
Implemente sistema de notificações:
- Notificações em tempo real (Socket.io ou similar)
- Tipos de notificação:
  * Novo interessado no anúncio
  * Anúncio foi moderado/aprovado/rejeitado
  * Pacote vencendo em 7 dias
  * Novo review recebido
  * Denúncia resolvida
- Página /notificacoes com histórico
- Badge de notificações não lidas
- Marcar como lida/deletar notificação
- GET /api/notifications para listar
- PUT /api/notifications/[id]/read para marcar como lida
```

### Prompt 24: Sistema de Chat/Mensagens
```
Implemente sistema de chat entre vendedor e comprador:
- Chat em tempo real (Socket.io ou similar)
- Página /mensagens com lista de conversas
- Detalhes da conversa com histórico
- Envio de mensagens com validação
- Notificação de nova mensagem
- Marcar conversa como lida
- Arquivar conversa
- POST /api/messages para enviar
- GET /api/messages/[conversationId] para listar
- Integração com WhatsApp (opcional)
```

### Prompt 25: Sistema de Favoritos
```
Implemente sistema de favoritos:
- Botão "Favoritar" em cards de anúncios
- Página /meus-favoritos com listagem
- Filtros e ordenação de favoritos
- Remover do favoritos
- Compartilhar favorito
- POST /api/favorites para adicionar
- DELETE /api/favorites/[id] para remover
- GET /api/favorites para listar
- Contador de favoritos no card
```

### Prompt 26: Dashboard do Usuário
```
Implemente dashboard completo do usuário:
- Página /dashboard com resumo
- Widgets:
  * Número de anúncios ativos
  * Número de visualizações (total e últimos 30 dias)
  * Número de interessados
  * Número de vendas
  * Receita total
  * Métrica de reputação (se aplicável)
- Links rápidos para ações comuns
- Gráficos de visualizações e interessados
- Últimos anúncios criados
- Notificações recentes
- GET /api/dashboard para dados
```

### Prompt 27: Relatórios e Estatísticas
```
Implemente sistema de relatórios:
- Página /dashboard/relatorios com filtros
- Relatórios disponíveis:
  * Anúncios por período
  * Visualizações por anúncio
  * Interessados por anúncio
  * Vendas por período
  * Receita por período
  * Performance de destaques
- Exportar relatório (PDF, CSV)
- Gráficos interativos (Recharts)
- GET /api/reports com filtros
```

### Prompt 28: Integração WhatsApp
```
Implemente integração com WhatsApp:
- Botão "Contatar via WhatsApp" nos anúncios
- Link direto para WhatsApp do vendedor
- Mensagem pré-preenchida com informações do veículo
- Webhook para receber mensagens (opcional)
- Integração com Twilio (opcional)
- Número de WhatsApp do vendedor no perfil
```

### Prompt 29: Sistema de Cupons/Promoções
```
Implemente sistema de cupons:
- Painel admin para criar cupons
- Tipos de cupom: Percentual, Valor fixo
- Validação: Data de expiração, Uso máximo, Uso por usuário
- Aplicar cupom no checkout
- Página /cupons com cupons disponíveis
- POST /api/coupons/validate para validar
- GET /api/coupons para listar disponíveis
- Histórico de cupons usados
```

### Prompt 30: Integração com FIPE
```
Implemente integração com tabela FIPE:
- API para consultar preço FIPE
- Sugestão de preço baseado em FIPE
- Comparação com preço do anúncio
- Atualização automática de preços FIPE
- GET /api/fipe/[brand]/[model]/[year]
- Cache de dados FIPE
- Painel admin para gerenciar FIPE
```

### Prompt 14: Página Inicial
```
Implemente página inicial:
- Seção: Busca Simples (header com fundo vermelho)
- Seção: Chamada para Ação (3 cards com ícones)
- Seção: Revendedoras Destaque (carrossel com logos)
- Seção: Ofertões do Brasil (carrossel de ofertões)
- Seção: Veículos em Destaque (GET /api/vehicles?featured=true)
- Footer com links importantes
- Responsividade mobile-first
```

---

## 5. Fluxo de Desenvolvimento Recomendado

1. **Setup inicial** (Prompt 1)
2. **Banco de dados** (Prompt 2)
3. **Autenticação** (Prompt 3)
4. **Cadastro de anúncios** (Prompts 4-6)
5. **Busca simples** (Prompt 7)
6. **Busca avançada** (Prompt 8)
7. **Detalhes do anúncio** (Prompt 9)
8. **Dashboard do anunciante** (Prompt 10)
9. **Sistema de contatos** (Prompt 11)
10. **Favoritos** (Prompt 12)

---

## 6. Requisitos Não-Funcionais

- **Performance**: Carregamento rápido de listagens e imagens
- **Responsividade**: Mobile-first design
- **SEO**: URLs amigáveis, meta tags
- **Segurança**: Validação de entrada, proteção contra XSS/CSRF
- **Escalabilidade**: Estrutura preparada para crescimento
- **Acessibilidade**: WCAG 2.1 AA

---

## 7. Próximas Etapas

Aguardando as próximas 5 imagens para refinamento do escopo e detalhes adicionais.
