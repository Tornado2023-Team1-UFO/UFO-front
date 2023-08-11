import Head from "next/head";

interface PageDetailsProps {
    title: string;
    description: string;
}

function PageDetails({ title, description }: PageDetailsProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default PageDetails;
