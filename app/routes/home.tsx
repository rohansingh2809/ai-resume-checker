import { usePuterStore } from "~/lib/putter";
import { resumes } from "../../constants";
import type { Route } from "../routes.ts";
import Navbar from "~/components/navbr";
import ResumeCard from "~/components/ResumeCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
const {auth}=usePuterStore();
const navigate=useNavigate();

 useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
  <Navbar/>
 

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Application & Resume Rating</h1>
        <h2>Review your submission and check AI-powered feedback</h2>
      </div>

    
    {resumes.length>0 &&(
      <div className="flex flex-wrap flex-row gap-3 sm:px-2 py-5">
        {
       resumes.map((resume) => (
    <ResumeCard key={resume.id} resume={resume}/>
      ))
    }
    </div>
    )}
    </section>
    

  </main>;
}
