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
      aria-label="Sair da plataforma"
      type="button"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2v10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M17.66 6.34a8 8 0 1 1-11.32 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
