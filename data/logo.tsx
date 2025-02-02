import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  const color = useColorModeValue('#231f20', '#fff')
  return (
    <chakra.div
      fontSize="4xl"
      fontWeight="bold"
      color={color}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      {...props}
    >
      VVit Solution
    </chakra.div>
  )
}
