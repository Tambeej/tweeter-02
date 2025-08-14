import "./App.css";
import TweetsComponent from "./components/TweetsComponent.jsx";
import AddTweetComponenet from "./components/AddTweetComponent.jsx";
import { useState, useEffect } from "react";
import { fetchTweets, createTweet } from "./tweetsService";

export default function App() {
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

    // async function handleAddTweet() {
    //   if (!newTweet.trim() || adding) return;
    //   setAdding(true);
    //   setError("");
  
    //   const tweetObj = {
    //     content: newTweet,
    //     userName: "Queen B",
    //     date: new Date().toISOString(),
    //   };
  
    //   try {
    //     const created = await createTweet(tweetObj);
    //     setTweets([created[0], ...tweets]);
    //     setNewTweet("");
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setAdding(false);
    //   }
    // }

  return (
    <div>
      <div>
        <AddTweetComponenet onAddTweet={handleAddTweet} />
      </div>
      <div>
        <TweetsComponent tweets={tweets} loading={loading} error={error} />
      </div>
    </div>
  );
}
