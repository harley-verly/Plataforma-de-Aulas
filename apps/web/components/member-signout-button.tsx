"use client";

import { clearDemoSession } from "../lib/demo-session";

export function MemberSignOutButton() {
  return (
    <button
      className="member-power-button"
      onClick={() => {
        clearDemoSession();
        window.location.assign("/");
      }}
      type="button"
    >
      Sair
    </button>
  );
}
