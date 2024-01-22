import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';

export default function OptionalTab() {
    const [value, setValue] = React.useState(0);
	const signedIn = localStorage.getItem("amsSocialSignedIn");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="static" sx={{mt:1}}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
              {signedIn === "true" && <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="For You" />}  
                <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="Trending" />
                {signedIn === "true" &&  <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="Friend's Post" />}
            </Tabs>
        </AppBar>
    );
}