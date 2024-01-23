import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AppBar from "@mui/material/AppBar";

export default function OptionalTab() {
  const [value, setValue] = React.useState(0);
  const signedIn = localStorage.getItem("amsSocialSignedIn");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={{ mt: 1 }}>
      <Tabs
        value={value}
        sx={{ background: "#fff" }}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {signedIn === "true" && (
          <Tab
            icon={<AllInboxIcon />}
            color='red'
            iconPosition="start"
            label="For You"
          />
        )}
        <Tab icon={<WhatshotIcon />} iconPosition="start" label="Trending" />
        {signedIn === "true" && (
          <Tab
            icon={<Diversity3Icon />}
            iconPosition="start"
            label="Friend's Post"
          />
        )}
      </Tabs>
    </AppBar>
  );
}
