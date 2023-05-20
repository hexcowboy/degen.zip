interface Props {
  params: {
    addressOrEns: string;
  };
}

export default function Page({ params: { addressOrEns } }: Props) {
  return <div>hey {addressOrEns}</div>;
}
