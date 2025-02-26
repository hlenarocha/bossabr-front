import { useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import InputTitle from "../../components/title/InputTitle";
import PageTitle from "../../components/title/PageTitle";
import InputText from "../../components/UI/InputText";
import ColoredButton from "../../components/UI/ColoredButton";

const CreateWorker = () => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <>
      <BaseScreen>
        <BackButton
          onClick={() => handleNavigate("/settings/configure-worker")}
        ></BackButton>
        <PageTitle title="Cadastrar Colaborador"></PageTitle>

        <Box
          title="Cadastrar"
          subtitle="Cadastre um colaborador aqui."
          width="w-[1030px]"
          height="h-[630px]"
        >
          <InputTitle title="Funcionário"></InputTitle>
          <InputText
            title="NOME DO COLABORADOR"
            width="w-[100%]"
            height="h-8"
            placeholder="Digite o nome..."
            isMandatory={true}
          ></InputText>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputText
              title="E-MAIL"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={true}
            ></InputText>
            <InputText
              title="TELEFONE"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o telefone..."
              isMandatory={true}
            ></InputText>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputText
              title="DATA DE ANIVERSÁRIO"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={false}
            ></InputText>
            <InputText
              title="DATA DE ENTRADA"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o telefone..."
              isMandatory={false}
            ></InputText>
          </div>

          <div className="w-[100%] flex justify-center mt-4">
          <ColoredButton title="SALVAR" color="customYellow" width="w-[180px]" justify="justify-center" icon="fa-solid fa-floppy-disk" ></ColoredButton>


          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;
