
import React,{useEffect,useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button, Box, CardActions } from "@mui/material";
import { styled } from "@mui/system";
import { FaArrowLeft } from "react-icons/fa";
import './Career.css';

// Sample data for the job positions and skills
const jobPositions = [
  {
    title: "Frontend Developer",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux"],
  },
  {
    title: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    title: "Data Analyst",
    skills: ["Excel", "SQL", "Python", "Tableau", "Data Visualization"],
  },
  {
    title: "Testing Engineer",
    skills: ["Manual Testing", "Automated Testing", "Selenium", "JIRA", "Test Case Design"],
  },
  {
    title: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
  },
];

const GradientButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing ? theme.spacing(2) : "16px",
  background: 'black',
  color: "white",
  "&:hover": {
    background: 'black'
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing ? theme.spacing(2) : "16px",
  borderRadius: "16px",
  boxShadow: theme.shadows ? theme.shadows[5] : "0px 3px 5px 2px rgba(0, 0, 0, 0.2)",
  background: "linear-gradient(to top, #dfe9f3 0%, white 100%);",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const JobCard = ({ title, skills }) => {
const [isLoggedIn, setisLoggedIn] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setisLoggedIn(true);
    }
  }, []);


  const handleApplyNow = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login first before submiting any form")
      navigate('/Login');
    } else {
      navigate('career-form');
    }
  };

  return (
    <GradientCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Skills Required:
        </Typography>
        <Box>
          {skills.map((skill, index) => (
            <Typography variant="body2" color="textSecondary" key={index}>
              • {skill}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <GradientButton onClick={handleApplyNow} fullWidth>Apply Now</GradientButton>
      </CardActions>
    </GradientCard>
  );
};

const Career = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="carrer-conatiner">
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 5,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}>
          Join Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {jobPositions.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard title={job.title} skills={job.skills} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Outlet />
    </div>
  );
};

export default Career;
