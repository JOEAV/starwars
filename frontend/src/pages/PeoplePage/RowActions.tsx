import React from "react";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_Row, MRT_TableInstance } from "mantine-react-table";
import type { Person } from "../../utils/PersonValidation";

interface RowActionsProps {
  row: MRT_Row<Person>;
  table: MRT_TableInstance<Person>;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RowActions({ row, onEdit, onDelete }: RowActionsProps) {
  return (
    <Flex gap="sm">
      <Tooltip label="Edit">
        <ActionIcon onClick={onEdit} aria-label={`Edit ${row.original.name}`}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon
          color="red"
          onClick={onDelete}
          aria-label={`Delete ${row.original.name}`}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
}
