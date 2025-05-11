import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "../BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate("/tasks")}></BackButton>
        <PageTitle marginTop="mt-4" title="Adicionar Demanda"></PageTitle>
        <Box
          title="Cadastrar"
          subtitle="Cadastre uma nova demanda aqui."
          width="xl:w-[1000px] w-[600px] lg:w-[800px]"
          height="h-[630px]"
        >
          <InputTitle title="Cliente"></InputTitle>
          <InputString
          
            title="NOME DO CLIENTE"
            width="w-full"
            isMandatory={true}
            placeholder="Pesquise o cliente..."

            height="h-[40px]"></InputString>



        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateTask;
