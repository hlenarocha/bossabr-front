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
import TextArea from "@/components/shared/TextArea";
import InputQuantity from "@/components/shared/InputQuantity";
import ColoredButton from "@/components/shared/ColoredButton";

// EDITAR ESSA BASE PARA O DISPLAY DE DETALHES DA DEMANDA
const DisplayTask = () => {
  const navigate = useNavigate();
  return (
    <>
      <BaseScreen>
        <div className="flex flex-row justify-between">
          <BackButton onClick={() => navigate("/tasks")}></BackButton>
          <ColoredButton
            onClick={() => {
              // navigate("/reports");
            }}
            title="INICIAR DEMANDA"
            width="w-[30%]"
            // icon start
            icon="fa-solid fa-play"
            color="customYellow"
            justify="justify-center"
          ></ColoredButton>
        </div>
        <PageTitle
          // icon bolinha verde
          marginTop="mt-4"
          title={`Demanda Logotipo do Cliente Lorem Ipsum`}
        ></PageTitle>
        <Box
          title="Detalhes da Demanda"
          subtitle="Preencha os dados do formulário e cadastre uma nova demanda."
          width="xl:w-[1000px] w-[600px] lg:w-[800px]"
          height="h-fit"
        >
          <div></div>
          {/* <InputTitle title="Cliente"></InputTitle>
          <div className="flex gap-6 flex-row w-full">
            <InputString
              title="NOME DO CLIENTE"
              isReadOnly={true}
              width="w-2/3"
              isMandatory={true}
              placeholder="Lorem Ipsum"
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
          <div className="mt-6">
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
                  isMandatory={false}
                  onChange={(date) => console.log(date)}
                />
              </div>
            </div>
            <TextArea
              title="DESCRIÇÃO DO SERVIÇO"
              placeholder="Digite detalhes sobre o serviço..."
              isMandatory={true}
              width="w-full"
              height="h-[100px]"
              rounded="rounded-[20px]"
            />
            <div className="flex flex-row gap-6">
              <InputString
                title="LINK DO DRIVE"
                width="w-2/3"
                isMandatory={true}
                placeholder="Insira o link para o Drive do serviço..."
                height="h-[40px]"
              />
              <InputQuantity
                title="QUANTIDADE"
                height="h-[40px]"
                width="w-1/3"
                isMandatory={true}
                value={1}
                min={1}
                max={100}
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <InputTitle title="Atribuição"></InputTitle>
            <Select
              options={[{ id: 1, name: "Design" }]}
              title="SETOR RESPONSÁVEL"
              isMandatory={true}
              onChange={(selectedOption) => console.log(selectedOption)}
              width="w-1/3"
              height="h-[40px]"
            />
          </div> */}
        </Box>
      </BaseScreen>
    </>
  );
};

export default DisplayTask;
