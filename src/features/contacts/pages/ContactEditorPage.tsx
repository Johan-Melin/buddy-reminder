import { useParams } from 'react-router-dom'
import styles from './ContactEditorPage.module.css'

function ContactEditorPage() {
  const { contactId } = useParams()
  const isEditing = Boolean(contactId)

  return (
    <div>
      <header>
        <h1>{isEditing ? 'Edit Contact' : 'Add Contact'}</h1>
        <p>
          {isEditing
            ? 'Update contact details, reminder frequency, or remove the contact.'
            : 'Create a new contact and set a preferred reminder frequency.'}
        </p>
      </header>

      <section>
        <form className={styles.form}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>

          <div>
            <label htmlFor="relationship">Relationship</label>
            <input id="relationship" name="relationship" type="text" />
          </div>

          <div>
            <label htmlFor="targetFrequencyDays">Preferred frequency (days)</label>
            <input
              id="targetFrequencyDays"
              name="targetFrequencyDays"
              type="number"
              min="1"
            />
          </div>

          <div>
            <button type="submit">
              {isEditing ? 'Save changes' : 'Add contact'}
            </button>
            <button type="button" className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </section>

      {isEditing ? (
        <section>
          <h2>Delete Contact</h2>
          <p>Deletion actions will go here.</p>
        </section>
      ) : null}
    </div>
  )
}

export default ContactEditorPage
