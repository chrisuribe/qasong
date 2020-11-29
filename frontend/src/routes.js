import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const SearchResults = React.lazy(() =>
  import("./components/SearchResults/SearchResults")
);
const HomeScreen = React.lazy(() => import("./components/HomeScreen/HomeScreen"));
const AppBar = React.lazy(() => import("./components/AppBar/AppBar"));
const QueueSection = React.lazy(() => import("./components/QueueSection/QueueSection"));
const BillboardTop100 = React.lazy(() =>
  import("./components/BillboardTop100/BillboardTop100")
);
import NotFound from "./components/NotFound/NotFound";

function Routes({
  addSongToQueue,
  darkMode,
  handleSubmitVideoSearch,
  isLoading,
  nowPlaying,
  queue,
  setDarkMode,
  searchTableViewMode,
  searchResults,
  setNowPlaying,
  setQueue,
  setSearchTableViewMode,
  setShowAboutUs,
  showAboutUs,
}) {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <AppBar
          {...{
            darkMode,
            handleSubmitVideoSearch,
            isLoading,
            queue,
            setDarkMode,
            showAboutUs,
            setShowAboutUs,
          }}
        />
      </Suspense>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          {/* billboard top 100 */}
          <Route path="/billboard">
            <Suspense fallback={<div />}>
              <BillboardTop100 />
            </Suspense>
          </Route>

          {/* search */}
          <Route path="/search">
            <Suspense fallback={<div />}>
              <SearchResults
                {...{
                  nowPlaying,
                  queue,
                  setNowPlaying,
                  searchTableViewMode,
                  setQueue,
                  searchResults,
                  setSearchTableViewMode,
                }}
              />
            </Suspense>
          </Route>

          {/* queue */}
          <Route path="/queue">
            <Suspense fallback={<div />}>
              <QueueSection
                {...{
                  nowPlaying,
                  queue,
                  setNowPlaying,
                  setQueue,
                }}
              />
            </Suspense>
          </Route>

          {/* landing page */}
          <Route exact path="/">
            <Suspense fallback={<div />}>
              <HomeScreen
                {...{
                  setQueue,
                  setNowPlaying,
                  nowPlaying,
                  isLoading,
                  queue,
                  addSongToQueue,
                  showAboutUs,
                  setShowAboutUs,
                }}
              />
            </Suspense>
          </Route>

          {/* 404 page */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
