import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;
    try {
      page = Number(query.page) || 1;
      const res = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await res.json();
    } catch (err) {
      console.error(err);
      stories = [];
    }
    return { stories, page };
  }
  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) return <Error statusCode={503} />;
    return (
      <Layout title="Hacker Next" description="A Hacker Next clone">
        <StoryList stories={stories} />
        <footer>
          {page === 1 ? null : (
            <Link href={`/?page=${page - 1}`}>
              <a>Prev Page / </a>
            </Link> 
          )}

          <Link href={`/?page=${page + 1}`}>
            <a>Next Page</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
