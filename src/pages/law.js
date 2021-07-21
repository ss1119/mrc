import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { getPage } from "../lib/api";
import { J_SITE_TITLE, E_SITE_TITLE } from "../lib/constants";
import markdownToHtml from "../lib/markdownToHtml";
import Layout from "../components/layout";
import Content from "../components/content";
import PageTitle from "../components/pageTitle";

export default function Law({ jtitle, etitle, jbody, ebody }) {
  const { locale } = useRouter();
  const body = locale === "ja" ? jbody : ebody;
  const site_title = locale === "ja" ? J_SITE_TITLE : E_SITE_TITLE;
  const page_title = locale === "ja" ? jtitle : etitle;

  return (
    <Layout>
      <Head>
        <title>
          {page_title} | {site_title}
        </title>
      </Head>
      <PageTitle title={page_title} />
      <Content body={body} />
    </Layout>
  );
}

export async function getStaticProps() {
  const jitem = await getPage("law");
  const eitem = await getPage("law-en");
  const jbody = await markdownToHtml(jitem.fields.body);
  const ebody = await markdownToHtml(eitem.fields.body);
  return { props: { jtitle: jitem.fields.title, etitle: eitem.fields.title, jbody: jbody, ebody: ebody } };
}
