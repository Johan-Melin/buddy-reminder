import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './ContactEditorPage.module.css'

function ContactEditorPage() {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const isEditing = Boolean(contactId)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isEditing) {
      return
    }

    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString() ?? ''
    const relationship = formData.get('relationship')?.toString() ?? ''
    const targetFrequencyDays = Number(
      formData.get('targetFrequencyDays')?.toString(),
    )

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          relationship,
          targetFrequencyDays,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Failed to save contact')
      }

      navigate('/contacts')
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unknown error occurred',
      )
    }
  }

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
        <form className={styles.form} onSubmit={handleSubmit}>
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

          {error ? <p>{error}</p> : null}

          <div>
            <button type="submit">
              {isEditing ? 'Save changes' : 'Add contact'}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate('/contacts')}
            >
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
