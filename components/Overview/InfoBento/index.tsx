import SectionWrapper from "@components/basic/SectionWrapper";
import { Box, Card, Grid } from "@radix-ui/themes";

import { styles } from "@styles/sharedStyles";
import Image from "next/image";

const InfoBento = () => {
  const infoBentoPictures = [
    "/assets/images/info-bento/info1.jpg",
    "/assets/images/info-bento/info2.jpg",
    "/assets/images/info-bento/info3.jpg",
    "/assets/images/info-bento/info4.jpg",
  ];
  return (
    <>
      <div className="mb-10">
        <p className={styles.sectionSubText}>INFO</p>
        <h2 className={styles.sectionHeadText}>Information.</h2>
      </div>

      <Grid
        columns={{ initial: "1", xs: "1", sm: "1", md: "2" }}
        gap="4"
        rows="auto"
        width="auto"
        justify="center"
      >
        {infoBentoPictures.map((pic, index) => (
          <Box key={index}>
            <Card
              asChild
              variant="classic"
              size="4"
              style={{ boxShadow: "var(--shadow-3)" }}
            >
              <Image
                src={pic}
                alt={`Info Picture ${index}`}
                width={700}
                height={700}
              />
            </Card>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default SectionWrapper(InfoBento, "info-bento");
