"use client"; // For App Router

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use "next/router" for Pages Router
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function AdminLogin() {
  const router = useRouter();
  const toast = useToast(); // For displaying error message

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve admin credentials from environment variables
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdminAuthenticated", "true"); // Store authentication flag
      router.push("/admin"); // Redirect to Admin Page
    } else {
      setError("Invalid Username or Password");
      toast({
        title: "Error",
        description: "Invalid Username or Password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="grey.900">
      <Box
        w={{ base: "full", sm: "400px" }}
        p={6}
        bg="blue.250"
        borderRadius="md"
        boxShadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={4} color="teal.500">
          Admin Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              mt={4}
              isLoading={false}
              loadingText="Logging in"
            >
              Login
            </Button>
          </VStack>
        </form>

        {error && <Text color="red.500" textAlign="center" mt={2}>{error}</Text>}
      </Box>
    </Box>
  );
}
