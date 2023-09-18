import Head from "next/head";

interface SeoProps {
  title: string;
}

const Seo: React.FC<SeoProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
