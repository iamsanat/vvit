import { useState, forwardRef } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";

import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'

import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'

export const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setIsSuccess(true); // Set success
      } else {
        setResponseMessage(`${data.error}`);
        setIsSuccess(false); // Set failure
      }
    } catch (error) {
      setResponseMessage("Error: " + error);
      setIsSuccess(false); // Set failure on catch
    }

    setLoading(false);
  };

  return (
    <Container color={useColorModeValue("black", "white")} ref={ref} id="contact-section" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                        +91-9820476747
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        dipakpawar@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                        VVit Solutions shop no:-5<br/> landmark apt, Satara 415002
                      </Button>
                    </VStack>
                  </Box>
                  
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange} 
                            size="md" 
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="phoneNumber">
                        <FormLabel>Phone Number</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdPhone color="gray.800" />
                          </InputLeftElement>
                          <Input 
                            type="tel" 
                            name="phoneNumber" 
                            value={formData.phoneNumber}
                            onChange={handleChange} 
                            size="md" 
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          borderColor="gray.300"
                          _hover={{ borderColor: 'gray.300' }}
                          placeholder="Your message"
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button 
                          variant="solid" 
                          bg="#0D74FF" 
                          color="white" 
                          _hover={{}} 
                          onClick={handleSubmit}
                          isLoading={loading}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
          {responseMessage && (
            <Text mt={3} color={isSuccess ? "green.500" : "red.500"}>
              {responseMessage}
            </Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
});

export default Contact;
