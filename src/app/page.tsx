// import Image from "next/image";

// export default function Home() {
//   return (
//    <div>
//     <h3>Home Page</h3>
//    </div>
//   );
// }



// app/page.tsx or pages/index.tsx
// 'use client' // App Router

// import { useState, useEffect } from 'react'

// export default function Home() {
//   const [users, setUsers] = useState([])
//   const [form, setForm] = useState({ name: '', email: '' })

//   useEffect(() => {
//     fetch('/api/users')
//       .then(res => res.json())
//       .then(data => setUsers(data))
//   }, [])

//   const handleSubmit = async () => {
//     await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify(form),
//       headers: { 'Content-Type': 'application/json' },
//     })
//     setForm({ name: '', email: '' })
//     const res = await fetch('/api/users')
//     setUsers(await res.json())
//   }

//   return (
//     <div className="p-4 flex flex-col gap-4 items-center justify-center ">
//       <h1 className="text-xl font-bold mb-2">Users</h1>
//       <ul>
//         {users.map((u: any) => (
//           <li key={u.id}>{u.name} - {u.email}</li>
//         ))}
//       </ul>

//       <div className="mt-4 ">
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           className="border p-1 mr-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           className="border p-1 mr-2"
//         />
//         <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1">
//           Add
//         </button>
//       </div>
//     </div>
//   )
// }


// src/app/users/page.tsx
// 'use client'

// import { useEffect, useState } from 'react'

// type User = {
//   id: string
//   name: string | null
//   email: string | null
//   image: string | null
//   emailVerified: string | null
//   accounts: {
//     id: string
//     provider: string
//     type: string
//   }[]
//   sessions: {
//     id: string
//     expires: string
//   }[]
// }

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>([])

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await fetch('/api/users')
//       const data = await res.json()
//       setUsers(data)
//     }

//     fetchUsers()
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Users</h1>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {users.map(user => (
//             <li key={user.id} className="border rounded p-4">
//               <p><strong>Name:</strong> {user.name ?? 'N/A'}</p>
//               <p><strong>Email:</strong> {user.email ?? 'N/A'}</p>
//               <p><strong>Accounts:</strong> {user.accounts.length}</p>
//               <ul className="ml-4 list-disc">
//                 {user.accounts.map(acc => (
//                   <li key={acc.id}>
//                     {acc.provider} ({acc.type})
//                   </li>
//                 ))}
//               </ul>
//               <p><strong>Sessions:</strong> {user.sessions.length}</p>
//               <ul className="ml-4 list-disc">
//                 {user.sessions.map(sess => (
//                   <li key={sess.id}>Expires: {new Date(sess.expires).toLocaleString()}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }



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




