import Head from 'next/head';
import { Header, Footer } from '../../components';
import { client } from '../../client';
import Project from '../../components/Project';

export default function Team() {
  const { generalSettings } = client.useQuery();

  const projects = client.useQuery().projects()?.nodes;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Our Projects - {generalSettings.title}</title>
      </Head>

      <main className="content content-single">
        <div className="wrap">
          <h2>Projects</h2>
          {projects.map((project) => (
            <Project project={project} key={project.id}></Project>
          ))}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}