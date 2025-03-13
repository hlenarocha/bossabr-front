import PageTitle from "../../components/title/PageTitle";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import ColoredButton from "../../components/UI/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableItem from "../../components/table/TableItem";
import { useEffect, useState } from "react";
import { readFuncionario } from "../../api/funcionarioRoutes";

const ConfigureWorker = () => {
  interface Funcionario {
    first_name: string;
    // equipe: string;
    // setor: string;
  }

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await readFuncionario();
        if (response) {
          setFuncionarios(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    };
    fetchFuncionarios();
  }, []);

  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => handleNavigate("/settings")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() =>
              handleNavigate("/settings/configure-worker/create-worker")
            }
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR COLABORADOR"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <PageTitle title="Configurar Colaboradores"></PageTitle>
        <Box
          width="w-[1070px]"
          height="h-[640px]"
          title="Lista de Colaboradores"
          subtitle="Visualização da lista de colaboradores para configuração."
        >
          <div className="h-[80%] overflow-y-auto">
          {funcionarios.map((funcionario, index) => (
          <TableItem
            key={index}
            itemWidth="w-full "
            itemHeight="h-16"
            columns={[
              {
                width: "w-[33%]",
                content: funcionario.first_name,
              },
              { width: "w-[33%]", content: "Equipe" },
              { width: "w-[33%]", content: "Setor" },
            ]}
            icon="fa-eye"
          ></TableItem>
          
          ))}
          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default ConfigureWorker;
