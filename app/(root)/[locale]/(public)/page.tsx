import {
  About,
  Admission,
  Contact,
  Hero,
  InfoBento,
  Location,
  Programme,
} from "@components/Overview";
import Gallery from "@components/Overview/Gallery";

const PublicPage = () => {
  return (
    <>
      <Hero />
      <About />
      <InfoBento />
      {/* <Programme /> */}
      {/* <Admission /> */}
      {/* <Location /> */}
      <Contact />
      {/* <Gallery /> */}
    </>
  );
};

export default PublicPage;
