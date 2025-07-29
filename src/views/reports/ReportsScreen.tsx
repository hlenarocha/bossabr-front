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
          icon="fa-solid fa-book"
          marginTop="mt-4"
          title="Diário de {user}"
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
          title="Diário de Atividades"
          subtitle="Visualize as atividades realizadas no dia {dd / mm / YYYY}"
          width="w-full"

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
          <TableItem
            columns={[
              {
                width: "10%",
                content: "ID REGISTRO",
              },
              { width: "20%", content: "EQUIPE" },
              { width: "20%", content: "SETOR" },
              { width: "30%", content: "OBSERVAÇÃO" },
              { width: "20%", content: "STATUS" },
            ]}
          />

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
