

'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  emailVerified: string | null
  accounts: {
    id: string
    provider: string
    type: string
  }[]
  sessions: {
    id: string
    expires: string
  }[]
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    setName('')
    setEmail('')
    fetchUsers()
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Users</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 bg-white/25"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2 bg-white/25"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="border rounded p-4 bg-white/25">
              <p><strong>Name:</strong> {user.name ?? 'N/A'}</p>
              <p><strong>Email:</strong> {user.email ?? 'N/A'}</p>
              {/* <p><strong>Accounts:</strong> {user.accounts.length}</p> */}
              {/* <ul className="ml-4 list-disc">
                {user.accounts.map(acc => (
                  <li key={acc.id}>
                    {acc.provider} ({acc.type})
                  </li>
                ))}
              </ul> */}
              {/* <p><strong>Sessions:</strong> {user.sessions.length}</p>
              <ul className="ml-4 list-disc">
                {user.sessions.map(sess => (
                  <li key={sess.id}>Expires: {new Date(sess.expires).toLocaleString()}</li>
                ))}
              </ul> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}




