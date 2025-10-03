import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import "./CSS/card.css";
import "./CSS/message.css";
import "./CSS/House.css";

const Press_Start = Press_Start_2P({
  variable: "--font-start",
  weight: ["400"],   // Vikt måste anges som array av strängar
})

const VT = VT323({
  variable: "--font-vt323",
  weight: ["400"],   // Även här, måste vara array
})

export const metadata = {
  title: "Portfolio | Arvid Ålund",
  description: "Portfolio för Arvid Ålund",
  icons: {
    icon: "/favicon/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className={`${Press_Start.variable} ${VT.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
