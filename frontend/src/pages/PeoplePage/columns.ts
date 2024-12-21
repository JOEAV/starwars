import { MRT_ColumnDef } from "mantine-react-table";
import { Person } from "../../utils/PersonValidation";

export const columns = (
  validationErrors: Record<string, string | undefined>,
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>
): MRT_ColumnDef<Person>[] => [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.name,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          name: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "height",
    header: "Height (cm)",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.height,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          height: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "mass",
    header: "Mass (kg)",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.mass,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          mass: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "hair_color",
    header: "Hair Color",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.hair_color,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          hair_color: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "skin_color",
    header: "Skin Color",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.skin_color,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          skin_color: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "eye_color",
    header: "Eye Color",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.eye_color,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          eye_color: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "birth_year",
    header: "Birth Year",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.birth_year,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          birth_year: undefined,
        }));
      },
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableEditing: true,
    mantineEditTextInputProps: {
      required: true,
      error: validationErrors.gender,
      onFocus: () => {
        setValidationErrors((prev) => ({
          ...prev,
          gender: undefined,
        }));
      },
    },
  },
];
