import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "../BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import { useNavigate } from "react-router-dom";
import PlainButton from "@/components/shared/PlainButton";
import Select from "@/components/shared/Select";
import InputDate from "@/components/shared/InputDate";

const CreateTask = () => {
  const navigate = useNavigate();
  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate("/tasks")}></BackButton>
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title={`Cadastrar Demanda`}
        ></PageTitle>
        <Box
          title="Nova Demanda"
          subtitle="Preencha os dados do formulário e cadastre uma nova demanda."
          width="xl:w-[1000px] w-[600px] lg:w-[800px]"
          height="h-[630px]"
        >
          <InputTitle title="Cliente"></InputTitle>
          <div className="flex gap-6 flex-row w-full">
            <InputString
              title="NOME DO CLIENTE"
              width="w-2/3"
              isMandatory={true}
              placeholder="Pesquise o cliente..."
              height="h-[40px]"
            />
            <div className="mt-auto mb-3 w-1/3">
              <PlainButton
                title="NOVA EQUIPE"
                color="bg-customYellow"
                height="h-10"
                width="w-full"
              />
            </div>
          </div>
          <InputTitle title="Serviço"></InputTitle>
          <div className="flex gap-6 flex-row w-full">
            <Select
              options={[{ id: 1, name: "Banner" }]}
              title="TIPO DE SERVIÇO"
              isMandatory={true}
              onChange={(selectedOption) => console.log(selectedOption)}
              width="w-1/3"
              height="h-[40px]"
            />
            <div className="flex items-center w-1/3">
              <PlainButton
                title="NOVO SERVIÇO"
                color="bg-customYellow"
                height="h-10"
                width="w-full"
              />
            </div>
            <div className="mt-auto mb-3 w-1/3">
              <InputDate
                title="PRAZO"
                isMandatory={true}
                onChange={(date) => console.log(date)}
              />
            </div>
          </div>
          {/* <InputString
            title="DESCRIÇÃO DA DEMANDA"
            width="w-full rounded-[100px]"
            isMandatory={true}
            placeholder="Digite detalhes sobre a demanda..."
            height="h-[100px]"
            rounded="rounded-[20px]"
          /> */}
        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateTask;
