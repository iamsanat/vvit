"use client"; // Only needed for App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Spinner,
  useToast,
  HStack,
  Center,
} from "@chakra-ui/react";
import { Br } from "@saas-ui/react";

// Define types for contacts and the response structure
interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  message: string;
}

interface FetchResponse {
  data: Contact[];
  totalPages: number;
}

export default function AdminPage() {
  const router = useRouter();
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (!auth) {
      router.push("/admin/login"); // Redirect if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/contacts?page=${currentPage}&limit=10`);
        const data: FetchResponse = await res.json();
        setContacts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast({
          title: "Error",
          description: "Failed to load contacts.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [currentPage, isAuthenticated]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this entry?");
    if (confirmed) {
      try {
        const res = await fetch("/api/admin/contacts", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();

        if (data.success) {
          // Remove deleted entry from the state
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact._id !== id)
          );
          toast({
            title: "Success",
            description: "Entry deleted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: data.message || "Error deleting entry.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete entry.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) return null; // Prevent rendering until authentication is checked

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="blue.300">
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
         VVit Solutions <Br />
        Admin Dashboard
      </Text>

      <Box width="full" maxWidth="4xl" mt={6}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <>
            <TableContainer bg="white" boxShadow="md" borderRadius="md">
              <Table >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Phone Number</Th>
                    <Th>Message</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contacts.map((contact) => (
                    <Tr key={contact._id} bg="blue.50"> {/* Consistent background color */}
                      <Td color={"black"} >{contact.name}</Td>
                      <Td color={"black"} >{contact.phoneNumber}</Td>
                      <Td color={"black"} >{contact.message}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(contact._id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <HStack mt={6} spacing={4} justify="center">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  colorScheme="blue"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )}
      </Box>

      <Button
        colorScheme="red"
        mt={4}
        onClick={() => {
          localStorage.removeItem("isAdminAuthenticated");
          router.push("/admin/login"); // Logout and redirect
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
