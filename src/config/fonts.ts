import localFont from "next/font/local";

const comfortaa = localFont({
    src: [
        { path: "../../public/fonts/Comfortaa-Light.ttf", weight: "300", style: "normal" },
        { path: "../../public/fonts/Comfortaa-Regular.ttf", weight: "400", style: "normal" },
        { path: "../../public/fonts/Comfortaa-Medium.ttf", weight: "500", style: "normal" },
        { path: "../../public/fonts/Comfortaa-SemiBold.ttf", weight: "600", style: "normal" },
        { path: "../../public/fonts/Comfortaa-Bold.ttf", weight: "700", style: "normal" },
    ],
    variable: "--font-comfortaa",
    display: "swap",
});

export default comfortaa;
