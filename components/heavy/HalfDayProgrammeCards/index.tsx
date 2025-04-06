import InteractiveCard from "@components/basic/InteractiveCard";
import { styles } from "@styles/sharedStyles";

const HalfDayProgrammeCards = () => {
  const halfDayProgramme = [
    {
      title: "Nursery",
      description: "For 3+ years old",
      skills: [
        "Three languages",
        "Reading and introduction to prewriting",
        "Numeracy",
        "Basic shapes and arts",
        "Songs and movements",
        "Sensorial activities",
        "Story telling",
        "Science and Coding",
        "Building confidence",
        "Fine and gross motor skills",
      ],
    },
    {
      title: "Kindergarten 1",
      description: "For 4+ to 5 years old",
      skills: [
        "Three languages, communication and self-expression",
        "Reading and writing",
        "Mathematics",
        "Develop creativity in arts and songs",
        "Story telling",
        "Science and Coding",
        "Building confidence",
        "Fine and gross motor skills",
        "Social competency",
      ],
    },
    {
      title: "Kindergarten 2",
      description: "For 5+ to 6 years old",
      skills: [
        "Three languages, communication and self-expression",
        "Reading and writing",
        "Advance Mathematics",
        "Develop creativity in arts, songs and critical thinking skills",
        "Science and Coding",
        "Develop positive character, independence and build self-confidence",
        "Gross motor skills",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-10">
      {halfDayProgramme.map((prog) => (
        <InteractiveCard
          key={prog.title}
          title={prog.title}
          description={prog.description}
        >
          <div className="mt-3">
            <span className="text-accent font-semibold">
              The curriculum emphasises skills in:
            </span>
            <ul
              className={`${styles.listItemText} flex-wrap mt-2 list-disc space-y-1 w-[180px] h-[280px]`}
            >
              {prog.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </InteractiveCard>
      ))}
    </div>
  );
};

export default HalfDayProgrammeCards;
