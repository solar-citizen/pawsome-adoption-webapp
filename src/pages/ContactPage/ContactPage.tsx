// FIXME: Move paragraphs and headings to text constants
import styles from './ContactPage.module.css'

function ContactPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get in Touch</h2>
      <p className={styles.intro}>
        We’d love to hear from you! Whether you have questions about our adoption process, need
        support, or want to share your success story, our team is here to help.
      </p>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Contact Information</h3>
        <p>
          <strong>Email:</strong>{' '}
          <a href='mailto:support@pawsomeadoption.com' className={styles.link}>
            support@pawsomeadoption.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong> +1 (800) 123-4567
        </p>
        <p>
          <strong>Address:</strong> 123 Pet Lane, Animal City, PA 12345
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Contact Form</h3>
        <form className={styles.form}>
          <div>
            <label className={styles.label} htmlFor='name'>
              Name
            </label>
            <input type='text' id='name' className={styles.input} placeholder='Your Name' />
          </div>
          <div>
            <label className={styles.label} htmlFor='email'>
              Email
            </label>
            <input type='email' id='email' className={styles.input} placeholder='Your Email' />
          </div>
          <div>
            <label className={styles.label} htmlFor='subject'>
              Subject
            </label>
            <input type='text' id='subject' className={styles.input} placeholder='Subject' />
          </div>
          <div>
            <label className={styles.label} htmlFor='message'>
              Message
            </label>
            <textarea
              id='message'
              className={styles.input}
              rows={5}
              placeholder='Your Message'
            ></textarea>
          </div>
          <button type='submit' className={styles.button}>
            Send Message
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Social Media</h3>
        <p>
          Follow us on{' '}
          <a href='#' className={styles.link}>
            Facebook
          </a>
          ,{' '}
          <a href='#' className={styles.link}>
            Instagram
          </a>
          , and{' '}
          <a href='#' className={styles.link}>
            Twitter
          </a>{' '}
          for the latest updates and adoption success stories.
        </p>
      </section>
    </div>
  )
}

export default ContactPage
