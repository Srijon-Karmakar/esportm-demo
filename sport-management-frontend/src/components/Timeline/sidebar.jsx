import React from "react";
import "../../pages/Timeline.css";

export default function TimelineSidebar() {
  return (
    <aside className="tl-sidebar">
      <div className="tl-brand">
        <div className="tl-brand-title">Sportbit</div>
        <div className="tl-brand-sub">Timeline</div>
      </div>

      <nav className="tl-nav">
        <button className="tl-nav-item tl-active">
          <span className="tl-bullet" />
          <span>Timeline</span>
        </button>
        <button className="tl-nav-item">
          <span className="tl-bullet" />
          <span>Followers</span>
        </button>
        <button className="tl-nav-item">
          <span className="tl-bullet" />
          <span>Find Skills</span>
        </button>
        <button className="tl-nav-item">
          <span className="tl-bullet" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="tl-profile">
        <span className="tl-bullet" />
        <span>Profile</span>
      </div>
    </aside>
  );
}
