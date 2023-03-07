import React from 'react';
import { FormControlProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type InputLabelProps = {
  label: string;
  description?: string;
} & FormControlProps;

const Input = (props: InputLabelProps) => {
  const { id, label, type, ...rest } = props;

  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control type={type} id={id} {...rest} />
      {props.description && (
        <Form.Text id={id} muted>
          {props.description}
        </Form.Text>
      )}
    </>
  );
};
export default Input;
