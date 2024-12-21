import React from "react";
import classes from "./blankCategoryPage.module.css";
import {Text,Title} from '@mantine/core';
interface BlankCategoryPageProps {
  categoryName: string;
}

export default function BlankCategoryPage(props: BlankCategoryPageProps) {
  return (
    <div className={classes['page-wrapper']}>
     <Title>{props.categoryName}</Title>
     <Text size="20px">To be Implemented</Text>
    </div>
  );
}
