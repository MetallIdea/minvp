import { BondItem } from "@/modules/bonds/BondItem/BondItem";
import { useParams } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>;
}

export default async function BondItemPage({ params }: Props) {
    const { id } = await params;

    return <BondItem id={id} />
}
