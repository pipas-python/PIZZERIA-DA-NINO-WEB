import { ImageResponse } from "next/og";

export const alt =
  "Pizzeria Da Nino am Eigerplatz Bern » 031 371 11 31 · Restaurant & Take Away";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #E41F13 0%, #9E120A 52%, #1D1D1B 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "999px",
                background: "#FFFFFF",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "0.14em",
              }}
            >
              PIZZERIA DA NINO · AM EIGERPLATZ BERN
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.16)",
              color: "#F4F4F4",
              letterSpacing: "0.08em",
            }}
          >
            BELPSTRASSE 65 · 3007 BERN · 031 371 11 31
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "960px" }}>
          <div
            style={{
              fontSize: "66px",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Restaurant & Take Away. Klein aber fein.
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#F4F4F4",
            }}
          >
            Pizza-Special Numero Dodici, Signature Pizza Eigerplatz, Stracciatella di Burrata,
            Aperitivo & Pizza alla Nutella in 60 FPS.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "6px solid #FFFFFF",
            fontSize: "18px",
            color: "#F4F4F4",
          }}
        >
          <span>01 · Numero Dodici (CHF 19.00)</span>
          <span>02 · Pizza Eigerplatz (CHF 22.00)</span>
          <span>03 · Pizza alla Nutella (CHF 5.00)</span>
          <span style={{ color: "#FFFFFF", fontWeight: 800 }}>Mo–Fr 11:30–22:30 →</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
