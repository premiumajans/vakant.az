interface Props {
  start: string;
  target: string;
}

const Adress = ({ start, target }: Props) => {
  return (
    <h4 className="fw-bold py-3 mb-4">
      <span className="text-muted fw-light">{start} /</span> {target}
    </h4>
  );
};

export default Adress;
