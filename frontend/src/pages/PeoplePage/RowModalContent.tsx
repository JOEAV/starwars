import React from "react";
import { Flex, Stack, Title } from "@mantine/core";
import { MRT_EditActionButtons } from "mantine-react-table";
import { ValidationErrorAlert } from "./ValidationErrorAlert.tsx";

export const CreateRowModalContent = ({
  table,
  row,
  internalEditComponents,
  validationErrors,
}: any) => (
  <Stack gap="md">
    <Title order={3}>Create New Person</Title>
    {internalEditComponents}
    <ValidationErrorAlert validationErrors={validationErrors} />
    <Flex justify="flex-end" mt="xl">
      <MRT_EditActionButtons variant="icon" table={table} row={row} />
    </Flex>
  </Stack>
);

export const EditRowModalContent = ({
  table,
  row,
  internalEditComponents,
  validationErrors,
}: any) => (
  <Stack gap="md">
    <Title order={3}>Edit Person</Title>
    {internalEditComponents}
    <ValidationErrorAlert validationErrors={validationErrors} />
    <Flex justify="flex-end" mt="xl">
      <MRT_EditActionButtons variant="icon" table={table} row={row} />
    </Flex>
  </Stack>
);
