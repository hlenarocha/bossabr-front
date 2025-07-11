import { FieldErrors, FieldValues } from "react-hook-form";

export const getBorderColor = <T extends FieldValues>(
  fieldName: keyof T,
  errors: FieldErrors<T>,
  touchedFields: Record<keyof T, boolean>
): string => {
  if (fieldName === "entryDate" || fieldName === "birthDate") {
    return errors[fieldName] ? "#EF4444" : "#F6BC0A";
  }

  if (touchedFields[fieldName] && errors[fieldName]) {
    return "border-customRedAlert";
  }

  return "border-customYellow";
};

export const handleInputChange = async <T extends FieldValues>(
  setValue: (field: keyof T, value: any, options?: any) => void,
  trigger: (field: keyof T) => Promise<boolean>,
  fieldName: keyof T,
  value: string | number
) => {
  setValue(fieldName, value, { shouldTouch: true, shouldValidate: true });
  await trigger(fieldName);
};
