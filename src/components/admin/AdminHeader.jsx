export default function AdminHeader({ title, subtitle, onMenuClick }) {
  return (
    <header className="admin-header">
      <div className="admin-header-left" style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        <button className="admin-mobile-toggle" onClick={onMenuClick}>
          ☰
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-badge">NMCN Support Admin</div>
        <div className="admin-avatar">A</div>
      </div>
    </header>
  );
}