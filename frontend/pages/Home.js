import Navbar from '@/components/Navbar';
import Link from 'next/link';
import './Home.css';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="heading">Welcome to the Home Page</h1>
        <p>
          <Link href="/signup">Go to Signup Page</Link>
        </p>
        <div className="yourhr-description">
          <h2 className="description-title">About YourHR</h2>
          <p className="description-text">
            YourHR is a job search service that aims to help job seekers find the ideal job roles based on their qualifications and preferences. Our platform allows users to easily upload their resumes, providing a streamlined experience to connect with potential employers.
          </p>
          <p className="description-text">
            Start your journey with us today, and let YourHR guide you towards your next career opportunity.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
