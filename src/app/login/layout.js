import Head from 'next/head';

export default function LoginLayout({ children }) {
  return (
    <>
      <Head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-BkN5M7WyXe7NURW1b8mlvHmjPpt7u35RO9gLJ9S34AgFEn5x+QpM2Kk1Jg3c67o0/fGekRHrBFy6M2Wm3MCbNw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div>{children}</div>
    </>
  );
}
