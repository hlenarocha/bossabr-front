import { useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import InputTitle from "../../components/title/InputTitle";
import PageTitle from "../../components/title/PageTitle";
import InputText from "../../components/UI/InputText";


const CreateWorker = () => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return(
    <>
    <BaseScreen>
    <BackButton onClick={() => handleNavigate("/settings/configure-worker")}>
    </BackButton>
    <PageTitle title="Cadastrar Colaborador"></PageTitle>

    <Box title="Cadastrar" subtitle="Cadastre um colaborador aqui." width="w-[1030px]" height="h-[630px]">
      <InputTitle title="Funcionário"></InputTitle>
      <InputText title="NOME DO COLABORADOR" width="w-[100%]" height="h-8" placeholder="Digite o nome..." isMandatory={true}></InputText>

    </Box>


    </BaseScreen>
    </>
  );

}

export default CreateWorker;