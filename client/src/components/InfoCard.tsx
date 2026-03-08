import Link from "next/link";


type InfoCardProps = {
    icon?: string;
    titulo: string;
    descricao: string;
    extra?: string;
    link?: string;
    linkLabel?: string;
}

export default function InfoCard({ icon, titulo, descricao, extra, link, linkLabel }: InfoCardProps) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h3 className="text-indigo-600 text-xs">{titulo}</h3>
            <p className="text-gray-400 font-bold">{descricao}</p>
            {extra && <p className="text-gray-600 text-sm">{extra}</p>}
            {link && linkLabel && (
                <Link href={link} className="text-indigo-600 text-sm hover:text-indigo-500 transition-colors">
                    {linkLabel}
                </Link>
            )}
        </div>
    );
}