import Form from 'react-bootstrap/Form';

type InputLabelProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  description?: string;
};

const Input = (props: InputLabelProps) => {
  const { id, label, ...rest } = props;

  return (
    <>
      {/* <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} /> */}
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        type='number'
        id={id}
        aria-describedby='passwordHelpBlock'
        {...rest}
      />
      {props.description && (
        <Form.Text id='passwordHelpBlock' muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
      )}
    </>
  );
};
export default Input;
