import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post, ProjectIdType } from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Project from 'components/Project';


export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const router = useRouter();
  let { postId } = router.query;
  if(Array.isArray(postId)){
   postId = postId[0]; 
  }
  const project = useQuery().project({id: postId, idType: ProjectIdType.ID})
  console.log(project);

return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {project?.name} - {generalSettings.title}
        </title>
      </Head>

      <Hero
        title={project?.name}
      />

      <main className="content content-single">
        <div className="wrap">
            <Project project={project}></Project>
        </div>
      </main>

      <Footer copyrightHolder="Test" />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

// export function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }
