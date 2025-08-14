import "./App.css";
import React, { useState, useEffect } from "react";

const USERNAME = "Queen B";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");

  useEffect(() => {
    try {
      const storedTweets = localStorage.getItem("tweets");
      console.log("Stored tweets from localStorage:", storedTweets);
      if (storedTweets) {
        const parsedTweets = JSON.parse(storedTweets);
        console.log("Parsed tweets:", parsedTweets);
        if (Array.isArray(parsedTweets)) {
          console.log("Setting notes state:", parsedTweets);
          setTweets(parsedTweets);
        } else {
          console.error("Stored notes is not an array:", parsedTweets);
        }
      } else {
        console.log("No tweets found in localStorage, keeping empty array");
      }
    } catch (error) {
      console.error("Error loading tweets from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (tweets.length > 0) {
      try {
        console.log("Saving tweets to localStorage:", tweets);
        localStorage.setItem("tweets", JSON.stringify(tweets));
      } catch (error) {
        console.error("Error saving tweets to localStorage:", error);
      }
    } else {
      console.log("Skipping save to localStorage: tweets array is empty");
    }
  }, [tweets]);

  const handleAddTweet = () => {
    if (!tweetText.trim() || tweetText.length > 140) return;

    const newTweet = {
      id: Date.now(),
      text: tweetText,
      username: USERNAME,
      date: new Date().toISOString(),
    };

    setTweets([newTweet, ...tweets]);
    setTweetText("");
  };

  return (
    <div>
      <textarea
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
        maxLength={200}
        placeholder="What's on youre mind?"
      />
      <div className="row-items">
        <span
          className={`tweet-text ${tweetText.length > 140 ? "over-limit" : ""}`}
        >
          {tweetText.length}/140
        </span>
        <button
          onClick={handleAddTweet}
          disabled={!tweetText.trim() || tweetText.length > 140}
        >
          Tweet
        </button>
      </div>

      <div>
        <h3>Tweets</h3>
        {tweets.length === 0 && <p>No tweets yet.</p>}
        {tweets.map((tweet) => (
          <div className="tweet-card" key={tweet.id}>
            <div className="row-items grey">
              <small>{tweet.username}</small>
              <small>{new Date(tweet.date).toLocaleString()}</small>
            </div>
            <p>{tweet.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
