import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f2545",
          backgroundImage:
            "radial-gradient(circle at 50% 8%, rgba(212,175,114,0.28), rgba(15,37,69,0) 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          <span>Estate</span>
          <span style={{ color: "#d4af72" }}>Resolve</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1,
          }}
        >
          Professional Estate Financial Search Services
        </div>
      </div>
    ),
    { ...size },
  );
}
