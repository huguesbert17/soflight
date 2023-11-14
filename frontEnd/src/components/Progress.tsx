import React, {FC, useRef, useState} from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import anim from "../assets/img/Animation - 1699553398237.json";
import {AbsoluteCenter} from "@chakra-ui/react";


const Progress: FC = () => {
    const lottiePlayerRef = useRef<any>(),
        [lottie, setLottie] = useState<any>()

    return <AbsoluteCenter>
        <Player
            ref={lottiePlayerRef}
            lottieRef={(instance) => {
                lottiePlayerRef.current.setPlayerDirection(-1);
                setLottie(instance)
            }}
            onEvent={(event) => {
                if (event === "load") {
                    if (lottiePlayerRef.current) lottiePlayerRef.current.play();
                }
            }}
            direction={-1}
            autoplay={true}
            loop={true}
            controls={true}
            src={anim}
            style={{ height: "200px", width: "200px" }}
        />
    </AbsoluteCenter>
}
export default Progress
