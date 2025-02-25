import PageTitle from "../../components/title/PageTitle";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import ColoredButton from "../../components/UI/ColoredButton";
import { useNavigate } from "react-router-dom";

const ConfigureWorker = () => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

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
          <div>TESTE</div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default ConfigureWorker;
