export const dynamic = "force-dynamic";

import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companions.actions";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

    return (
        <main>
            <h1>Dashboard</h1>

            <section className="home-section">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>

            <section className="home-section">
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <Cta />
            </section>
        </main>
    );
};

export default Page;
