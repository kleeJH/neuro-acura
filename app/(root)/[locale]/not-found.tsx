import dynamic from "next/dynamic";
import Navigation from "@components/Navigation";

const NotFound = dynamic(() => import("@components/NotFound"));

const NotFoundPage = () => {
  return (
    <>
      <Navigation bgType="transparent" hasNavLinks={false} />
      <NotFound type="notfound" />
    </>
  );
};

export default NotFoundPage;
