/* eslint-disable no-unused-vars */
import { HomePage } from "./pages/HomePage";
import { PokemonPage } from "./pages/PokemonPage";
import { usePage } from "./hooks/usePage";
import { useEffect, useState } from "react";
import { sendToDevvit } from "./utils";
import { useDevvitListener } from "./hooks/useDevvitListener";
import { Layout } from "./components/layout";

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
  const [layoutVariant, setLayoutVariant] = useState("default");

  useEffect(() => {
    sendToDevvit({ type: "INIT" });
  }, []);

  useEffect(() => {
    if (initData) {
      setPostId(initData.postId);
    }
  }, [initData, setPostId]);

  return <Layout variant={layoutVariant}>{getPage(page, { postId })}</Layout>;
};
