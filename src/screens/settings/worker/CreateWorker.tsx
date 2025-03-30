import { useNavigate } from "react-router-dom";
import BackButton from "@/components/UI/BackButton";
import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import PageTitle from "@/components/title/PageTitle";
import InputString from "@/components/UI/InputString";
import ColoredButton from "@/components/UI/ColoredButton";
import Select from "@/components/UI/Select";
import PlainButton from "@/components/UI/PlainButton";
import { useEffect, useState } from "react";
import { validateInput } from "@/utils/validateInput";
import InputDate from "@/components/UI/InputDate";
import getTeam from "@/api/teamRoutes";
import { TeamInterface } from "@/api/teamRoutes";
import Modal from "@/components/modal/Modal";
import IconHappy from "@/assets/images/famicons_happy.png";
import IconSad from "@/assets/images/famicons_sad.png";
import { createWorker } from "@/api/workerRoutes";

const CreateWorker = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useState<TeamInterface[]>([]);
 
  const [isModalSuccessVisible, setIsModalSucessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [isModalFailedVisible, setIsModalFailedVisible] = useState(false);
  const [isModalFailedDatesVisible, setIsModalFailedDatesVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    selectedTeam: 0, // sem seleção
    birthday: "",
    entryDate: "",
  });

  const [validInputs, setValidInputs] = useState<boolean[]>([
    true, // name
    true, // email
    true, // phone
    true, // birthday
    true, // entryDate
  ]);

  const handleSubmit = async () => {
    const validTexts = [...validInputs.slice(0, 3)]; // não inclui o quarto elemento (índice 3)

    // se algum campo de texto não for válido ou equipe não selecionada. indexOf retorna -1 se não encontrar false
    if (validTexts.indexOf(false) !== -1 || form.selectedTeam === 0) {
      setIsModalFailedVisible(true);
      return; // return impede que o outro modal apareça
    }

    if (validInputs[3] === false || validInputs[4] === false) {
      setIsModalFailedDatesVisible(true);
      return;
    }

    try {
      const response = await createWorker({
        first_name: form.name,
        //last_name: "",
        email: form.email,
        telefone: form.phone,
        data_aniversario: form.birthday ?? "",
        data_entrada: form.entryDate ?? "",
        role: "funcionario",
        id_equipe: form.selectedTeam,
      });

      if (
        // verificar documentação da API para saber se o status é 200 ou 201
        response?.status === 200 ||
        response?.success === true ||
        response?.status === 201
      ) {
        setIsModalSucessVisible(true);
      } else {
        setIsModalErrorVisible(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsModalErrorVisible(true);
    }
  };

  function handleNavigate(path: string) {
    navigate(path);
  }

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeam();
        if (response) {
          setTeam(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar equipes", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <>
      <Modal
        title="Sucesso!"
        description="A operação de cadastro do (a) colaborador (a) foi concluída."
        onClick1={() => setIsModalSucessVisible(false)}
        isModalVisible={isModalSuccessVisible}
        buttonTitle1="OK"
        iconImage={IconHappy}
      ></Modal>
      <Modal
        title="Erro!"
        description="A operação de cadastro do (a) colaborador (a) NÃO foi concluída."
        onClick1={() => setIsModalErrorVisible(false)}
        isModalVisible={isModalErrorVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>
      <Modal
        title="Reveja os campos obrigatórios!"
        description="Preencha todos os campos obrigatórios (*) corretamente."
        onClick1={() => setIsModalFailedVisible(false)}
        isModalVisible={isModalFailedVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>
      <Modal
        title="Reveja os campos de data!"
        description="Preencha os campos de data com datas válidas."
        onClick1={() => setIsModalFailedDatesVisible(false)}
        isModalVisible={isModalFailedDatesVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>
      <BaseScreen>
        <BackButton
          onClick={() => handleNavigate("/settings/configure-worker")}
        ></BackButton>
        <PageTitle marginTop="mt-4" title="Cadastrar Colaborador"></PageTitle>

        <Box
          title="Cadastrar"
          subtitle="Cadastre um colaborador aqui."
          width="xl:w-[1000px] w-[600px] lg:w-[800px]"
          height="h-[630px]"
        >
          <InputTitle title="Funcionário"></InputTitle>
          <InputString
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, name: e.target.value });
              const newValidInputs = [...validInputs]; // cópia do array para não bugar renderização
              newValidInputs[0] =
                validateInput(e.target.value, "text") ?? false;
              setValidInputs(newValidInputs);
            }}
            title="NOME DO COLABORADOR"
            width="w-[100%]"
            height="h-8"
            placeholder="Digite o nome..."
            isMandatory={true}
            stringType="text"
            borderColor={
              validInputs[0] ? "border-customYellow" : "border-red-500"
            }
          ></InputString>

          <div className="flex gap-4 flex-row justify-normal items-center w-[100%]">
            <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setForm({ ...form, selectedTeam: parseInt(e.target.value) });
              }}
              options={team.map((t) => {
                return {
                  id: t.id_equipe,
                  name: t.nome_equipe,
                };
              })}
              title="EQUIPE"
              isMandatory={true}
              width="w-[70%]"
            ></Select>
            <PlainButton
              title="NOVA EQUIPE"
              color="bg-customYellow"
              width="w-[30%]"
            ></PlainButton>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputString
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                const newValidInputs = [...validInputs];
                newValidInputs[1] =
                  validateInput(e.target.value, "email") ?? false;
                setValidInputs(newValidInputs);
              }}
              title="E-MAIL"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={true}
              borderColor={
                validInputs[1] ? "border-customYellow" : "border-red-500"
              }
              stringType="email"
            ></InputString>
            <InputString
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                const newValidInputs = [...validInputs];
                newValidInputs[2] =
                  validateInput(e.target.value, "phone") ?? false;
                setValidInputs(newValidInputs);
              }}
              title="TELEFONE"
              width="w-[50%]"
              height="h-8"
              placeholder="(__) ____-____"
              isMandatory={true}
              mask="(99) 9999-9999"
              borderColor={
                validInputs[2] ? "border-customYellow" : "border-red-500"
              }
            ></InputString>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputDate
              onChange={(value: string) => {
                setForm({ ...form, birthday: value });
                const newValidInputs = [...validInputs];
                newValidInputs[3] = validateInput(value, "birthdayDate") ?? false;
                setValidInputs(newValidInputs);
              }}
              title="DATA DE NASCIMENTO"
              isMandatory={false}
              width="w-[50%]"
              borderColor={validInputs[3] ? "#F6BC0A" : "#EF4444"}
            ></InputDate>
            <InputDate
              onChange={(value: string) => {
                setForm({ ...form, entryDate: value });
                const newValidInputs = [...validInputs];
                newValidInputs[4] = validateInput(value, "entryDate") ?? false;
                setValidInputs(newValidInputs);
              }}
              title="DATA DE ENTRADA"
              isMandatory={false}
              width="w-[50%]"
              borderColor={validInputs[4] ? "#F6BC0A" : "#EF4444"}
            ></InputDate>
          </div>

          <div className="w-[100%] flex justify-center mt-6">
            <ColoredButton
              onClick={handleSubmit}
              title="SALVAR"
              color="customYellow"
              width="w-[180px]"
              justify="justify-center"
              icon="fa-solid fa-floppy-disk"
            ></ColoredButton>
          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;
