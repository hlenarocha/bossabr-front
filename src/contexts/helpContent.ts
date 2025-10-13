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
      'Para registrar uma nova atividade em uma demanda, clique no ícone de ação no card correspondente.'
    ],
  },
  '/demandas': {
    title: 'Ajuda: Demandas e Fila de Aprovação',
    content: [
      'Esta tela centraliza a gestão de demandas. O que você vê aqui depende do seu cargo.',
      'Para Colaboradores: Você verá o seu quadro Kanban pessoal e um calendário com os prazos. Use os filtros e o calendário para organizar e visualizar suas tarefas.',
      'Para Atendentes e Gerentes: Você verá a "Fila de Aprovação", que lista todas as atividades enviadas por colaboradores para sua revisão. Utilize os botões para aprovar ou reprovar cada atividade.',
      'Pressione F1 a qualquer momento para ver estas dicas.'
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
  }
};