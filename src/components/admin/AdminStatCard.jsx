export default function AdminStatCard({ title, value, meta }) {
  return (
    <div className="admin-stat-card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className="meta">{meta}</div>
    </div>
  );
}