/** @jsx jsx */
import { jsx } from "theme-ui";
import VocabularyView from "./views/VocabularyView";
import React from "react";
import Navbar from "./components/Navbar";
import { ReactComponent as HiraganaIcon } from "./images/hiragana.svg";
import { ReactComponent as StarIcon } from "./images/star.svg";
import NavbarIcon from "./components/NavbarIcon";
import { StoreProvider } from "./store/StoreProvider";
import GameView from "./views/GameView";

const App = () => {
  const views = [
    {
      iconComponent: HiraganaIcon,
      viewComponent: VocabularyView,
      title: "Vocabulary",
      slug: "editor",
      default: true,
    },
    {
      iconComponent: StarIcon,
      viewComponent: GameView,
      title: "Quiz",
      slug: "games",
    },
  ] as {
    iconComponent: React.FunctionComponent;
    viewComponent: React.FunctionComponent;
    title: string;
    slug: string;
    default?: boolean;
  }[];
  const [activeView, setActiveView] = React.useState(
    views.find((view) => view.default)!.slug
  );
  return (
    <StoreProvider>
      <div
        sx={{
          display: "flex",
          flexDirection: ["column", "column", "row-reverse"],
          height: "100%",
        }}
      >
        <div sx={{ flexGrow: 1, overflowY: "auto" }}>
          {views.map((view) => (
            <div
              key={view.slug}
              sx={{
                display: view.slug === activeView ? "flex" : "none",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <view.viewComponent />
            </div>
          ))}
        </div>
        {
          <Navbar>
            {views.map((view) => (
              <NavbarIcon
                key={view.slug}
                title={view.title}
                view={view.slug}
                iconFunction={view.iconComponent}
                activeView={activeView}
                setActiveView={setActiveView}
              />
            ))}
          </Navbar>
        }
      </div>
    </StoreProvider>
  );
};

export default App;
