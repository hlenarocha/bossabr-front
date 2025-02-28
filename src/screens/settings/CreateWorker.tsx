import { useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import InputTitle from "../../components/title/InputTitle";
import PageTitle from "../../components/title/PageTitle";
import InputString from "../../components/UI/InputString";
import ColoredButton from "../../components/UI/ColoredButton";
import Select from "../../components/UI/Select";

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
          <InputString
            title="NOME DO COLABORADOR"
            width="w-[100%]"
            height="h-8"
            placeholder="Digite o nome..."
            isMandatory={true}
            stringType="text"
            
          ></InputString>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputString
              title="E-MAIL"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={true}
              stringType="email"
            ></InputString>
            <InputString
              title="TELEFONE"
              width="w-[50%]"
              height="h-8"
              placeholder="(__) ____-____"
              isMandatory={true}
              mask="(99) 9999-9999"
            ></InputString>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputString
              title="DATA DE ANIVERSÁRIO"
              width="w-[50%]"
              height="h-8"
              placeholder="__/__/____"
              isMandatory={false}
              mask="99/99/9999"
            ></InputString>
            <InputString
              title="DATA DE ENTRADA"
              width="w-[50%]"
              height="h-8"
              placeholder="__/__/____"
              isMandatory={false}
              mask="99/99/9999"
            ></InputString>
          </div>

          <Select title="EQUIPE" isMandatory={true} ></Select>
          

          <div className="w-[100%] flex justify-center mt-8">
          <ColoredButton title="SALVAR" color="customYellow" width="w-[180px]" justify="justify-center" icon="fa-solid fa-floppy-disk" ></ColoredButton>


          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;
