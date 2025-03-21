import { useNavigate } from "react-router-dom";
import BackButton from "../../components/UI/BackButton";
import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import InputTitle from "../../components/title/InputTitle";
import PageTitle from "../../components/title/PageTitle";
import InputString from "../../components/UI/InputString";
import ColoredButton from "../../components/UI/ColoredButton";
import Select from "../../components/UI/Select";
import PlainButton from "../../components/UI/PlainButton";
import { useEffect, useState } from "react";
import { validateInput } from "../../utils/validateInput";
import InputDate from "../../components/UI/InputDate";
import getEquipes from "../../api/equipeRoutes";
import { EquipeInterface } from "../../api/equipeRoutes";
import { createFuncionario } from "../../api/funcionarioRoutes";
import Modal from "../../components/modal/Modal";
import IconHappy from "../../assets/images/famicons_happy.png";
import IconSad from "../../assets/images/famicons_sad.png";

const CreateWorker = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [equipes, setEquipes] = useState<EquipeInterface[]>([]);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState<string>();
  const [entryDate, setEntryDate] = useState<string>();
  const [selectedEquipe, setSelectedEquipe] = useState<number>(0);
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);
  const [isEntryDateValid, setIsEntryDateValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isModalSuccessVisible, setIsModalSucessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [isModalFailedVisible, setIsModalFailedVisible] = useState(false);
  const [isModalFailedDatesVisible, setIsModalFailedDatesVisible] = useState(false);


  const handleSubmit = async () => {
    if (!isNameValid || !isEmailValid || !isPhoneValid || !selectedEquipe) {
      setIsModalFailedVisible(true);
      return;
    }

    if (birthday && !isBirthdayValid || entryDate && !isEntryDateValid) {
      setIsModalFailedDatesVisible(true);
      return;
    }

  
    try {
      const response = await createFuncionario({
        first_name: name,
        //last_name: "",
        email: email,
        telefone: phone || "",
        data_aniversario: isBirthdayValid ? birthday ?? "" : "",
        data_entrada: isEntryDateValid ? entryDate ?? "" : "",
        role: "funcionario",
        id_equipe: selectedEquipe,
      });

      if (response?.status === 200 || response?.success === true || response?.status === 201) {
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
    const fetchEquipes = async () => {
      try {
        const response = await getEquipes();
        if (response) {
          setEquipes(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar equipes", error);
      }
    };

    fetchEquipes();
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
        <PageTitle title="Cadastrar Colaborador"></PageTitle>

        <Box
          title="Cadastrar"
          subtitle="Cadastre um colaborador aqui."
          width="w-[1030px]"
          height="h-[630px]"
        >
          <InputTitle title="Funcionário"></InputTitle>
          <InputString
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              setIsNameValid(validateInput(e.target.value, "text") ?? false);
            }}
            title="NOME DO COLABORADOR"
            width="w-[100%]"
            height="h-8"
            placeholder="Digite o nome..."
            isMandatory={true}
            stringType="text"
            borderColor={isNameValid ? "border-customYellow" : "border-red-500"}
          ></InputString>

          <div className="flex gap-4 flex-row justify-normal items-center w-[100%]">
            <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedEquipe(Number(e.target.value));
              }}
              options={equipes.map((equipe) => {
                return {
                  id: equipe.id_equipe,
                  name: equipe.nome_equipe,
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
                setEmail(e.target.value);
                setIsEmailValid(
                  validateInput(e.target.value, "email") ?? false
                );
              }}
              title="E-MAIL"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={true}
              borderColor={
                isEmailValid ? "border-customYellow" : "border-red-500"
              }
              stringType="email"
            ></InputString>
            <InputString
              onChange={(e) => {
                setPhone(e.target.value);
                setIsPhoneValid(
                  validateInput(e.target.value, "phone") ?? false
                );
              }}
              title="TELEFONE"
              width="w-[50%]"
              height="h-8"
              placeholder="(__) ____-____"
              isMandatory={true}
              mask="(99) 9999-9999"
              borderColor={
                isPhoneValid ? "border-customYellow" : "border-red-500"
              }
            ></InputString>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputDate
              onChange={(value: string) => {
                setBirthday(value);
                setIsBirthdayValid(
                  validateInput(value, "birthdayDate") ?? false
                );
              }}
              title="DATA DE NASCIMENTO"
              isMandatory={false}
              width="w-[50%]"
              borderColor={isBirthdayValid ? "#F6BC0A" : "#EF4444"}
            ></InputDate>
            <InputDate
              onChange={(value: string) => {
                setEntryDate(value);
                setIsEntryDateValid(validateInput(value, "entryDate") ?? false);
              }}
              title="DATA DE ENTRADA"
              isMandatory={false}
              width="w-[50%]"
              borderColor={isEntryDateValid ? "#F6BC0A" : "#EF4444"}
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
