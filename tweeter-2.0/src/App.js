import "./App.css";
import TweetsComponent from "./components/TweetsComponent.jsx";
import AddTweetComponenet from "./components/AddTweetComponent.jsx";


export default function App() {

  return (
    <div>
      <div>
        <AddTweetComponenet />
      </div>
      <div>
        <TweetsComponent />
      </div>
    </div>
  );
}
