import React from "react";
import AddTweetComponenet from "./AddTweetComponent";
import TweetsComponent from "./TweetsComponent";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { fetchTweets, createTweet } from "../tweetsService";

export default function Home({ userName }) {
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

  async function handleAddTweet(tweetObj) {
    const created = await createTweet(tweetObj);
    setTweets((prev) => [created[0], ...prev]);
  }
  return (
    <div>
      <Navbar />
      <h2>Welcome, {userName}!</h2>
      <AddTweetComponenet onAddTweet={handleAddTweet} userName={userName} />
      <TweetsComponent tweets={tweets} loading={loading} error={error} />
    </div>
  );
}
