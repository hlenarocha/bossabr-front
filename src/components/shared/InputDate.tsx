import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";
import React from "react";

// Para formatação correta dos dias da semana
dayjs.extend(updateLocale);

dayjs.updateLocale("pt-br", {
  weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
});

interface InputDateProps {
  title: string;
  isMandatory: boolean;
  width?: string;
  height?: string;
  borderColor?: string;
  onChange?: (e: string) => void;
  errorMessage?: string;
  value?: string | null;
}

const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
  (props, ref) => {
    const dateValue = props.value ? dayjs(props.value) : null;

    console.log("borderColor", props.borderColor);
    return (
      <div className={`flex flex-col ${props.width}`}>
        <div className="text-md mt-2 font-black mb-1 text-white">
          {props.title}
          <span
            className={`${
              props.isMandatory ? "visible" : "hidden"
            } text-customYellow`}
          >
            {" "}
            *
          </span>
        </div>

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="pt-br" // Localização em português
        >
          <DatePicker
            value={dateValue}
            onChange={(date) => {
              if (date && props.onChange) {
                props.onChange(dayjs(date).format("YYYY-MM-DD"));
              }
            }}
            slotProps={{
              yearButton: {
                sx: {
                  color: "white",
                  "&.Mui-selected": {
                    backgroundColor: "#555555",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#444444",
                  },
                },
              },
              nextIconButton: {
                sx: {
                  color: "white",
                },
              },
              previousIconButton: {
                sx: {
                  color: "white",
                },
              },
              textField: {
                inputRef: ref,
                size: "small",
                error: !!props.errorMessage,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#555555",
                    borderRadius: "100px",
                    "& fieldset": { borderColor: props.borderColor }, // Cor do contorno
                    "&:hover fieldset": { borderColor: props.borderColor }, // Outline ao passar o mouse
                    "&.Mui-focused fieldset": {
                      borderColor: props.borderColor + "!important",
                    },
                    "&.Mui-error fieldset": {
                      borderColor: props.borderColor + " !important", // <-- Força a borda vermelha personalizada
                    }, // Outline quando focado
                  },
                  input: { color: "white" },
                  svg: { color: "white" },
                },
              },
              desktopPaper: {
                sx: {
                  borderRadius: 2,
                  backgroundColor: "#1f1f1f",
                  color: "white",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: "white",
                    fontSize: "0.875rem",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#F6BC0A !important",
                    color: "black !important",
                  },
                  "& .MuiPickersYear-yearButton.Mui-selected": {
                    backgroundColor: "#555555 !important",
                    color: "white !important", // !important sobrepõe o estilo padrão
                  },
                },
              },
              mobilePaper: {
                sx: {
                  backgroundColor: "#1f1f1f",
                  color: "white",
                },
              },
              day: {
                sx: {
                  color: "white",
                  "&.Mui-selected": {
                    backgroundColor: "#F6BC0A",
                    color: "black",
                    "&:hover": { backgroundColor: "#d9a309" },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        <div className="text-xs text-customRedAlert mt-1">
          {props.errorMessage}
        </div>
      </div>
    );
  }
);

export default InputDate;
