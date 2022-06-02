import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Footer, Header } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client } from 'client';
import { useState } from 'react';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { useLogin } = client.auth;
  const [usernameEmail, setUserNameEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, data, error } = useLogin();

  if( data && data.code){
    console.log(data)
  }

  const errorMessage = data?.error || error?.message;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content">
      <form
        onSubmit={(e) => {
            e.preventDefault();

            login(usernameEmail, password);
        }}
      >
        <div>
            <div>
            <label htmlFor="usernameEmail">Username or Email</label>
            </div>
            <div>
            <input
                type="text"
                value={usernameEmail}
                onChange={(e) => setUserNameEmail(e.target.value)}
                id="usernameEmail"
            />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            </div>
            <div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
            />
            </div>

            <div>
            <button type="submit">Login</button>
            </div>
        </div>

        {errorMessage ? <p>Error: {errorMessage}</p> : null}
        </form>

      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

