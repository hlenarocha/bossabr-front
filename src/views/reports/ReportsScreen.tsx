import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import InputTitle from "@/components/title/InputTitle";
import TableItem from "@/components/table/TableItem";
import TableHeader from "@/components/table/TableHeader";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const ReportScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <BaseScreen>
      <div className="flex flex-col items-center lg:justify-between lg:flex-row">
        <PageTitle
          icon="fa-solid fa-file"
          marginTop="mt-4"
          title="Relatório Diário de {user}"
        ></PageTitle>
        <ColoredButton
          onClick={() => {
            navigate("/reports");
          }}
          width="w-fit"
          title="BAIXAR RELATÓRIO DIÁRIO"
          icon="fa-solid fa-download"
          marginTop="mt-6"
          color="customYellow"
          justify="justify-center"
        ></ColoredButton>
      </div>
      <Motion>
        <Box
          title="Relatório Diário"
          subtitle="Visualize as suas atividades realizadas no dia {dd / mm / YY}"
          width="w-[600px] lg:w-[800px] xl:w-[1000px]"
          height="h-fit"
        >
          <div className="flex flex-row gap-2 w-full mb-4">
            <InputString
              title="NOME"
              placeholder={user?.first_name || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true}
            ></InputString>
            <InputString
              title="EQUIPE"
              placeholder={user?.nome_equipe || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true}
        ></InputString>

            <InputString
              title="SETOR"
              placeholder={user?.nome_setor || ""}
              isMandatory={false}
              height="h-8"
              width="w-1/3"
              isReadOnly={true} />
          </div>

          <InputTitle title="Atividades do dia" />
          <TableHeader
            columns={[
              {
                width: "w-[16%]",
                content: "ID REGISTRO",
              },
              { width: "w-[16%]", content: "EQUIPE" },
              { width: "w-[16%]", content: "SETOR" },
              { width: "w-[30%]", content: "OBSERVAÇÃO" },
              { width: "w-[20%]", content: "STATUS" },
            ]}
          ></TableHeader>

          <div className="h-[350px] overflow-y-auto">
            <TableItem
              itemWidth="w-full "
              itemHeight="h-16"
              columns={[
                {
                  width: "w-[16%]",
                  content: "ID Registro",
                },
                { width: "w-[16%]", content: "Equipe" },
                { width: "w-[16%]", content: "Setor" },
                { width: "w-[30%]", content: "Observação" },
                { width: "w-[20%]", content: "Status" },
              ]}
              icon="fa-pencil"
            ></TableItem>
            <TableItem
              itemWidth="w-full "
              itemHeight="h-16"
              columns={[
                {
                  width: "w-[16%]",
                  content: "ID Registro",
                },
                { width: "w-[16%]", content: "Equipe" },
                { width: "w-[16%]", content: "Setor" },
                { width: "w-[30%]", content: "Observação" },
                { width: "w-[20%]", content: "Status" },
              ]}
              icon="fa-pencil"
            ></TableItem>
            <TableItem
              itemWidth="w-full "
              itemHeight="h-16"
              columns={[
                {
                  width: "w-[16%]",
                  content: "ID Registro",
                },
                { width: "w-[16%]", content: "Equipe" },
                { width: "w-[16%]", content: "Setor" },
                { width: "w-[30%]", content: "Observação" },
                { width: "w-[20%]", content: "Status" },
              ]}
              icon="fa-eye"
            ></TableItem>
            <TableItem
              itemWidth="w-full "
              itemHeight="h-16"
              columns={[
                {
                  width: "w-[16%]",
                  content: "ID Registro",
                },
                { width: "w-[16%]", content: "Equipe" },
                { width: "w-[16%]", content: "Setor" },
                { width: "w-[30%]", content: "Observação" },
                { width: "w-[20%]", content: "Status" },
              ]}
              icon="fa-eye"
            ></TableItem>
            <TableItem
              itemWidth="w-full"
              itemHeight="h-16"
              columns={[
                {
                  width: "w-[16%]",
                  content: "ID Registro",
                },
                { width: "w-[16%]", content: "Equipe" },
                { width: "w-[16%]", content: "Setor" },
                { width: "w-[30%]", content: "Observação" },
                { width: "w-[20%]", content: "Status" },
              ]}
              icon="fa-eye"
            ></TableItem>
          </div>
          <div className="flex w-full mt-10 justify-center"></div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};
export default ReportScreen;
