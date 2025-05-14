// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// const { PrismaClient } = require('@prisma/client')

// // import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
// // use `prisma` in your application to read and write data in your DB

// module.exports=prisma


// src/lib/prisma.js
const { PrismaClient } = require('../generated/prisma')

const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

module.exports = prisma


