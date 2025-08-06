export default interface UserInterface {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  url_avatar: string;
  nome_equipe?: string;
  nome_setor?: string;
}