import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "./BaseScreen";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/UI/InputString";
import SectorTag from "@/components/tags/SectorTag";
import InputTitle from "@/components/title/InputTitle";
import TableItem from "@/components/table/TableItem";
import TableHeader from "@/components/table/TableHeader";

const ReportScreen = () => {
  return (
    <BaseScreen>
      <PageTitle
        marginTop="mt-4"
        title="Relatório Diário de {user}"
      ></PageTitle>
      <Box
        title="Relatório Diário"
        subtitle="Visualize as demandas realizadas no dia {dd / mm / YY}"
        width="w-full md:w-[700px] lg:w-[900px]"
        height="h-fit"
      >
        <div className="flex flex-row gap-2 w-full mb-4">
          <InputString
            title="NOME"
            placeholder="{NOME}"
            isMandatory={false}
            height="h-8"
            width="w-[40%]"
            isReadOnly={true}
          ></InputString>
          <InputString
            title="EQUIPE"
            placeholder="{EQUIPE}" // colocar equipe no lugar de user?.first_name
            isMandatory={false}
            height="h-8"
            width="w-[40%]"
            isReadOnly={true}
          ></InputString>

          <div className="flex flex-col w-fit">
            <p className="mt-4 text-sm font-black text-white mb-1">SETOR</p>
            <SectorTag></SectorTag>
          </div>
        </div>

        <InputTitle title="Registros do dia" />
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
      </Box>
    </BaseScreen>
  );
};
export default ReportScreen;
