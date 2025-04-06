import {
  About,
  Admission,
  Contact,
  Hero,
  Location,
  Programme,
} from "@components/Overview";
import Gallery from "@components/Overview/Gallery";

const OverviewPage = () => {
  return (
    <div className="relative w-full pt-20">
      <Hero />
      <About />
      {/* <Programme /> */}
      {/* <Admission /> */}
      {/* <Location /> */}
      {/* <Contact /> */}
      {/* <Gallery /> */}
    </div>
  );
};

export default OverviewPage;
