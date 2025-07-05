import Navbar from "@/_components/NavBar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head> <Navbar/> </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
