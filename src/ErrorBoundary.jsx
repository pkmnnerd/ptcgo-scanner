import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container align="center">
          <Typography variant="h5">Something went wrong.</Typography>
          <Typography>{this.state.error.toString()}</Typography>
          <Typography>If you see this error again, please let me know so I can fix it</Typography>



        </Container>
      )

    }

    return this.props.children; 
  }
}