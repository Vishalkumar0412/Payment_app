import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/utills/constaints";
import { useNavigate } from "react-router";


import Loading from "./Loading";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { useLoadUserQuery } from "@/services/api/authApi";
import { useGetPaginatedTxnsQuery } from "@/services/api/txnApi";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const TransactionTable = () => {
  const [currentUserId, setCurrentUserId] = useState();
  const navigate = useNavigate();
  const { data: userData, isSuccess: userIsSuccess } = useLoadUserQuery();
  const limit=5;


  const [page, setPage] = useState(1);
  const {data,error,isLoading,isSuccess}=useGetPaginatedTxnsQuery({page,limit})

const [transactions,setTransactions]=useState([])

const [totalPages,setTotalpages]=useState(1)
  
  useEffect(() => {
    if (userIsSuccess && userData) {
      setCurrentUserId(userData.user._id);
    }

    if (isSuccess && data) {
      const sortedTransactions = [...data.transactions].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTransactions(sortedTransactions);
      setTotalpages(data.totalPages)
    }
  }, [isSuccess, userIsSuccess, data, userData]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Table className="overflow-auto">
        <TableCaption>Your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Party</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((txn) => {
            const isCredit = txn.to.userId._id === currentUserId;
            const isDebit = txn.from.userId._id === currentUserId;

            if (!isCredit && !isDebit) return null;

            const otherParty = isCredit ? txn.from.userId : txn.to.userId;
            const transactionType = isCredit ? "credit" : "debit";
            const amountColor = isCredit ? "text-green-600" : "text-red-600";
            const amountSign = isCredit ? "+" : "-";

            return (
              <TableRow
                key={txn._id}
                className="hover:bg-blue-100 cursor-pointer"
                onClick={() => navigate(`/transaction/${txn._id}`)}
              >
                <TableCell className="font-medium">
                  {otherParty.firstName} {otherParty.lastName}
                  <div className="text-xs text-muted-foreground md:block hidden">
                    {otherParty.email}
                  </div>
                  <div className="text-xs text-muted-foreground md:hidden block">
                    {formatDateTime(txn.createdAt)}
                  </div>
                </TableCell>
                <TableCell
                  className={`capitalize hidden md:table-cell ${amountColor}`}
                >
                  {transactionType}
                </TableCell>
                <TableCell className="capitalize hidden md:table-cell">
                  {txn.status}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDateTime(txn.createdAt)}
                </TableCell>
                <TableCell
                  className={`text-right text-md font-bold ${amountColor}`}
                >
                  {amountSign} {currency.format(txn.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 3 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default TransactionTable;
