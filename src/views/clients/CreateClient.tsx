import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";

const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousRoute = location.state?.previousRoute;

  return (
    <>
      <BaseScreen>
        <BackButton onClick={() => navigate(previousRoute)} />
        <PageTitle
          // icon client
          icon="fa-solid fa-user-tie"
          marginTop="mt-4"
          title={`Cadastrar Cliente`}
        ></PageTitle>
        <Motion>
          <Box
            title="Novo Cliente"
            subtitle="Preencha os dados do formulário e cadastre um novo cliente."
            width="xl:w-[1000px] w-[600px] lg:w-[800px]"
            height="h-fit"
          >
            <InputTitle title="Cliente"></InputTitle>
            {/* <div className="flex gap-6 flex-row w-full"> */}
            {/* <InputString
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
          </div> */}
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateClient;
