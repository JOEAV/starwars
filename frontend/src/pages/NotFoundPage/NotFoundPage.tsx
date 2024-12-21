import React from "react";
import classes from "./notFound.module.css";
import {Text,Title} from '@mantine/core'

export default function BlankCategoryPage() {
  return (
    <div className={classes['page-wrapper']}>
     <Title>404</Title>
     <Text size="20px">There's nothing to 👀 here </Text>
    </div>
  );
}
