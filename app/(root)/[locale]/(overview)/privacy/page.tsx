import SectionWrapper from "@components/basic/SectionWrapper";

import { styles } from "@styles/sharedStyles";

const PrivacyPage = () => {
  return (
    <>
      <h1 className={styles.heroHeadText}>Privacy Policy</h1>
      <br />
      <p className={styles.withinSectionSubText}>
        NeuroAcura (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides
        this Privacy Policy to inform you of our policies and procedures
        regarding the collection, use and disclosure of personal information we
        may receive from users of our website (“Site”), accessible from
        https://www.neuroacura.com, and any other services offered by us in
        connection with our site (any and all of the foregoing the
        &quot;Services&quot;).
      </p>
      <br />
      <p className={styles.withinSectionSubText}>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us at
        tadikadesajaya@gmail.com.
      </p>
      <br />
      <p className={styles.withinSectionSubText}>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in NeuroAcura. This policy is not applicable to
        any information collected offline or via channels other than this
        website. Consent By using our website, you hereby consent to our Privacy
        Policy and agree to its terms.
      </p>

      <h2 className={styles.withinSectionHeadText}>Consent</h2>
      <p className={styles.withinSectionSubText}>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>

      <h2 className={styles.withinSectionHeadText}>Cookies and Web Beacons</h2>
      <p className={styles.withinSectionSubText}>
        Like any other website, NeuroAcura uses &quot;cookies&quot;. These
        cookies are used to store information including visitors&apos;
        preferences, and the pages on the website that the visitor accessed or
        visited. The information is used to optimize the users&apos; experience
        by customizing our web page content based on visitors&apos; browser type
        and/or other information.
      </p>

      <h2 className={styles.withinSectionHeadText}>Links to Other Sites</h2>
      <p className={styles.withinSectionSubText}>
        Our services may contain links to other websites, applications, and
        online services. If you choose to visit a third party service or click
        on another third party link, you will be directed to that third
        party&apos;s website, application, or online service. The fact that we
        link to a website, content is not an endorsement, authorization or
        representation of our affiliation with that third party, nor is it an
        endorsement of their privacy or information security policies or
        practices. We do not exercise control over third party websites or
        services.
      </p>

      <h2 className={styles.withinSectionHeadText}>
        Changes to This Privacy Policy
      </h2>
      <p className={styles.withinSectionSubText}>
        This Privacy Policy may be revised periodically, and this will be
        reflected by a &quot;Last modified&quot; date below. Thus, we advise you
        to review this page periodically for any changes. We will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately, after they are posted on this page.
      </p>

      <h2 className={styles.withinSectionHeadText}>Contact Information</h2>
      <p className={styles.withinSectionSubText}>
        Please contact us with any questions or comments about this Privacy
        Policy, Our Privacy Policy Toward Children, your personal information,
        and our third-party disclosure practices, at tcmweikang@gmail.com.
      </p>

      <br />
      <br />
      <p className={`${styles.withinSectionSubText} italic`}>
        Last modified: 06/04/2025
      </p>
    </>
  );
};

export default SectionWrapper(PrivacyPage, "privacy");
