type InputLabelProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

const Input = (props: InputLabelProps) => {
  const { id, label, ...rest } = props;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </>
  );
};
export default Input;
