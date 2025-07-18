import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section rounded-xl p-6 sm:p-8 md:p-10 text-center flex flex-col items-center gap-4 sm:gap-6">
        
            <div className="cta-badge text-xs sm:text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                Start learning your way.
            </div>

            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug sm:leading-tight max-w-2xl">
                Build and Personalize Learning Companion
            </h2>

            
            <p className="text-sm sm:text-base max-w-lg">
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>

            {/* Image */}
            <div className="w-full max-w-[320px] sm:max-w-[400px]">
                <Image
                    src="/images/cta.png"
                    alt="cta"
                    width={362}
                    height={232}
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Button */}
            <Link
                href="/companions/new"
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
            >
                <Image
                    src="/icons/plus.svg"
                    alt="plus"
                    width={14}
                    height={14}
                />
                Build a New Companion
            </Link>
        </section>
    );
};
export default Cta;
