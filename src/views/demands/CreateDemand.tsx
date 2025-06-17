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
import { Motion } from "@/components/animation/Motion";

const CreateDemand = () => {
  const navigate = useNavigate();
  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate("/demandas")}></BackButton>
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title={`Cadastrar Demanda`}
        ></PageTitle>
        <Motion>
          <Box
            title="Nova Demanda"
            subtitle="Preencha os dados do formulário e cadastre uma nova demanda."
            width="xl:w-[1000px] w-[600px] lg:w-[800px]"
            height="h-fit"
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
            </div>
            <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  // navigate("/reports");
                }}
                title="SALVAR DEMANDA"
                width="w-[40%]"
                icon={"fa-solid fa-floppy-disk"}
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateDemand;
