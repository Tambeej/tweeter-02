import { Tabs } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <Tabs value={location.pathname} variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="/" component={Link} to="/">
          Home
        </Tabs.Tab>
        <Tabs.Tab value="/profile" component={Link} to="/profile">
          Profile
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
