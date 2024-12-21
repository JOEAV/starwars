export interface Person {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export const validateRequired = (value: string) => !!value.trim();

// Validation for numeric strings (only digits)
export const validateNumericString = (value: string) => /^\d+$/.test(value);

// Validation for birth year (e.g., "19BBY", "1990", or "unknown")
export const validateBirthYear = (value: string): boolean => {
  return /^(\d+(BBY|ABY)?|unknown)$/i.test(value);
};

// Validation for gender (must be one of the allowed values)
export const validateGender = (value: string) => {
  const allowedGenders = [
    "male",
    "female",
    "n/a",
    "hermaphrodite",
    "none",
    "unknown",
  ];
  return allowedGenders.includes(value.toLowerCase());
};

export const validatePerson = (person: Person) => {
  return {
    name: !validateRequired(person.name) ? "Name is required" : "",
    height: !validateRequired(person.height)
      ? "Height is required"
      : !validateNumericString(person.height)
        ? "Height must be a numeric value"
        : "",
    mass: !validateRequired(person.mass)
      ? "Mass is required"
      : !validateNumericString(person.mass)
        ? "Mass must be a numeric value"
        : "",
    hair_color: !validateRequired(person.hair_color)
      ? "Hair color is required"
      : "",
    skin_color: !validateRequired(person.skin_color)
      ? "Skin color is required"
      : "",
    eye_color: !validateRequired(person.eye_color)
      ? "Eye color is required"
      : "",
    birth_year: !validateRequired(person.birth_year)
      ? "Birth year is required"
      : !validateBirthYear(person.birth_year)
        ? "Birth year must be in format like '19BBY' or 'unknown'"
        : "",
    gender: !validateRequired(person.gender)
      ? "Gender is required"
      : !validateGender(person.gender)
        ? "Gender must be one of: male, female, n/a, hermaphrodite, none, unknown"
        : "",
  };
};
