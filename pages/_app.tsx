import React from 'react';
import PropTypes from 'prop-types';
import { ChakraProvider } from '@chakra-ui/react';


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
}
