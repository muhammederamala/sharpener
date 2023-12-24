import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

function Sidebar({ unread }) {
  return (
    <div className="sidebar">
      <span>
        <strong>{`Unread (${unread})`}</strong>
      </span>
      <Link className="mt-3" to="/send-mail">
        Compose
      </Link>
      <Link className="mt-1" to="/">
        Inbox
      </Link>
      <Link className="mt-1" to="/sent">
        Sent
      </Link>
    </div>
  );
}

export default Sidebar;
