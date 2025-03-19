import styles from './AboutPage.module.css'

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About Pawsome Adoption</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Our Story</h3>
        <p>
          Pawsome Adoption was born from a passion for animal welfare and a desire to make a difference. We believe that
          every pet deserves a loving home, and our platform is dedicated to bringing pets and prospective families
          together in a safe, transparent, and caring environment.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Mission & Vision</h3>
        <p>
          <strong>Mission:</strong> To provide a trustworthy, user-friendly platform that connects pets with families,
          ensuring that every animal finds a loving home.
        </p>
        <p>
          <strong>Vision:</strong> A world where pet adoption is celebrated, and every animal’s journey to a better life
          is supported by a caring community.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Our Values</h3>
        <ul className={styles.list}>
          <li>
            <strong>Compassion:</strong> We care deeply about the wellbeing of every pet.
          </li>
          <li>
            <strong>Integrity:</strong> We operate with honesty and transparency in all our adoption processes.
          </li>
          <li>
            <strong>Community:</strong> We strive to build a supportive community of pet lovers and advocates.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Meet the Team</h3>
        <p>Get to know the dedicated individuals behind Pawsome Adoption through brief bios and photos.</p>
      </section>

      <section>
        <h3 className={styles.sectionHeading}>Future Goals</h3>
        <p>
          We plan to expand our pet profiles, incorporate new features for animal care education, and partner with local
          shelters and rescue organizations to create a better future for all pets.
        </p>
      </section>
    </div>
  )
}

export default AboutPage
