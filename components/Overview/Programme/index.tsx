import dynamic from "next/dynamic";
import { Collapse, CollapseProps } from "antd";
import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";
import "./Programme.css";

const HalfDayProgrammeCards = dynamic(
  () => import("@components/heavy/HalfDayProgrammeCards")
);

const Programme = () => {
  const subjects = [
    "Languages: BM, Mandarin & English",
    "Practical Life & Sensorial Activities",
    "Mathematics",
    "Art and Craft",
    "Music and Movement",
    "Character Building",
    "Physical Education",
    "Story Telling",
    "Science",
    "Coding",
    "Brain Gym",
    "Field trips",
    "Right brain stimulation",
  ];

  const subjectCollapseItems: CollapseProps["items"] = [
    {
      key: 1,
      label: (
        <h4
          className={`flex items-center ${styles.collapseItemTitleText} hover:text-textDefault`}
        >
          We Offer
        </h4>
      ),
      children: (
        <ul className={`${styles.withinSectionSubText} italic`}>
          {subjects.map((subject) => (
            <li key={subject}>* {subject}</li>
          ))}
        </ul>
      ),
    },
  ];

  const fullDay = [
    {
      title: "Tuition",
      description:
        "We offer tuition classes to children who need extra attention from our teachers. Our classes are designed to help children to improve their academic skills and prepare them for success in future studies. We offer various subjects including Bahasa Melayu, English, Chinese, and Mathematics.",
      time: "Weekdays from 12:30 p.m. to 2:30 p.m.",
      ageGroup: "Age 3+ to 6 years old",
    },
    {
      title: "Kids Interactive Programme (KIP)",
      description:
        "We offer one-stop-solution service for working parents. KIP provides homework coaching, tuition classes for all subjects including 3 languages spelling, lunch, snack, and supervised playtime. Small group with our dedicated teachers. Cultivating positive learning attitude and character building.",
      time: "Weekdays from 8:00 a.m. to 5:30 p.m.",
      ageGroup: "Age 3+ to 6 years old",
    },
    {
      title: "Speech and Drama class (optional)",
      description:
        "Speech and drama classes focus on the art of performance and expression. Children explore various aspects of theatrical arts, including singing, acting, and stage performance. Classes conducted by experienced teacher who teach at the international schools and preschools.",
      time: "Every Wednesday (4 times a month) with a duration of 1 hour each session",
      ageGroup: "Age 3+ to 6 years old",
    },
  ];

  const fullDayCollapseItems: CollapseProps["items"] = fullDay.map(
    (prog, index) => ({
      key: index,
      label: (
        <h4
          className={`flex items-center ${styles.collapseItemTitleText} hover:text-textDefault`}
        >
          {prog.title}
        </h4>
      ),
      children: (
        <div className="flex flex-col gap-5">
          <div className={`${styles.withinSectionSubText} flex flex-col gap-2`}>
            <div className="px-4 py-1 border border-accent text-center">
              <span className={`blue-pink-text-gradient font-bold`}>
                Description
              </span>
            </div>
            <span>{prog.description}</span>
          </div>

          <div className={`${styles.withinSectionSubText} flex flex-col gap-2`}>
            <div className="px-4 py-1 border border-accent text-center">
              <span className={`blue-pink-text-gradient font-bold`}>Time</span>
            </div>
            <span>{prog.time}</span>
          </div>

          <div className={`${styles.withinSectionSubText} flex flex-col gap-2`}>
            <div className="px-4 py-1 border border-accent text-center">
              <span className={`blue-pink-text-gradient font-bold`}>
                Age Group
              </span>
            </div>
            <span>{prog.ageGroup}</span>
          </div>
        </div>
      ),
    })
  );

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>WHAT WE DO</p>
        <h2 className={styles.sectionHeadText}>Our Programme.</h2>
      </div>

      <div className="flex flex-col w-fit">
        <p className={`${styles.withinSectionSubText} mt-3`}>
          TDJ adopts National Curriculum, Montessori, Multiple Intelligences,
          Thematic, and Digital literacy in our teachings. We respect the
          children&apos;s need for learning through concrete and hands-on
          experiences. Our classrooms are well equipped with educational
          materials to engage the children&apos;s interest in learning.
        </p>

        <Collapse
          items={subjectCollapseItems}
          style={{ marginTop: "2rem", maxWidth: "48rem" }}
        />
      </div>

      <h2 className={styles.withinSectionHeadText}>Half Day Programme</h2>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        Our half day programme is for students from age 3+ to 6. Our experienced
        educators provide a nurturing and stimulating environment that fosters
        the growth and development of young children.
        <br />
        <br />
        There are two sessions available:
      </p>

      <div className="flex flex-col justify-start gap-3 my-5 w-full">
        <div
          className={`${styles.withinSectionSubText} flex flex-row gap-2 items-center`}
        >
          <span
            className={`blue-pink-text-gradient font-bold px-4 py-1 border border-accent text-center`}
          >
            Morning Session
          </span>
          <span>8:00 a.m. to 12:00 noon</span>
        </div>
        <div
          className={`${styles.withinSectionSubText} flex flex-row gap-2 items-center`}
        >
          <span
            className={`blue-pink-text-gradient font-bold px-2 py-1 border border-accent text-center`}
          >
            Afternoon Session
          </span>
          <span>12:30 p.m. to 4:30 p.m.</span>
        </div>
      </div>

      <p className={`${styles.withinSectionSubText} mt-10`}>
        Below are curriculum that each student within their age group will have:
      </p>

      <HalfDayProgrammeCards />

      <h2 className={styles.withinSectionHeadText}>
        Full Day and Enrichment Programmes
      </h2>
      <p className={`${styles.withinSectionSubText} mt-3`}>
        We offer full day services to our preschool children. Our KIP service
        includes homework coaching, tuition classes, character building,
        conversations, games and other activities. We also have speech and drama
        classes for children who wish to develop their talents in acting.
      </p>
      <p className={`${styles.withinSectionSubText} mt-10`}>
        Below are the programmes that we offer:
      </p>
      <Collapse
        items={fullDayCollapseItems}
        style={{ marginTop: "2rem", maxWidth: "48rem" }}
      />
    </>
  );
};

export default SectionWrapper(Programme, "programme");
