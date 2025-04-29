// FIXME: Move paragraphs and headings to text constants
import styles from './AdoptionsPage.module.css';

function AdoptionsPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find Your Furry Friend Today!</h2>
      <p className={styles.intro}>
        Welcome to Pawsome Adoption! Our mission is to connect loving families with pets in need of
        a forever home. Browse our selection of adorable dogs, cats, and other small animals that
        are eagerly waiting for a chance to be a part of your life.
      </p>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Featured Pets</h3>
        <p className={styles.sectionText}>
          Display a grid of adoptable pets, each with a photo, name, breed, and a brief description.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Buddy</strong> – A playful Golden Retriever who loves fetch.
          </li>
          <li>
            <strong>Luna</strong> – A gentle tabby cat that loves cuddles.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Adoption Process</h3>
        <ol className={styles.orderedList}>
          <li>
            <strong>Search:</strong> Browse our available pets.
          </li>
          <li>
            <strong>Apply:</strong> Fill out our adoption form.
          </li>
          <li>
            <strong>Meet:</strong> Schedule a visit to meet your potential new family member.
          </li>
          <li>
            <strong>Adopt:</strong> Bring home your new best friend!
          </li>
        </ol>
      </section>

      <section>
        <h3 className={styles.sectionHeading}>Success Stories</h3>
        <p>
          “Adopting Max was the best decision we ever made – he brought joy and laughter into our
          home.” - <span className={styles.storyOwner}>Bruce Wayne</span>
        </p>

        <p>
          “Adopting Max was the best decision we ever made – he brought joy and laughter into our
          home.” - <span className={styles.storyOwner}>Mark Joker</span>
        </p>
      </section>
    </div>
  );
}

export default AdoptionsPage;
