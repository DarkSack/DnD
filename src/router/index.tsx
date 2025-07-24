import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Characters from "@/pages/Characters";
import Campaigns from "@/pages/Campaigns";
import CreateCharacter from "@/pages/Characters/CreateCharacter";
import CreateCampaings from "@/pages/Campaings/CreateCampaings";
import DiceGuide from "@/pages/Dices/Index";
import ViewCharacter from "@/pages/Characters/ViewCharacter";
import AuthUser from "@/pages/Auth/AuthUser";
import Chat from "@/pages/Social/Chats";
import Friends from "@/pages/Social/Friends";
import SocialComponents from "@/pages/Social/SocialComponents";
import DungeonMasterComponent from "@/pages/Room/DungeonMasterPanel";
import PlayerUI from "@/pages/Room/PlayerPanel";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<Outlet />} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "characters",
        element: <Characters />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "characters/create",
        element: <CreateCharacter />,
      },
      {
        path: "campaigns/create",
        element: <CreateCampaings />,
      },
      {
        path: "dices",
        element: <DiceGuide />,
      },
      {
        path: "characters/view/:id",
        element: <ViewCharacter />,
      },
      {
        path: "auth",
        element: <AuthUser />,
      },
      {
        path: "social/chats",
        element: <Chat />
      },
      {
        path: "social/friends",
        element: <Friends />
      },
      {
        path: "social/social",
        element: <SocialComponents />
      },
      {
        path: "room",
        element: <DungeonMasterComponent />
      },
      {
        path: "room/player",
        element: <PlayerUI />
      },

      {
        path: "settings",
        element: <Settings />
      }
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
