import { Box, Card, CardContent, Container, Divider, Grid, Link, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FlatPaper from '../../components/FlatPaper';

import './About.css';

function AboutProject(props) {
  return (
    <Box sx={{ p: 6 }} color="">
      <Typography variant="h2" color="text.primary" align="center"{...props}>
        Open<b>XDR</b>
      </Typography >
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3, ml: 10, mr: 10 }} {...props}>
        OpenXDR is a real-time open-source extended detection and response system which can seamlessly integrate with any EDR, NDR, SIEM, and IDS.
      </Typography>
    </Box>
  )
}

function PlatformCard({ img, name, desc, url }) {
  return (
    <Link underline="hover" href={url}>
      <Card variant="outlined">
        <CardContent>
          <img src={img} />
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography varient="caption" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

function AboutTeam(props) {
  return (
    <Box sx={{
      p: 6,
      pt: 4,
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[950],
    }}>
      <Typography variant="h4" color="text.primary" align="center"{...props}>
        Join us
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={4}>
          <PlatformCard img={'images/logo_slack.svg'} name="Slack" desc="Talk with the team" url="https://gitter.im/scorelab/" />
        </Grid>
        <Grid item xs={4}>
          <PlatformCard img={'images/logo_twitter.svg'} name="Twitter" desc="Get notified on updates" url="https://twitter.com/" />
        </Grid>
        <Grid item xs={4}>
          <PlatformCard img={'images/logo_linkedin.svg'} name="Twitter" desc="Join the community" url="https://www.linkedin.com/company/sustainable-computing-research-group-score-/" />
        </Grid>
      </Grid>

    </Box>
  )
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="">
        OpenXDR
      </Link>{' - '}
      {new Date().getFullYear()}
    </Typography>
  );
}

function About() {

  return (
    <div className="About">
      <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FlatPaper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <AboutProject />
            <Divider />
            <AboutTeam />
          </FlatPaper>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}

export default About;
