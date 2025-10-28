export interface HelpContent {
  title: string;
  content: string[]; // Array de parágrafos
}

export const helpContentMap: Record<string, HelpContent> = {
  '/area-trabalho': {
    title: 'Ajuda: Área de Trabalho',
    content: [
      'Esta é a sua área de trabalho principal. Nela, você encontra um resumo das suas informações, pontuações e o progresso das suas demandas pessoais.',
      'A seção "Progresso das Demandas" é um quadro Kanban que mostra suas tarefas. Utilize os filtros (Hoje, 7 Dias, etc.) para visualizar as demandas com prazo no período selecionado.',
      'A seção "Atividades Recentes do Setor" exibe as últimas ações realizadas pelos membros do seu setor, mantendo você atualizado sobre o trabalho da equipe.',
      'Para registrar uma nova atividade em uma demanda, clique no ícone de ação no card correspondente.',
      'Regras de Preenchimento (Atividades)',
      '● Demanda* → Vincule a uma demanda existente. (Obrigatório)',
      '● Pessoa Responsável* → Informe o colaborador responsável. (Obrigatório)',
      '● Status* → Status atual da atividade. (Obrigatório)',
      '● Data de Início* → Data e hora válidas. Não pode ser registrada com data anterior à atual.',
      '● Data de Fim → Data e hora válidas posteriores à de início.',
      '● Texto → Campo opcional para roteirização/redação. Máx. 1000 caracteres. (SOMENTE PARA SOCIAL MEDIA)',
      '● Link do Drive → Informe um URL válido.',
      '● Observações → Campo opcional. Máx. 500 caracteres',
    ],
  },
  '/demandas': {
    title: 'Ajuda: Demandas e Fila de Aprovação',
    content: [
      'Esta tela centraliza a gestão de demandas. O que você vê aqui depende do seu cargo.',
      'Para Colaboradores: Você verá o seu quadro Kanban pessoal e um calendário com os prazos. Use os filtros e o calendário para organizar e visualizar suas tarefas.',
      'Regras de Preenchimento (Atividades)',
      '● Demanda* → Vincule a uma demanda existente. (Obrigatório)',
      '● Pessoa Responsável* → Informe o colaborador responsável. (Obrigatório)',
      '● Status* → Status atual da atividade. (Obrigatório)',
      '● Data de Início* → Data e hora válidas. Não pode ser registrada com data anterior à atual.',
      '● Data de Fim → Data e hora válidas posteriores à de início.',
      '● Texto → Campo opcional para roteirização/redação. Máx. 1000 caracteres. (SOMENTE PARA SOCIAL MEDIA)',
      '● Link do Drive → Informe um URL válido.',
      '● Observações → Campo opcional. Máx. 500 caracteres',
      'Para Atendentes e Gerentes: Você verá a "Fila de Aprovação", que lista todas as atividades enviadas por colaboradores para sua revisão. Utilize os botões para aprovar ou reprovar cada atividade.',
    ],
  },
  '/dashboard': {
    title: 'Ajuda: Dashboard Geral',
    content: [
      'O Dashboard oferece uma visão macro da performance da agência.',
      'Use o seletor no topo da página para alternar entre a visão "Geral" e as visões específicas de cada setor (Design, Social Media, etc.).',
      'Os gráficos e cartões mostram métricas importantes como o progresso das demandas, peças produzidas, pontuação dos colaboradores e o sensor de burnout, que ajuda a monitorar a carga de trabalho da equipe.'
    ],
  },
  '/clientes': {
    title: 'Ajuda: Lista de Clientes',
    content: [
      'Esta tela exibe a lista de todos os clientes cadastrados no sistema.',
      'Você pode usar a barra de pesquisa no canto superior direito para encontrar um cliente específico pelo nome da empresa.',
      'Clique no botão "Ver Cliente" em cada linha da tabela para acessar a página de detalhes, onde você pode visualizar todas as informações e demandas associadas àquele cliente.',
      'O botão "Adicionar Cliente" permite cadastrar um novo cliente no sistema.'
    ]
  },
  '/configuracoes': {
    title: 'Ajuda: Configurações Gerais',
    content: [
      'A área de Configurações é o painel de controle administrativo do sistema, acessível apenas para Gerentes e Administradores.',
      'Aqui você pode gerenciar todas as entidades principais do sistema, como Colaboradores, Equipes, Clientes, Tipos de Serviço e mais.',
      'Cada cartão representa uma categoria de gerenciamento. Clique no botão "Configurar" correspondente para ser levado à tela de gerenciamento daquela categoria, onde você poderá criar, editar e excluir registros.'
    ]
  },
  '/configuracoes/colaboradores': {
    title: 'Ajuda: Gerenciar Colaboradores',
    content: [
      'Nesta tela, você pode visualizar, buscar, editar ou desativar os colaboradores cadastrados.',
      'Use a barra de busca para encontrar um colaborador pelo nome. A paginação na parte inferior ajuda a navegar por listas longas.',
      'Clique no ícone de lápis para editar as informações de um colaborador ou no ícone de lixeira para desativá-lo (soft delete).'
    ]
  },
  '/configuracoes/clientes': {
    title: 'Ajuda: Gerenciar Clientes',
    content: [
      'Esta tela funciona de forma similar à de "Gerenciar Colaboradores", mas é focada nos clientes.',
      'Você pode buscar, editar ou desativar clientes existentes.',
      'O botão "Adicionar Cliente" no topo da página permite cadastrar uma nova empresa no sistema.'
    ]
  },
  '/configuracoes/negocios/novo': {
    title: 'Ajuda: Criar Novo Setor de Negócio',
    content: [
      'Nesta tela, você pode criar um novo setor de negócio.',
      'Regras de Preenchimento',
      '● Nome do Setor de Negócio* → Texto livre, máx. 150 caracteres',
      'Após preencher todas as informações, clique em "Cadastrar Setor de Negócio" para registrar o novo negócio no sistema.'
    ]
  },
  '/configuracoes/servicos/novo': {
    title: 'Ajuda: Criar Novo Tipo de Serviço',
    content: [
      'Nesta tela, você pode criar um novo tipo de serviço oferecido pela agência.',
      'Regras de Preenchimento',
      '● Setor* → Selecione o setor ao qual o serviço pertence.',
      '● Nome do Serviço* → Texto livre, máx. 200 caracteres.',
      '● Pontuação* → Número decimal positivo (ex: 3.50). Define o peso do serviço para cálculo de produtividade',
      'Após preencher todas as informações, clique em "Cadastrar Tipo de Serviço" para registrar o novo serviço no sistema.'
    ]
  },
  '/configuracoes/colaboradores/novo': {
    title: 'Ajuda: Adicionar Novo Colaborador',
    content: [
      'Nesta tela, você pode cadastrar um novo colaborador no sistema.',
      'Regras de Preenchimento',
      '● Cargo* → Selecione um cargo cadastrado.',
      '● Nome* → Primeiro nome (preenchido automaticamente via Google OAuth).',
      '● Sobrenome → Opcional.',
      '● E-mail* → Formato válido (preenchido via Google OAuth).',
      '● CNPJ → Obrigatório somente para PJ.',
      '● Telefone → Formato (XX) XXXXX-XXXX.',
      '● Data de Entrada → Data válida do início do contrato.',
      '● Data de Nascimento → Data anterior à atual. Deve garantir idade entre 14 e 120 anos.',
      'Após preencher todas as informações, clique em "Cadastrar Colaborador" para registrar o novo usuário no sistema.'
    ]
  },
  '/configuracoes/equipes/novo': {
    title: 'Ajuda: Criar Nova Equipe',
    content: [
      'Nesta tela, você pode criar uma nova equipe de trabalho.',
      'Regras de Preenchimento',
      '● Nome da Equipe* → Texto livre, máx. 100 caracteres.',
      '● Setor* → Selecione o setor ao qual a equipe pertence.',
      '●  Responsável* → Selecione um colaborador para ser o responsável pela equipe.',
      'Após preencher todas as informações, clique em "Cadastrar Equipe" para registrar a nova equipe no sistema.'
    ]
  },
  '/demandas/nova': {
    title: 'Ajuda: Criar Nova Demanda',
    content: [
      'Nesta tela, você pode criar uma nova demanda para um cliente.',
      'Regras de Preenchimento',
      '● Tipo de Serviço* → Escolha um tipo cadastrado.',
      '● Pessoa Responsável* → Selecione o colaborador.',
      '● Cliente* → Escolha o cliente solicitante.',
      '● Status → (opcional) Situação atual da demanda.',
      '● Quantidade* → Apenas números inteiros positivos.',
      '● Prazo* → Data futura (posterior à data atual).',
      '● Descrição → Texto livre (máx. 1000 caracteres).',
      '● Link do Drive → URL válida (https://...)',
      'Após preencher todas as informações, clique em "Cadastrar Demanda" para registrar a nova demanda no sistema.'
    ]
  },

};