"use client"

import * as React from 'react';
import { MoreHorizontal } from "lucide-react";
import type { Order } from "@/lib/types";
import { orders as initialOrders } from "@/lib/placeholder-data";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(initialOrders);
  const { toast } = useToast();

  const handleStatusChange = (orderId: string, field: 'paymentStatus' | 'fulfillmentStatus', value: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, [field]: value } : order
    ));
    toast({ title: "Order Updated", description: `Order ${orderId} status has been changed.` });
  };
  
  const getPaymentStatusVariant = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'Paid': return 'default';
      case 'Pending': return 'secondary';
      case 'Failed': return 'destructive';
      default: return 'outline';
    }
  };
  
  const getFulfillmentStatusVariant = (status: Order['fulfillmentStatus']) => {
    switch (status) {
      case 'Fulfilled': return 'default';
      case 'Processing': return 'secondary';
      case 'Unfulfilled': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>A list of all the orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                 <TableCell>
                  <Badge variant={getFulfillmentStatusVariant(order.fulfillmentStatus)}>
                    {order.fulfillmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Order Details</DropdownMenuItem>
                      <DropdownMenuItem>View Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
