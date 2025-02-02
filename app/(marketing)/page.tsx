'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'
import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Features } from '#components/features'
import { Contact } from '#components/Contact'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'
import { useRef } from 'react'

export const meta: Metadata = {
  title: 'Laptop & Printer Repairing Shop in Satara',
  description: 'Best Laptop Repairing Shop In Satara',
}

const Home: NextPage = () => {
  const contactRef = useRef<HTMLDivElement | null>(null);
  return (
    <Box>
      <HeroSection contactRef={contactRef}/>

      <HighlightsSection />

      {/* <FeaturesSection /> */}

      {/* <TestimonialsSection /> */}

      <FaqSection />

      {/* <PricingSection /> */}

      <Contact ref={contactRef} />
      
    </Box>
  )
}

const HeroSection: React.FC<{ contactRef: React.RefObject<HTMLDivElement> }> = ({ contactRef }) => {
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Expert Hardware &
                <Br /> software solution <Br /> In Satara
              </FallInPlace>
            }
            description={
              <FallInPlace fontWeight="medium">
                With over 30 years of experience, we specialize in repairing and selling laptops, printers, monitors, and CPUs. Whether you need a quick fix or a brand-new device, we offer high-quality services at affordable rates, ensuring you get the best value for your money.
              </FallInPlace>
            }
          >
            <FallInPlace >
              <br></br>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink onClick={scrollToContact} colorScheme="primary" size="lg" href="#Contact">
                  Contact Us
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="https://maps.app.goo.gl/jM48U6w1D4H1xBRz7"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  Get Location
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace >
              <Box overflow="hidden" height="100%">
                <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Image
                  src="/static/screenshots/list.png"
                  width={1200}
                  height={762}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                />
                </div>
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Quality Laptops & Printer at the Best Prices',
            icon: FiSmile,
            description: 'We source laptops directly from the factory, eliminating intermediate dealer costs and ensuring you get the best quality at affordable prices. Buy with confidence and save more!',
            iconPosition: 'left',
          
          },
          {
            title: 'Expert Laptop & printer Repair – Fast & Reliable!',
            icon: FiSliders,
            description:
              'With over 30 years of experience in laptop repair, our skilled technicians deliver fast and reliable service for all brands and models. Whether it"s a hardware issue, software glitch, or screen replacement, we ensure your laptop is up and running quickly, all at an affordable price.',
            iconPosition: 'left',
            
          },
          {
            title: 'Custom Automations,CRM & ERP Solutions',
            icon: FiGrid,
            description:
              'We create tailored automation systems and CRM websites that streamline your business processes and enhance customer relationships. Our solutions are designed to improve efficiency, boost productivity, and drive growth, all while being scalable to meet your unique business needs.',
            iconPosition: 'left',
           
          },
          {
            title: 'Custom Software Built for Your Needs',
            icon: FiThumbsUp,
            description:
              "We specialize in developing custom software solutions designed specifically for your business needs. Whether it's automating processes, improving workflows, or creating unique tools, our team works closely with you to deliver software that drives efficiency and growth.",
            iconPosition: 'left',
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="About US">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
          With over 30 years of experience in both software and hardware, we bring unparalleled expertise to every project. Our engineers have worked with top multinational companies, ensuring the highest quality standards in all our services. We have specialized teams dedicated to different areas, from laptop and printer repairs to custom software solutions. No matter the task, we deliver exceptional work on time, every time.
          </Text>

          
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Past Experience">
        <Text color="muted" fontSize="lg">
        With a strong track record of excellence, we have successfully
        delivered 1000+ products to our satisfied customers.
        Our commitment to quality and reliability has earned us the trust
        of individuals and businesses alike.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Dipak Pawar"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['blue.200', 'blue.200']}
      >
        “Our founder is a highly skilled electronics engineer with extensive experience in the industry. Having worked with several big multinational companies, he has honed his expertise in laptop and printer repair. Over the years, he has built a strong reputation, serving multiple clients with top-notch repair and maintenance services. His vision and technical excellence drive our commitment to quality and customer satisfaction.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Our Services"
      >
        <Wrap mt="4">
          {[
            'Laptop Sales',
            'Printer Sales',
            'Laptop Repairing',
            'Printer Repairing',
            'CPU Repairing',
            'Computer Spare parts',
            'Automations',
            'Website Development',
            'App Development',
            'RPA',
            'CRM websites',
            'ERP Solution',
            'Custom Softwares',
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Not your standard
          <Br /> dashboard template.
        </Heading>
      }
      description={
        <>
          Saas UI Pro includes everything you need to build modern frontends.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: '#components.',
          icon: FiBox,
          description:
            'All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.',
          variant: 'inline',
        },
        {
          title: 'Starterkits.',
          icon: FiLock,
          description:
            'Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.',
          variant: 'inline',
        },
        {
          title: 'Documentation.',
          icon: FiSearch,
          description:
            'Extensively documented, including storybooks, best practices, use-cases and examples.',
          variant: 'inline',
        },
        {
          title: 'Onboarding.',
          icon: FiUserPlus,
          description:
            'Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.',
          variant: 'inline',
        },
        {
          title: 'Feature flags.',
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
          variant: 'inline',
        },
        {
          title: 'Upselling.',
          icon: FiTrendingUp,
          description:
            '#components and hooks for upgrade flows designed to make upgrading inside your app frictionless.',
          variant: 'inline',
        },
        {
          title: 'Themes.',
          icon: FiToggleLeft,
          description:
            'Includes multiple themes with darkmode support, always have the perfect starting point for your next project.',
          variant: 'inline',
        },
        {
          title: 'Generators.',
          icon: FiTerminal,
          description:
            'Extend your design system while maintaininig code quality and consistency with built-in generators.',
          variant: 'inline',
        },
        {
          title: 'Monorepo.',
          icon: FiCode,
          description: (
            <>
              All code is available as packages in a high-performance{' '}
              <Link href="https://turborepo.com">Turborepo</Link>, you have full
              control to modify and adjust it to your workflow.
            </>
          ),
          variant: 'inline',
        },
      ]}
    />
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

// const ContactSection = () => {
//   return <Contact/>
// }


export default Home
