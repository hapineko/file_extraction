export default function Textarea(props: any) {
  const { label, name, register } = props;

  return (
    <div className="mt-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="block border border-black p-1 w-full mt-1"
        name={name}
        id={name}
        rows={5}
        required
        placeholder="/test/index.html"
        {...register(name)}
      ></textarea>
    </div>
  );
}
