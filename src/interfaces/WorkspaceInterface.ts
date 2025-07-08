
export interface DadosEssenciaisInterface {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  nome_equipe: string;
  nome_setor: string;
}

export interface DemandaInterface {
  id_demanda: number;
  id_pessoa: number;
  nome_servico: string;
  status: string;
}

export interface WorkspaceResponse {
  dadosEssenciais: DadosEssenciaisInterface;
  demandas: DemandaInterface[]; 
  pontuacao_pessoa_semanal: number;
  pontuacao_pessoa_mensal: number;
}
