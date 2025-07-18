'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companions.actions';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({
    companionId,
    subject,
    topic,
    name,
    userName,
    userImage,
    style,
    voice
}: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId);
        };
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [newMessage, ...prev]);
            }
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        };
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    };

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        };

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides);
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    return (
        <section className="flex flex-col h-[70vh] max-sm:h-auto max-sm:pb-6">
            {/* Top Section */}
            <section className="flex gap-8 max-sm:flex-col max-sm:gap-4">
                {/* Companion */}
                <div className="companion-section max-sm:items-center">
                    <div
                        className="companion-avatar max-sm:w-32 max-sm:h-32"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        {/* Static Avatar */}
                        <div
                            className={cn(
                                'absolute transition-opacity duration-1000',
                                callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )}
                        >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={100}
                                height={100}
                                className="max-sm:w-20 max-sm:h-20"
                            />
                        </div>

                        {/* Animated Waves */}
                        <div
                            className={cn(
                                'absolute transition-opacity duration-1000',
                                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                            )}
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie max-sm:w-24 max-sm:h-24"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl max-sm:text-lg mt-2">{name}</p>
                </div>

                {/* User */}
                <div className="user-section max-sm:items-center">
                    <div className="user-avatar">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={100}
                            height={100}
                            className="rounded-lg max-sm:w-20 max-sm:h-20"
                        />
                        <p className="font-bold text-2xl max-sm:text-lg mt-2">{userName}</p>
                    </div>

                    {/* Mic Button */}
                    <button
                        className="btn-mic max-sm:flex max-sm:justify-center"
                        onClick={toggleMicrophone}
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <Image
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt="mic"
                            width={28}
                            height={28}
                        />
                        <p className="max-sm:hidden">
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>

                    {/* Start/End Button */}
                    <button
                        className={cn(
                            'rounded-lg py-2 px-4 w-full max-w-xs text-white text-center text-lg max-sm:text-base transition-colors',
                            callStatus === CallStatus.ACTIVE
                                ? 'bg-red-700'
                                : 'bg-primary',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse'
                        )}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting...'
                                : 'Start Session'}
                    </button>
                </div>
            </section>

            {/* Transcript Section */}
            <section className="transcript mt-4 max-sm:mt-2">
                <div className="transcript-message no-scrollbar max-sm:max-h-48 max-sm:overflow-y-auto">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {name.split(' ')[0].replace('/[.,]/g', '')}: {message.content}
                                </p>
                            );
                        } else {
                            return (
                                <p key={index} className="text-primary max-sm:text-sm">
                                    {userName}: {message.content}
                                </p>
                            );
                        }
                    })}
                </div>
                <div className="transcript-fade" />
            </section>
        </section>
    );
};

export default CompanionComponent;
