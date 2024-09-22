import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.$queryRaw`SELECT 1` // 간단한 쿼리 실행
    res.status(200).json({ message: 'Database connection successful', result })
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error })
  } finally {
    await prisma.$disconnect()
  }
}
