import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-2xl sm:text-3xl mb-4">{title}</h2>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-lg w-2/3">Lessons</TableHead>
                            <TableHead className="text-lg">Subject</TableHead>
                            <TableHead className="text-lg text-right">Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companions?.map(({ id, subject, name, topic, duration }, index) => (
                            <TableRow key={`${id}-${index}`}>
                                <TableCell>
                                    <Link href={`/companions/${id}`}>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="size-[72px] flex items-center justify-center rounded-lg"
                                                style={{ backgroundColor: getSubjectColor(subject) }}
                                            >
                                                <Image
                                                    src={`/icons/${subject}.svg`}
                                                    alt={subject}
                                                    width={35}
                                                    height={35}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-bold text-xl">{name}</p>
                                                <p className="text-base text-gray-600">{topic}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit">
                                        {subject}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <p className="text-lg">{duration} mins</p>
                                        <Image
                                            src="/icons/clock.svg"
                                            alt="minutes"
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-4 md:hidden">
                {companions?.map(({ id, subject, name, topic, duration }, index) => (
                    <Link
                        href={`/companions/${id}`}
                        key={`mobile-${id}-${index}`}
                        className="block rounded-lg shadow-sm p-4 bg-gray-100"
                    >
                         <div className="flex items-center gap-3">
                <div
                    className="w-14 h-14 flex items-center justify-center rounded-lg shrink-0"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                >
                    <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="text-sm text-gray-600">{topic}</p>
                </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{duration} min</p>
                                <Image
                                    src="/icons/clock.svg"
                                    alt="minutes"
                                    width={14}
                                    height={14}
                                    className="inline-block mt-1"
                                />
                            </div>
                        </div>
                        <div className="subject-badge text-xs mt-2 inline-block px-2 py-1 rounded">
                            {subject}
                        </div>
                    </Link>
                ))}
            </div>
        </article>
    )
}

export default CompanionsList;
