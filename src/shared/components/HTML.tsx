import React, { ReactElement, JSXElementConstructor } from 'react';
import { HelmetContext } from 'react-helmet-async';

type LoadableTags = ReactElement<Record<string, unknown>, string | JSXElementConstructor<any>>[];

interface Props {
  children: string;
  scriptTags: LoadableTags;
  linkTags: LoadableTags;
  styleTags: LoadableTags;
  helmetContext: HelmetContext;
}

const HTML = ({
  children,
  scriptTags,
  linkTags,
  styleTags,
  helmetContext: { helmet },
}: Props): JSX.Element => {
  console.log(helmet, 'helmet');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet && (
          <>
            {helmet.base.toComponent()}
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {/* <link
              rel="stylesheet"
              href="https://nextjs-ecommerce-ssr.vercel.app/_next/static/css/6c19512649113719.css"
            /> */}
            {helmet.script.toComponent()}
          </>
        )}
        {linkTags}
        {styleTags}
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        />
        {scriptTags}
      </body>
    </html>
  );
};

export default HTML;
