import React from "react";
import { Button } from "@mantine/core";

interface TopToolbarActionsProps {
  onCreate: () => void;
}

export default function TopToolbarActions({ onCreate }: TopToolbarActionsProps) {
  return (
    <Button onClick={onCreate}>Create New Person</Button>
  );
}
