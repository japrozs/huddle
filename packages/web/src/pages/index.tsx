import Head from "next/head";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { Hero } from "../components/Hero";

export default function Home() {
    return (
        <div>
            <Hero />
        </div>
    );
}
