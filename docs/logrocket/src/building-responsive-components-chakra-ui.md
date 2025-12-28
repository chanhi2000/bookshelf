---
lang: en-US
title: "Building responsive components in Chakra UI"
description: "Article(s) > Building responsive components in Chakra UI"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building responsive components in Chakra UI"
    - property: og:description
      content: "Building responsive components in Chakra UI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-responsive-components-chakra-ui.html
prev: /programming/js-react/articles/README.md
date: 2021-11-05
isOriginal: false
author:
  - name: Nefe Emadamerho-Atori
    url : https://blog.logrocket.com/author/nefejames/
cover: /assets/image/blog.logrocket.com/building-responsive-components-chakra-ui/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building responsive components in Chakra UI"
  desc="Follow this comprehensive tutorial for building responsive components that look beautiful on any screen with Chakra UI."
  url="https://blog.logrocket.com/building-responsive-components-chakra-ui"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-responsive-components-chakra-ui/banner.png"/>

## Introduction

Users interact with the web through different devices, from phones, and laptops to smartwatches and AR/VR headsets. As developers, we must ensure that the websites and web applications we create are not just performant and functional, but also responsive on all screen sizes.

![](/assets/image/blog.logrocket.com/building-responsive-components-chakra-ui/banner.png)

[**Chakra UI**](/blog.logrocket.com/advanced-techniques-chakra-ui.md) is a simple, modular, and easily extensible component library made up of basic building blocks that enables us to build the front end of our web applications. Chakra UI is customizable, fully accessible, reusable, and easy to use. It also comes with useful hooks, like the `useColorMode` hook, which we can use to add dark mode to our applications. Overall, Chakra UI comes packed with many incredible features that make it the right tool for the job.

In this article, we will learn how to build responsive components with Chakra UI and use that knowledge to build [<VPIcon icon="fas fa-globe"/>this dashboard application](https://next-chakra-dashboard.vercel.app/).

::: note Prerequisites

The focus of this article is not to introduce Chakra UI to the reader, but rather to show how to build responsive components with this great tool. While it is not strictly required, experience working with Chakra UI will be advantageous.

:::

---

## Chakra UI’s approach to responsive web design

When it comes to writing responsive CSS, developers have the option of choosing between mobile-first and desktop-first approaches. Chakra UI takes the mobile-first approach using the `@media(min-width)` media query.

Responsive styling in Chakra UI relies on breakpoints defined in the `theme` object. Chakra UI’s `theme` object ships with the following breakpoints by default:

```js
 //Breakpoints for responsive design
{
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
}
```

We can switch from the default breakpoints to breakpoints that fit our application’s specifications using the [<VPIcon icon="fas fa-globe"/>`createBreakpoints`](https://chakra-ui.com/docs/features/responsive-styles)` theme tool, like so:

```js
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
})
```

While we can use `createBreakpoints` to create custom breakpoints, it will be [deprecated in the future (<VPIcon icon="iconfont icon-github"/>`chakra-ui/chakra-ui`)](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme-tools/src/create-breakpoints.ts). The Chakra UI team advises we define the breakpoints as an object in a custom theme object we create:

```jsx
import { extendTheme } from "@chakra-ui/react";

const customeTheme = extendTheme({
  colors: {},
  fonts: {},
  fontSizes: {},
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});

const theme = extendTheme({ customeTheme });

export default customeTheme;
```

Chakra UI provides two syntaxes for creating responsive styles: the array syntax, and the object syntax. These syntaxes abstract the complexities of writing media queries and provide a great developer experience when developing responsive components.

The following is an example of these syntaxes:

```jsx
// unresponsive width styles
<Box bg="red.200" w="400px">
  This is a box
</Box>

// responsive width styles using the Array syntax
<Box bg="red.200" w={[300, 400, 500]}>
  This is a box
</Box>

// responsive width style susing the Object syntax
<Box bg="red.200" w={{ base: "300px", md: "400px", lg: "500px" }}>
  This is a box
</Box>
```

For the array syntax, the width of the `Box` translates to:

- 300px from 0em upwards
- 400px from 30em upwards
- 500px from 48em upwards

For the object syntax, the width of the `Box` translates to:

- “base” 300px from 0em upwards
- “md” from 48em upwards
- “lg” from 62em upwards

We can see that aside from the difference in syntax, the array and object responsive style definitions perform the same function.

---

## Understanding the `useMediaQuery` hook

[<VPIcon icon="fas fa-globe"/>`useMediaQuery`](https://chakra-ui.com/docs/hooks/use-media-query)` is a custom hook used to help detect whether a single media query or multiple media queries individually match. It returns a boolean based on the media query we define.

Let’s see how the `useMediaQuery` hook works:

```jsx
import { useMediaQuery } from "@chakra-ui/react"

function Home() {
 const [isMobile] = useMediaQuery("(max-width: 768px)") 
 return (<>
   <Text>
    {isMobile ? "This is a mobile device" : "This is a desktop device"}
   </Text>
  </>)
}
```

In the code snippet above, we define a `max-width: 768px` media query and access the `isMobile` boolean. Next, we conditionally render some text based on the value of `isMobile`.

Now that we understand how to create responsive styles in Chakra UI and how the `useMediaQuery` works, let’s start building our dashboard application.

---

## Creating the dashboard layout

For the dashboard, we will start by creating the layout. The dashboard layout consists of the `Sidebar` and `Header` components.

Let’s break down the functionality and components of the layout as seen here:

```jsx :collapsed-lines
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="gray.100">
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Header */}
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
```

There are a few things to notice from [<VPIcon icon="fas fa-globe"/>the demo](https://next-chakra-dashboard.vercel.app/) about the `Header` and `Sidebar` components.

First, there is a hamburger menu that appears on the header on mobile. When the hamburger is clicked, the sidebar slides into view. Finally, when the sidebar slides into view, there is a “close” icon button that, when clicked, causes the sidebar to slide back out of view.

We can set up this functionality using Chakra UI’s [`useDisclosure`](https://chakra-ui.com/docs/hooks/use-disclosure) hook. As seen in the code snippet above, we access `isOpen`, `onOpen`, and `onClose` from `useDisclosure`.

Next, we pass the `onOpen` function to `Header` so we can use it in the hamburger menu. The hamburger will be visible only on mobile; we will see this when we develop the `Header` component later in the article.

Now let’s break down the `Sidebar` component. We see from the code above that `Sidebar` is used twice.

The first `Sidebar` is the desktop sidebar. We want this sidebar to show only on large screen devices, so we set its display to “none” on mobile and “block” on larger devices. We also pass the `onClose` function to the sidebar so we can use it to close the sidebar on mobile.

The second `Sidebar` is the mobile sidebar. We use Chakra UI’s [<VPIcon icon="fas fa-globe"/>`Drawer`](https://chakra-ui.com/docs/overlay/drawer) component to set this up. The sidebar will be a child of the drawer, and the drawer will only open when `isOpen` is `true`. `isOpen` will be true only when the header’s hamburger is clicked.

With these steps, we have created the layout for the dashboard and made the sidebar responsive.

Another method we can use to create a responsive sidebar is to make use of the `useMediaQuery` hook. With this method, we create a desktop and a mobile sidebar and and conditionally display them based on the current screen size, like so:

```jsx
import { Box, Stack } from "@chakra-ui/layout";
import Header from "./navbar";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./DesktopSidebar";
import { useMediaQuery } from "@chakra-ui/media-query";

export default function Layout({ children }) {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  return (<>
    <Box>
      <Header />
      <Box>
        <Stack>
          {isSmallScreen ? <MobileSidebar /> : <DesktopSidebar />}
          {children}
        </Stack>
      </Box>
    </Box>
  </>);
}
```

Now that we have created the dashboard layout, let’s use it in our <VPIcon icon="fa-brands fa-react"/>`app.js` file:

```jsx title="app.jsx"
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@layout/index";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Chakra UI Dashboard</title>
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
```

---

## Creating the `Header` component

The `Header` component consists of a logo, a `UserProfile` component, and a hamburger menu which we will use to toggle the sidebar on mobile devices. `UserProfile` consists of a user’s name, their avatar image, and their role. `UserProfile` triggers a dropdown menu when clicked.

Let’s start with `UserProfile`:

```jsx :collapsed-lines
import {
  IconButton, Avatar, Box, Flex, HStack, VStack, Text, Menu, MenuButton, MenuDivider,
  MenuItem, MenuList,
} from "@chakra-ui/react";
import { FiChevronDown, FiBell } from "react-icons/fi";

export default function UserProfile() {
  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
      />
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack spacing="4">
              <Avatar
                size="md"
                src={
                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="lg">Ademola Jones</Text>
                <Text fontSize="md" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList fontSize="lg" bg="white" borderColor="gray.200">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
```

Here, we set the spacing of the `HStack` component using the object syntax. We remove `HStack`‘s spacing for small screen and mobile devices and set it to `6` for larger devices. Net, we set the display of the `VStack` and `Box` components to `"none"` on small devices and to `"flex"` on larger devices.

Now for the `Header`:

```jsx :collapsed-lines
import { IconButton, Flex, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import UserProfile from "./UserProfile";

export default function Header({ onOpen }) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px="4"
      position="sticky"
      top="0"
      height="20"
      zIndex="1"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      <UserProfile />
    </Flex>
  );
}
```

By using the `Flex` component, we set `Header`‘s display to `"flex"`. We want to adjust the left margin, `ml`, of the `Flex` component based on the breakpoints. We set the left margin to `0` on small devices and `60` on larger devices. You can learn more about Chakra spaces in [<VPIcon icon="fas fa-globe"/>the docs](https://chakra-ui.com/docs/theming/theme#spacing).

We want the hamburger and the logo to be visible only on mobile, so we set them to display only on mobile devices through their `display` prop.

Finally, we pass the `onClose` function to the hamburger menu’s `onClick` event to trigger the sidebar on mobile, like we explained earlier.

---

## Creating the `Sidebar` component

The `Sidebar` component consists of a logo, a list of links, and a “close” button, which we will use to close the sidebar on mobile.

Let’s start setting up the sidebar:

```jsx
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import NavLink from "./NavLink";

const LinkItems = [
  { label: "Home", icon: FiHome, href: "/" },
  { label: "Trending", icon: FiTrendingUp, href: "/" },
  { label: "Explore", icon: FiCompass, href: "/" },
  { label: "Favourites", icon: FiStar, href: "/" },
  { label: "Settings", icon: FiSettings, href: "/" },
];

export default function Sidebar({ onClose, ...rest }) {
  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, i) => (
        <NavLink key={i} link={link} />
      ))}
    </Box>
  );
}
```

We want the sidebar to take the fullscreen width on mobile, so we set its base width to `"full"`. Next, we set its width to `60` on larger devices.

We want the `CloseButton` to be visible only on mobile devices, so we set its display to `"flex"` on mobile devices and `"none"` on larger devices.

We also pass the `onClose` function to the `CloseButton` to close the sidebar when needed. `CloseButton` is needed to close the drawer we set up earlier in the `Layout` component.

We have created the sidebar, and it’s responsive, but there is a problem. When we click the sidebar links on mobile, the sidebar does not slide back out of view. How can we fix that and ensure we hide the sidebar if a link is clicked? We address this issue with Next.js’ [<VPIcon icon="iconfont icon-nextjs"/>router.events API](https://nextjs.org/docs/api-reference/next/router).

### Router.events in Next.js

This API allows us to listen to different events happening inside the Next.js router and react to them.

Let’s update the `Sidebar` component’s code:

```jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Sidebar({ onClose, ...rest }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", onClose);
    return () => {
      router.events.off("routeChangeComplete", onClose);
    };
  }, [router.events, onClose]);

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      //other elements of the sidebar go here....
    </Box>
  );
}
```

Here, we use the `useEffect` hook to register the `routeChangeComplete` router event. `routeChangeComplete` fires when a route changes completely, in our case, when we click on the sidebar links. When `routeChangeComplete` takes place, we call `onClose`, which causes the sidebar to close.

Finally, you will notice that we defined a `LinkItems` array. We loop through the array, and for each element in the array, we render a `NavLink` component. `NavLink` will contain the data for every link in the sidebar.

Let’s create `NavLink`:

```jsx
import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";

export default function NavLink({ link, ...rest }) {
  const { label, icon, href } = link;
  return (
    <NextLink href={href} passHref>
      <a>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Text fontSize="1.2rem">{label}</Text>
        </Flex>
      </a>
    </NextLink>
  );
} 
```

There are no responsive styles for `NavLink`. Here, we pass in the label, icon, and URL from we get when we map through the `LinkItems` array.

---

## Creating the homepage view

Now that we have set up the dashboard layout and its components, let’s look at the building blocks of the homepage:

```jsx :collapsed-lines
import { useState } from "react";
import { cardVariant, parentVariant } from "@root/motion";
import ProductModal from "@components/ProductModal";
import { motion } from "framer-motion";
import data from "@root/data";
import ProductCard from "@components/ProductCard";
import { Box, SimpleGrid } from "@chakra-ui/react";

const MotionSimpleGrid = motion(SimpleGrid);
const MotionBox = motion(Box);

export default function Home() {
  const [modalData, setModalData] = useState(null);
  return (
    <Box>
      <MotionSimpleGrid
        mt="4"
        minChildWidth="250px"
        spacing="2em"
        minH="full"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        {data.map((product, i) => (
          <MotionBox variants={cardVariant} key={i}>
            <ProductCard product={product} setModalData={setModalData} />
          </MotionBox>
        ))}
      </MotionSimpleGrid>
      <ProductModal
        isOpen={modalData ? true : false}
        onClose={() => setModalData(null)}
        modalData={modalData}
      />
    </Box>
  );
}

//sample of product cards array
const data = [
  {
    title: "First Product",
    price: 250,
    img: "https://res.cloudinary.com/nefejames/image/upload/v1593631406/market%20square/clothes/cloth1.jpg",
  },
  {
    title: "Second Product",
    price: 250,
    img: "https://res.cloudinary.com/nefejames/image/upload/v1593631406/market%20square/clothes/cloth2.jpg",
  },
//other product objects below
```

The homepage view consists of two components, `ProductCard` and `ProductModal`.

We loop through a product data array and create a `ProductCard` grid. You can see a sample of the array in the code above.

When a product card is clicked, we want a modal filled with data about the product to pop up. To do that, we define a `modalData` state, which will hold the data of the product that was clicked.

We pass the `product` object containing the product data and the `setModalData` method to `ProductCard`.

Next, we pass `isOpen`, `onClose`, and the `modalData` state to `ProductModal`. `isOpen` is true when `modalData` holds a product’s data. The `onClose` method sets `modalData` to null.

Now that we understand how the `ProductCard` and `ProductModal` components work, let’s create them.

---

## Creating the `ProductCard` component

The `ProductCard` component consists of an upper and a lower section. The upper section is an image of the product, and the lower section contains information about the product – its title, price, and number of reviews:

```jsx :collaped-lines
import Image from "next/image";
import { Box, Flex, chakra } from "@chakra-ui/react";
import { AiTwotoneStar } from "react-icons/ai";
const ChakraStar = chakra(AiTwotoneStar);

export default function ProductCard({ product, setModalData }) {
  const { img, title, price } = product;

  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      bg="white"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      onClick={() => setModalData(product)}
    >
      <Box w="full" h="full">
        <Box
          w="100%"
          height="200px"
          position="relative"
          overflow="hidden"
          roundedTop="lg"
        >
          <Image
            src={img}
            objectFit="cover"
            alt="picture of a house"
            layout="fill"
          />
        </Box>
        <Box p="6">
          <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>
          <Box>${price}</Box>
        </Box>
      </Box>
    </Flex>
  );
}
```

Like we saw earlier, we pass in the `product` object and the `setModalData` method to `ProductCard`. We call the `setModalData` method to update the `modalData` state with the product’s data when the product is clicked.

---

## Creating the `ProductModal` component

The `ProductModal` component consists of the product’s image, title, and price. It also holds a purchase button to model the purchase flow of an actual ecommerce application:

```jsx :collapsed-lines
import Image from "next/image";
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, useToast, Flex,
} from "@chakra-ui/react";

export default function ProductModal({ isOpen, onClose, modalData }) {
  const { title, price, img } = modalData || {};
  const toast = useToast();

  const handleModalClose = () => {
    toast({
      title: "Purchase successsful.",
      description: "Fashion ++",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Product Details</ModalHeader>
        <ModalBody>
          <Box w="full" h="full">
            <Flex w="full" h="300px" position="relative">
              <Image src={img} alt="a house" objectFit="cover" layout="fill" />
            </Flex>
            <Box pt="3">
              <Box mt="3" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {title}
              </Box>
              ${price}
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="cyan.700" color="white" w="150px" size="lg" onClick={handleModalClose}
            _hover={{ bg: "cyan.800" }}
          >
            Purchase
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

Like we saw earlier, we pass the `isOpen`, `onClose`, and the `modalData` state to `ProductModal`. We use Chakra UI’s `[Modal](https://chakra-ui.com/docs/overlay/modal)` here.

`modalData` contains the data of the product that was clicked. We access the product’s title, image, and price from the `modalData` state.

We also define a `handleModalClose` function and pass it to the purchase button. When the button is clicked, a toast is displayed, and the `onClose` method is called.

---

## Conclusion

I love using Chakra UI because it helps me stay productive when building the front end of applications. Not only does the style props pattern make Chakra UI a joy to work with, but I also don’t have to deal with the complexities of setting up media queries for different sizes. Chakra UI was designed to provide a great developer experience and is always my go-to component library.

In this article, we’ve learned how to compose responsive components in Chakra UI. We learned how the `useMediaQuery` and `useDisclosure` hook work and used them to create a responsive dashboard.

The source code for the dashboard application we built is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`nefejames/next-chakra-dashboard`)](https://github.com/nefejames/next-chakra-dashboard).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building responsive components in Chakra UI",
  "desc": "Follow this comprehensive tutorial for building responsive components that look beautiful on any screen with Chakra UI.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-responsive-components-chakra-ui.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
