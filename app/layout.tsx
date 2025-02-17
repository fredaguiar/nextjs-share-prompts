import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
  title: 'Prompt AI',
  description: 'Discover and share AI prompts',
};

const RootLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
