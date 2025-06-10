import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { currency } from "@/utills/constaints"
import { useNavigate } from "react-router"

const currentUserId = "68481e7d075708b357a68607" // logged-in user ID
const transactions = [
    {
    _id: "684820d6075708b357a68631",
    from: {
        userId: {
            _id: "68481e7d075708b357a68607",
            email: "vishal@gmai.com",
        firstName: "vishal",
        lastName: "nigam"
      }
    },
    to: {
      userId: {
        _id: "6846c781330972436c98735f",
        email: "vishal@gmail.com",
        firstName: "ajay",
        lastName: "kumar"
      }
    },
    amount: 100,
    status: "completed",
    createdAt: "2025-06-10T12:11:02.720Z"
  },
  {
    _id: "684820d3075708b357a68621",
    from: {
      userId: {
        _id: "6846c781330972436c98735f",
        email: "vishal@gmail.com",
        firstName: "vishal",
        lastName: "kumar"
      }
    },
    to: {
      userId: {
        _id: "68481e7d075708b357a68607",
        email: "vishal@gmai.com",
        firstName: "vishal",
        lastName: "nigam"
    }
},
    amount: 150,
    status: "completed",
    createdAt: "2025-06-10T12:10:59.408Z"
}
]

const formatDateTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  })
}

const TransactionTable = () => {
    const navigate=useNavigate()
  return (
    <Table className="overflow-auto">
      <TableCaption>Your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Party</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
         
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((txn) => {
          const isCredit = txn.to.userId._id === currentUserId
          const isDebit = txn.from.userId._id === currentUserId

          if (!isCredit && !isDebit) return null

          const otherParty = isCredit ? txn.from.userId : txn.to.userId
          const transactionType = isCredit ? "credit" : "debit"
          const amountColor = isCredit ? "text-green-600" : "text-red-600"
          const amountSign = isCredit ? "+" : "-"

          return (
            <TableRow key={txn._id} className='hover:bg-blue-100 ' onClick={()=>navigate(`/transaction/${txn._id}`)}>
              <TableCell className="font-medium">
                {otherParty.firstName} {otherParty.lastName}
                <div className="text-xs text-muted-foreground">{otherParty.email}</div>
              </TableCell>
              <TableCell className={`capitalize ${amountColor}`}>{transactionType}</TableCell>
              <TableCell className="capitalize">{txn.status}</TableCell>
              <TableCell>{formatDateTime(txn.createdAt)}</TableCell>
              
              <TableCell className={`text-right text-md font-bold ${amountColor}`}>
                {amountSign} {currency.format(txn.amount)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionTable
