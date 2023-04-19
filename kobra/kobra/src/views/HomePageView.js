import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import AuthenticationView from "./AuthenticationView";
import MarketPlaceView from "./MarketPlaceView";
import AccountView from "./AccountView";
import KobraView from "./KobraView";
import { InboxView } from "./InboxView";
import PackageView from "./PackageView";
import useAuthenticationViewModel from "../viewModels/useAuthenticationViewModel";

export default function HomePageView() {
  const [selectedTab, setSelectedTab] = useState(2);
  const authViewModel = useAuthenticationViewModel();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authViewModel.isAuthenticated);
  }, [authViewModel.isAuthenticated]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      {isAuthenticated ? (
        <React.Fragment>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Market Place" />
            <Tab label="Account" />
            <Tab label="Kobra" />
            <Tab label="Inbox" />
            <Tab label="Package" />
          </Tabs>
          {selectedTab === 0 && <MarketPlaceView />}
          {selectedTab === 1 && <AccountView />}
          {selectedTab === 2 && <KobraView />}
          {selectedTab === 3 && <InboxView />}
          {selectedTab === 4 && <PackageView />}
        </React.Fragment>
      ) : (
        <AuthenticationView />
      )}
    </Box>
  );
}
