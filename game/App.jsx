import { HomePage } from "./pages/HomePage";
import { PokemonPage } from "./pages/PokemonPage";
import { usePage } from "./hooks/usePage";
import { useEffect, useState } from "react";
import { sendToDevvit } from "./utils";
import { useDevvitListener } from "./hooks/useDevvitListener";

const getPage = (page, { postId }) => {
  switch (page) {
    case "home":
      return <HomePage postId={postId} />;
    case "pokemon":
      return <PokemonPage />;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
};

export const App = () => {
  const [postId, setPostId] = useState("");
  const page = usePage();
  const initData = useDevvitListener("INIT_RESPONSE");
  useEffect(() => {
    sendToDevvit({ type: "INIT" });
  }, []);

  useEffect(() => {
    if (initData) {
      setPostId(initData.postId);
    }
  }, [initData, setPostId]);

  return <div className="h-full">{getPage(page, { postId })}</div>;
};
