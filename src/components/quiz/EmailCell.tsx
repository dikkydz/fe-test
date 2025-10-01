import React, { useMemo } from "react";

export type EmailCellProps = {
  emails: string[];
  width: number;
};

function measureTextWidth(text: string, font = "14px system-ui"): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(text).width;
}

export const EmailCell: React.FC<EmailCellProps> = ({ emails, width }) => {
  // handle edge case kosong / hanya string kosong
  const normalized = emails.filter((e) => e && e.trim().length > 0);
  if (normalized.length === 0) return <span>–</span>;

  const font = "14px system-ui";
  const separator = ", ";

  const { visibleEmails, hiddenCount } = useMemo(() => {
    let used = 0;
    const visible: string[] = [];

    for (let i = 0; i < normalized.length; i++) {
      const email = normalized[i];
      const emailW = measureTextWidth(email, font);
      const sepW = i > 0 ? measureTextWidth(separator, font) : 0;

      if (used + sepW + emailW <= width) {
        used += sepW + emailW;
        visible.push(email);
      } else {
        break;
      }
    }

    return {
      visibleEmails: visible,
      hiddenCount: normalized.length - visible.length,
    };
  }, [normalized, width]);

  // case: hanya satu email muat
  if (visibleEmails.length === 1) {
    const first = visibleEmails[0];
    return (
      <div className="email-cell" style={{ display: "flex", gap: 4, overflow: "hidden" }}>
        <span
          className="email-ellipsis"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {first}
        </span>
        {hiddenCount > 0 && (
          <span
            className="email-badge"
            title={normalized.join(", ")}
            aria-label={`${hiddenCount} more emails: ${normalized.join(", ")}`}
          >
            +{hiddenCount}
          </span>
        )}
      </div>
    );
  }

  // case: >= 2 email muat
  return (
    <div className="email-cell" style={{ display: "flex", gap: 4, overflow: "hidden" }}>
      <span>{visibleEmails.join(", ")}</span>
      {hiddenCount > 0 && (
        <span
          className="email-badge"
          title={normalized.join(", ")}
          aria-label={`${hiddenCount} more emails: ${normalized.join(", ")}`}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
