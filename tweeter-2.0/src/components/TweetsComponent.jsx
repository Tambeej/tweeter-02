import { useEffect, useState } from "react";
import { fetchTweets, createTweet } from "../tweetsService";

export default function TweetsComponent() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTweets() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTweets();
        setTweets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTweets();
  }, []);

  return (
    <div>
      <h2>Tweets</h2>
      {loading && <p>Loading tweets...</p>}
      {tweets.length === 0 && <p>No tweets yet.</p>}
      {tweets
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((tweet) => (
          <div className="tweet-card" key={tweet.id}>
            <div className="row-items grey">
              <small>{tweet.userName}</small>
              <small>{new Date(tweet.date).toLocaleString()}</small>
            </div>
            <p>{tweet.content}</p>
          </div>
        ))}
    </div>
  );
}
