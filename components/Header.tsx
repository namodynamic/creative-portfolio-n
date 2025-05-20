import { createClient } from "@/prismicio";
import NavBar from "./NavBar";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  
  return (
    <header>
      <NavBar settings={settings} />
    </header>
  );
}