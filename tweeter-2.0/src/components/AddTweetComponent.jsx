import { useEffect, useState } from "react";
import { fetchTweets, createTweet } from "../tweetsService";

export default function AddTweetComponenet() {
  const [tweets, setTweets] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newTweet, setNewTweet] = useState("");
  const [error, setError] = useState("");

  async function handleAddTweet() {
    if (!newTweet.trim() || adding) return;
    setAdding(true);
    setError("");

    const tweetObj = {
      content: newTweet,
      userName: "Queen B",
      date: new Date().toISOString(),
    };

    try {
      const created = await createTweet(tweetObj);
      setTweets([created[0], ...tweets]);
      setNewTweet("");
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          maxLength={200}
          placeholder="What's on youre mind?"
        />
        <div className="row-items">
          <span
            className={`tweet-text ${
              newTweet.length > 140 ? "over-limit" : ""
            }`}
          >
            {newTweet.length}/140
          </span>
          <button
            onClick={handleAddTweet}
            disabled={!newTweet.trim() || newTweet.length > 140}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
