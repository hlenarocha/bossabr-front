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
import { useState } from "react";
import { validateInput } from "../../utils/validateInput";

const CreateWorker = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  console.log(isNameValid);

  // console.log(name);
  // console.log(email);
  // console.log(phone);
  console.log(name.length);

  const handleSubmit = () => {
    if (name.length === 0 || email.length === 0) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!isNameValid || !isEmailValid && email.length > 0) {
      alert("Campos inválidos!");
      return;
    }

  }


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
            <Select title="EQUIPE" isMandatory={true}
            width="w-[70%]"
            ></Select>
            <PlainButton
              title="NOVA EQUIPE"
              color="customYellow"
              width="w-[30%]"
            ></PlainButton>
          </div>

          <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
            <InputString
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(validateInput(e.target.value, "email") ?? false);
              }}
              title="E-MAIL"
              width="w-[50%]"
              height="h-8"
              placeholder="Digite o email..."
              isMandatory={true}
              borderColor={isEmailValid ? 'border-customYellow' : 'border-red-500'}
              stringType="email"
            ></InputString>
            <InputString
            onChange={(e) => setPhone(e.target.value)}
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

          <div className="w-[100%] flex justify-center mt-8">
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
