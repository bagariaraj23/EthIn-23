import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

import TherapistData from './dummydata'


const featuredPosts = TherapistData;





const posts = TherapistData;

const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Find Your Therapist Now"  />
        <main>
          <Grid container spacing={4}>
            {featuredPosts.map((post,index) => (
              <FeaturedPost index={index} post={post} />
            ))}
          </Grid>
         
        </main>
      </Container>
      {/* <Footer
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}
