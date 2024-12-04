interface TitleProps {
  label: string;
}

function Title({ label }: TitleProps) {
  return (
    <h1 className="text-2xl text-center leading-9 font-normal whitespace-pre-wrap">
      {label}
    </h1>
  );
}

export default Title;
