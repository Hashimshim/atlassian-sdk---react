// eslint-disable-next-line no-use-before-define
import React from 'react';
import GenericTextField, { IChildProps } from './GenericTextField';

export default function NameField(props : IChildProps) {
  const { value } = props;
  return (
    <GenericTextField value={value} elementId="name" elementLabel="Name" />
  );
}
