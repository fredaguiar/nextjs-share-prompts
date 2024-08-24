import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">Discover and Share</h1>
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI-Powered prompts</span>
      <p className="desc text-center">
        Open Source AI prompting tool. Create and share AI prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
