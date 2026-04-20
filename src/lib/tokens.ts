export const tokens = {
  color: {
    bgDark: "#0A0A0B",
    bgLight: "#FFFFFF",
    fgOnDark: "#FFFFFF",
    fgOnLight: "#0A0A0B",
    fgMutedOnDark: "rgba(255,255,255,0.64)",
    fgMutedOnLight: "rgba(10,10,11,0.64)",
    accent: "#A51C30",
    accentOnDark: "#F28B94",
    accentSoft: "rgba(165,28,48,0.12)",
    borderOnDark: "rgba(255,255,255,0.08)",
    borderOnLight: "rgba(10,10,11,0.08)",
  },
  motion: {
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    revealDuration: 0.6,
    revealStagger: 0.08,
  },
  layout: { maxWidth: 1200 },
} as const;
