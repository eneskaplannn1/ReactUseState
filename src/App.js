import { useState } from "react";
import Card from "./card";
import SplitBill from "./components/splitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [selected, setSelected] = useState(null);
  const [friends, setFriends] = useState(initialFriends);
  const [friend, setFriend] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  const friendsList = friends.map((person, i) => (
    <Card key={person.id} index={i} person={person} onSelect={handleSelect} />
  ));
  function handleAddFriend() {
    setFriend((prev) => !prev);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!friendName) return;
    console.log("clicked");
    setFriends((prev) => [
      ...prev,
      { id: Date.now(), name: friendName, image: friendImage, balance: 0 },
    ]);
    setFriend(false);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  }

  function handleSelect(num) {
    return selected === num ? null : setSelected(num);
  }
  function handleAddBalance(amount, personName) {
    setFriends(
      friends.map((friend) =>
        friend.name === personName
          ? { ...friend, balance: friend.balance * 1 + amount * 1 }
          : friend
      )
    );
    setSelected(null);
  }
  function handleRemoveBalance(amount, personName) {
    setFriends(
      friends.map((friend) =>
        friend.name === personName
          ? { ...friend, balance: friend.balance * 1 - amount * 1 }
          : friend
      )
    );
    setSelected(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ul>{friendsList}</ul>
        {friend && (
          <form onSubmit={handleSubmitForm} className="form-add-friend">
            <label>🙆‍♂️Friend Name</label>
            <input
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
            />
            <label>📷Image URL</label>
            <input
              value={friendImage}
              onChange={(e) => setFriendImage(e.target.value)}
            />
            <button className="button">Add</button>
          </form>
        )}
        <button className="button" onClick={handleAddFriend}>
          {friend ? "Close" : "Add Friend"}
        </button>
      </div>
      <SplitBill
        selected={selected}
        friends={friends}
        onAddBalance={handleAddBalance}
        onRemoveBalance={handleRemoveBalance}
      />
    </div>
  );
}

export default App;
