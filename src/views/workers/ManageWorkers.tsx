import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableItem from "@/components/table/TableItem";
import { useEffect, useState } from "react";
import { readWorker } from "@/api/workerRoutes";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SearchBar from "@/components/shared/SearchBar";

const ManageWorkers = () => {
  interface Funcionario {
    first_name: string;
    // equipe: string;
    // setor: string;
  }

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  function handleNavigate(path: string) {
    navigate(path);
  }

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        setIsLoading(true);
        const response = await readWorker();
        if (response) {
          setFuncionarios(response.data);
          setTimeout(() => setIsLoading(false), 1500);
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
          <BackButton onClick={() => handleNavigate("/configuracoes")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() =>
              handleNavigate("/configuracoes/colaboradores/novo")
            }
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR COLABORADOR"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Colaboradores"
          ></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um colaborador aqui..."
          ></SearchBar>
        </div>

        <Box
          width="w-full max-w-[100%] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]"
          height="h-[640px]"
          title="Lista de Colaboradores"
          subtitle="Visualização da lista de colaboradores para configuração."
        >
          <TableHeader
            columns={[
              { width: "w-[33%]", content: "NOME" },
              { width: "w-[33%]", content: "EQUIPE" },
              { width: "w-[33%]", content: "SETOR" },
            ]}
          ></TableHeader>
          <>
            <div className="h-[80%] overflow-y-auto">
              {loading ? (
                <LoadingSpinner></LoadingSpinner>
              ) : (
                funcionarios.map((funcionario, index) => (
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
                ))
              )}
            </div>
          </>
        </Box>
      </BaseScreen>
    </>
  );
};

export default ManageWorkers;
