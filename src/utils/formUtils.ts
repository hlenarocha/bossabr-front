import { FieldErrors, FieldValues, Path } from "react-hook-form";

/**
 * Determines the border color for a form input based on its error and touched state.
 * @param fieldName The name of the field.
 * @param errors The errors object from react-hook-form.
 * @param touchedFields The touchedFields object from react-hook-form.
 * @returns A string representing the border color class.
 */
export const getBorderColor = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  touchedFields: Partial<Readonly<{ [K in Path<T>]?: boolean }>>
): string => {
  const isTouched = touchedFields[fieldName];
  const hasError = errors[fieldName];

  if (hasError) {
    return "border-customRedAlert"; // Red for errors
  }
  if (isTouched) {
    return "border-customYellow"; // Yellow for touched and valid
  }
  return "border-customYellow"; // Default color
};