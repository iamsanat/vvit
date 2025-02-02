import { Button } from '@chakra-ui/react'
import { useRef } from 'react';
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'


const siteConfig = {
  logo: Logo,
  seo: {
    title: 'VVIT',
    description: 'Best Laptop Repairing Shop In Satara',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Admin',
        href: '/admin',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      
      
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link >NextGen Technology</Link>
      </>
    ),
  },
  signup: {
    title: 'Start building with Saas UI',
    features: [
      {
        icon: FiCheck,
        title: 'Accessible',
        description: 'All components strictly follow WAI-ARIA standards.',
      },
      {
        icon: FiCheck,
        title: 'Themable',
        description:
          'Fully customize all components to your brand with theme support and style props.',
      },
      {
        icon: FiCheck,
        title: 'Composable',
        description:
          'Compose components to fit your needs and mix them together to create new ones.',
      },
      {
        icon: FiCheck,
        title: 'Productive',
        description:
          'Designed to reduce boilerplate and fully typed, build your product at speed.',
      },
    ],
  },
}

export default siteConfig
