"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const pathname = usePathname();

  return (
    <article
      className="companion-card p-4 rounded-xl shadow-md flex flex-col gap-3 sm:gap-4"
      style={{ backgroundColor: color }}
    >
    
      <div className="flex justify-between items-center">
        <div className="subject-badge">
          {subject}
        </div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark-filled.svg"
            alt="bookmark"
            width={14}
            height={14}
          />
        </button>
      </div>

      
      <h2 className="text-xl sm:text-2xl font-bold break-words">{name}</h2>

      <p className="text-sm sm:text-base">{topic}</p>

      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={14}
          height={14}
        />
        <p className="text-sm sm:text-base">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full mt-auto">
        <button className="btn-primary w-full justify-center py-2 rounded-lg text-sm sm:text-base">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
