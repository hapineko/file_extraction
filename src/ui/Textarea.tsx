export default function Textarea(props: any) {
  const { label, name } = props;

  return (
    <div className="mt-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="block border border-black p-1 w-full mt-1"
        name={name}
        id={name}
        rows={5}
      ></textarea>
    </div>
  );
}
