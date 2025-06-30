"use client";
import api from "@/service/api";
import * as React from "react";
import { useEffect } from "react";

import Image from "next/image";
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { products as initialProducts } from "@/lib/placeholder-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, fetchAllProducts , updateProduct} from "@/service/products";
const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  category: z.string().min(1, "Category is required"),
});

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  );
  
  
  const defaultImage = "https://via.placeholder.com/300x300?text=No+Image";

  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      images: [],
    },
  });
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to load products:", err);
        toast({
          title: "Failed to load products",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    loadProducts();
  }, []);

  React.useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        images: editingProduct.images,
      });
    } else {
      form.reset({
        name: "",
        price: 0,
        description: "",
        images: [],
      });
    }
  }, [editingProduct, form]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };


  const handleDelete = async (productId: string) => {
  try {
    await deleteProduct(productId);
    toast({
      title: "✅ Product Deleted",
      description: "The product has been removed.",
    });
    const updated = await fetchAllProducts();
    setProducts(updated);
  } catch (err) {
    toast({
      title: "❌ Delete Failed",
      description: "Could not delete product.",
      variant: "destructive",
    });
  }
};



  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };
 const onSubmit = async (values: z.infer<typeof productSchema>) => {
  setIsLoading(true); // Start loading

  try {
    const payload = {
      Name: values.name,
      Price: values.price,
      Description: values.description,
      ImageURL: values.images[0], // Only first image
      CategoryID: parseInt(values.category),
    };

    if (editingProduct) {
      // ✅ Update existing product
      await updateProduct(editingProduct.id, payload);
      toast({
        title: "✅ Product Updated",
        description: "Product details were updated successfully.",
      });
    } else {
      // ✅ Create new product
      await createProduct(payload);
      toast({
        title: "✅ Product Added",
        description: "Product has been successfully created.",
      });
    }

    const updated = await fetchAllProducts();
    setProducts(updated);
    setIsDialogOpen(false);
    form.reset(); // Clear form
  } catch (error: any) {
    console.error("❌ Error submitting product:", error);
    toast({
      title: "❌ Submission Failed",
      description: error?.response?.data || "An error occurred.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false); // ✅ Always stop loading
  }
};

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Manage your products here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images?.[0] || defaultImage}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProduct(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the details of your product."
                : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Stud</SelectItem>
                        <SelectItem value="2">Jhumka</SelectItem>
                        <SelectItem value="3">Hoop</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.png"
                        value={field.value[0] || ""}
                        onChange={(e) => field.onChange([e.target.value])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
