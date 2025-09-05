import Link from "next/link";

type Props = {
    id: string;
    name: string;
}

export function MainItem({ id, name }: Props) {
    return <Link href={`/bonds/${id}`}><div>{name}</div></Link>
}