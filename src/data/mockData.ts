
// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

// Mock report data
export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  embedUrl: string;
  createdAt: string;
  createdBy: string;
  isFeatured: boolean;
  isTipOfDay: boolean;
  tags: string[];
  thumbnailUrl: string;
}

// Mock categories
export const categories = [
  { id: 'finance', name: 'Finanças' },
  { id: 'sales', name: 'Vendas' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'operations', name: 'Operações' },
  { id: 'hr', name: 'Recursos Humanos' },
  { id: 'it', name: 'Tecnologia' },
];

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
  },
];

// Mock reports
export const reports: Report[] = [
  {
    id: '1',
    title: 'Análise Financeira Q1 2025',
    description: 'Relatório detalhado sobre o desempenho financeiro do primeiro trimestre de 2025.',
    category: 'finance',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample1',
    createdAt: '2025-04-01',
    createdBy: '1',
    isFeatured: true,
    isTipOfDay: false,
    tags: ['financeiro', 'trimestral', 'receita'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Financeiro',
  },
  {
    id: '2',
    title: 'Dashboard de Vendas - Março 2025',
    description: 'Visão geral das vendas realizadas em março de 2025, incluindo metas, realizações e comparativo.',
    category: 'sales',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample2',
    createdAt: '2025-04-05',
    createdBy: '1',
    isFeatured: false,
    isTipOfDay: true,
    tags: ['vendas', 'mensal', 'metas'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Vendas',
  },
  {
    id: '3',
    title: 'Campanha Marketing Digital - Q1 2025',
    description: 'Resultados das campanhas de marketing digital realizadas no primeiro trimestre de 2025.',
    category: 'marketing',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample3',
    createdAt: '2025-04-10',
    createdBy: '1',
    isFeatured: true,
    isTipOfDay: false,
    tags: ['marketing', 'digital', 'campanhas'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Marketing',
  },
  {
    id: '4',
    title: 'Análise de Produtividade - Operações',
    description: 'Indicadores de produtividade do setor de operações nos últimos 6 meses.',
    category: 'operations',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample4',
    createdAt: '2025-04-12',
    createdBy: '1',
    isFeatured: false,
    isTipOfDay: false,
    tags: ['operações', 'produtividade', 'indicadores'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Operações',
  },
  {
    id: '5',
    title: 'Turnover e Contratações - RH',
    description: 'Relatório de movimentação de pessoal, incluindo contratações, desligamentos e turnover.',
    category: 'hr',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample5',
    createdAt: '2025-04-15',
    createdBy: '1',
    isFeatured: false,
    isTipOfDay: false,
    tags: ['rh', 'contratações', 'turnover'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=RH',
  },
  {
    id: '6',
    title: 'Monitoramento de Infraestrutura - TI',
    description: 'Dashboard de monitoramento da infraestrutura de TI, incluindo servidores, rede e aplicações.',
    category: 'it',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=sample6',
    createdAt: '2025-04-16',
    createdBy: '1',
    isFeatured: false,
    isTipOfDay: false,
    tags: ['ti', 'infraestrutura', 'monitoramento'],
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=TI',
  },
];

// User favorites mock data
export const userFavorites = {
  '2': ['1', '3'] // User ID 2 has favorited reports 1 and 3
};

// Mock statistics for admin dashboard
export const dashboardStats = {
  totalUsers: 2,
  totalReports: 6,
  recentAccesses: 24,
  mostViewedReport: '1',
  mostViewedCategory: 'finance'
};
