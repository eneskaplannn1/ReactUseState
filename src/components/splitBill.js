import { useState } from "react";

export default function SplitBill({
  selected,
  friends,
  onAddBalance,
  onRemoveBalance,
}) {
  const [bill, setBill] = useState();
  const [myExpense, setMyExpense] = useState();

  const [personWhoPays, setPersonWhoPays] = useState(friends[selected]?.name);

  function handleSubmitBill(e) {
    e.preventDefault();
    console.log(personWhoPays);
    if (personWhoPays === friends[selected].name)
      onAddBalance(myExpense, friends[selected].name);
    if (personWhoPays === "Me")
      onRemoveBalance(Number(bill) - Number(myExpense), friends[selected].name);

    setBill("");
    setMyExpense("");
  }
  return (
    selected !== null && (
      <form className="form-split-bill" onSubmit={handleSubmitBill}>
        <h3>SPLIT A BILL WITH {friends[selected].name}</h3>
        <h1></h1>
        <label htmlFor="bill">💰Bill value</label>
        <input
          id="bill"
          onChange={(e) => setBill(e.target.value)}
          type="number"
          value={bill}
        />
        <label htmlFor="expense">🧍Your Expense</label>
        <input
          id="expense"
          onChange={(e) => setMyExpense(e.target.value)}
          type="number"
          value={myExpense}
        />
        <label>👫{friends[selected]?.name}'s expense</label>
        <input disabled="true" value={bill - myExpense} />
        <label>🤑Who is paying the bill</label>
        <select
          onChange={(e) => {
            setPersonWhoPays(e.target.value);
          }}
          value={personWhoPays}
        >
          <option value="Me">Me</option>
          <option value={friends[selected]?.name}>
            {friends[selected].name}
          </option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    )
  );
}
