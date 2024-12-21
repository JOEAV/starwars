import React, { useMemo, useState } from "react";
import { MantineReactTable, type MRT_Row } from "mantine-react-table";
import { Stack, Title, Alert, Text } from "@mantine/core";
import { useSearchContext } from "../../context/SearchContext.tsx";
import { validatePerson, Person } from "../../utils/PersonValidation.ts";
import { v4 as uuidv4 } from "uuid";
import { columns } from "./columns.ts";
import RowActions from "./RowActions.tsx";
import { modals } from "@mantine/modals";
import {
  CreateRowModalContent,
  EditRowModalContent,
} from "./RowModalContent.tsx";
import TopToolbarActions from "./TopToolbarActions.tsx";

export default function PeoplePage() {
  const { searchResults, setSearchResults } = useSearchContext();
  const peopleData: Person[] = searchResults.people || [];

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const columnDefs = useMemo(
    () => columns(validationErrors, setValidationErrors),
    [validationErrors, setValidationErrors]
  );

  const handleModalCancel = () => {
    setValidationErrors({});
    setGlobalError(null);
  };

  const handleSaveRow = async ({
    exitEditingMode,
    row,
    values,
  }: {
    exitEditingMode: () => void;
    row: MRT_Row<Person>;
    values: Person;
  }) => {
    const errors = validatePerson(values);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setGlobalError(null);

    setSearchResults((prev) => ({
      ...prev,
      people: prev.people.map((person) =>
        person.id === values.id ? { ...values } : person
      ),
    }));

    exitEditingMode();
  };

  const handleCreateRow = async ({
    values,
    exitCreatingMode,
  }: {
    values: Omit<Person, "id">;
    exitCreatingMode: () => void;
  }) => {
    const newId = uuidv4();
    const personWithId: Person = {
      ...values,
      id: newId,
    };
    const errors = validatePerson(personWithId);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setGlobalError(null);

    setSearchResults((prev) => ({
      ...prev,
      people: [personWithId, ...prev.people],
    }));

    exitCreatingMode();
  };

  const handleDeleteRow = (row: MRT_Row<Person>) => {
    modals.openConfirmModal({
      title: "Delete Confirmation",
      children: (
        <Text>
          Are you sure you want to delete {row.original.name}? This action
          cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        setSearchResults((prev) => ({
          ...prev,
          people: prev.people.filter((person) => person.id !== row.original.id),
        }));
      },
    });
  };
  

  return (
    <Stack gap="xl" style={{ padding: "2rem" }}>
      <Title order={2}>Star Wars People Management</Title>
      {globalError && (
        <Alert title="Error!" color="red">
          {globalError}
        </Alert>
      )}
      {peopleData.length === 0 && !globalError && (
        <Alert title="Search Results Are Empty" color="yellow">
          Conduct a new search to find Star Wars persons.
          <br />
        </Alert>
      )}
      <MantineReactTable<Person>
        columns={columnDefs}
        data={peopleData}
        getRowId={(row) => row.id}
        enableEditing
        onEditingRowSave={handleSaveRow}
        onCreatingRowSave={handleCreateRow}
        onCreatingRowCancel={handleModalCancel}
        onEditingRowCancel={handleModalCancel}
        initialState={{
          columnVisibility: {
            id: false,
          },
        }}
        renderRowActions={({ row, table }) => (
          <RowActions
            row={row}
            table={table}
            onEdit={() => table.setEditingRow(row)}
            onDelete={() => handleDeleteRow(row)}
          />
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <TopToolbarActions onCreate={() => table.setCreatingRow(true)} />
        )}
        renderCreateRowModalContent={({
          table,
          row,
          internalEditComponents,
        }) => (
          <CreateRowModalContent
            table={table}
            row={row}
            internalEditComponents={internalEditComponents}
            validationErrors={validationErrors}
          />
        )}
        renderEditRowModalContent={({ table, row, internalEditComponents }) => (
          <EditRowModalContent
            table={table}
            row={row}
            internalEditComponents={internalEditComponents}
            validationErrors={validationErrors}
          />
        )}
      />
    </Stack>
  );
}
