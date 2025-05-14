// import Image from "next/image";

// export default function Home() {
//   return (
//    <div>
//     <h3>Home Page</h3>
//    </div>
//   );
// }



// app/page.tsx or pages/index.tsx
'use client' // App Router

import { useState, useEffect } from 'react'

export default function Home() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', email: '' })

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = async () => {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
    setForm({ name: '', email: '' })
    const res = await fetch('/api/users')
    setUsers(await res.json())
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>

      <div className="mt-4 ">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-1 mr-2"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1">
          Add
        </button>
      </div>
    </div>
  )
}
