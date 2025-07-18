import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companions.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-10">
      {canCreateCompanion ? (
        <article className="w-full max-w-3xl flex flex-col gap-6 bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Companion Builder
          </h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="flex flex-col items-center justify-center text-center gap-4 w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 md:p-8">
          <Image
            src="/images/limit.png"
            alt="Companion limit reached"
            width={300}
            height={200}
            className="w-full max-w-xs sm:max-w-sm"
          />
          <div className="cta-badge text-sm sm:text-base">
            Upgrade your plan
          </div>
          <h1 className="text-xl text-white sm:text-2xl md:text-3xl font-bold">
            You’ve Reached Your Limit
          </h1>
          <p className="text-gray-100 text-sm sm:text-base">
            You’ve reached your companion limit. Upgrade to create more companions and unlock premium features.
          </p>
          <Link
            href="/subscription"
             className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
