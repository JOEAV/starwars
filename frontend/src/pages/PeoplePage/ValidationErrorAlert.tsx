import React from "react";
import { Alert, Text } from "@mantine/core";

interface ValidationErrorAlertProps {
  validationErrors: Record<string, string | undefined>;
}

export const ValidationErrorAlert: React.FC<ValidationErrorAlertProps> = ({
  validationErrors,
}) => {
  if (!Object.values(validationErrors).some((error) => error !== undefined)) {
    return null; // Don't render validation errors block if no errors exist
  }

  return (
    <Alert title="Validation Errors" color="yellow">
      {Object.entries(validationErrors).map(([field, error]) =>
        error ? (
          <Text key={field}>
            {field}: {error}
          </Text>
        ) : null
      )}
    </Alert>
  );
};
