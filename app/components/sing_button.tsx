interface SingButtonInterface {
  readonly title: string;
}

export default function SingButton(props: SingButtonInterface) {
  return (
    <section
      className="w-64 h-20 rounded-3xl flex justify-center"
      style={{ backgroundColor: "#9D5FFE" }}
    >
      <button>
        <span className="text-7xl font-jersey uppercase">{props.title}</span>
      </button>
    </section>
  );
}
