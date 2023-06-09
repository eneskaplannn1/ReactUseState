export default function Card({ person, index, onSelect }) {
  return (
    <>
      <li>
        <img src={person.image} />
        <h3>{person.name}</h3>
        <p
          className={
            person.balance < 0 ? "red" : person.balance === 0 ? "" : "green"
          }
        >
          {person.balance > 0
            ? `you owe ${person.name} ${person.balance}$`
            : person.balance === 0
            ? `you and ${person.name} are even`
            : `${person.name} owe you ${Math.abs(person.balance)}$ `}
        </p>
        <button className="button" onClick={() => onSelect(index)}>
          Select
        </button>
      </li>
    </>
  );
}
