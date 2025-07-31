
function Card({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-info">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
}

export default Card;

