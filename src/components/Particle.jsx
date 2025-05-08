import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Using slim for star shape

const Particle = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // slim bundle includes the star shape
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        init && (
            <Particles
                id="tsparticles"
                options={{
                    fullScreen: false, // Important: keep this false for inline style to work
                    background: {
                        color: "transparent", // Keep background transparent
                    },
                    fpsLimit: 60,

                    particles: {
                        color: {
                            value: ["#FFFFFF", "#FFD700", "#ADD8E6", "#E6E6FA"], // Various star colors
                        },
                        links: {
                            enable: false, // Disable links for a starfield look
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "out", // Stars drift out of view
                            },
                            random: true, // Stars move in random directions
                            speed: 0.3, // Slower, more majestic movement
                            straight: false,
                        },
                        number: {
                            value: 150, // Increase star density a bit
                        },
                        opacity: {
                            value: {
                                min: 0.1,
                                max: 0.8
                            },
                            animation: {
                                enable: true,
                                speed: 0.5,
                                minimumValue: 0.1,
                                sync: false
                            }
                        },
                        shape: {
                            type: "star",
                            options: {
                                star: {
                                    sides: 5, // Standard 5-point star
                                }
                            }
                        },
                        size: {
                            value: { min: 0.5, max: 2.5 }, // Smaller, more varied star sizes
                            animation: {
                                enable: true,
                                speed: 2,
                                minimumValue: 0.5,
                                sync: false
                            }
                        },
                    },
                    detectRetina: true,
                    style: {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        margin: "0",
                        padding: "0",
                        zIndex: "-1",
                        pointerEvents: "none"
                    }
                }}
            />
        )
    );
};

export default Particle; 