import React, { use, useState, type FormEvent } from "react";
import Navbar from "~/components/navbr";
import FileUploader from "~/components/fileUploader";

const Upload =()=>{
    const[isProcessing,setProcessing]=useState(false);
    const [statusText,setStatusText]=useState("");
    const {file,setFile}=useState<File | null>(null);
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=e.currentTarget.closest('form');
        if(!form) return;
        const formdata= new FormData(form);
        
        const companyName=formdata.get('company-name');
        const JobTitle=formdata.get('jpb-title');
        const jobdescription=formdata.get('job-description');

        console.log({
            companyName,jobdescription,JobTitle
        })
    }
    const handleFileSelect=(file:File |null) =>{
        setFile(file);
    }

     
    return (
       <main className="bg-[url('/image/bg-amber-100')] bg-cover">
       <Navbar/>

       <section className="main-section">
        <div className="page-heading ">
            <h1>
                Smart feedback for your dream job
            </h1>
            {isProcessing ? (
                <>
                <h2>{statusText}</h2>
                <img src="" alt="scan.gif" className="w-full "/>
                </>
            ):(
                <h2>Drop your resume for an ATS score and improvement tips.</h2>

            )}
            {!isProcessing && (
                <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-3 py-2">
                    <div className="form-div">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="company-name" id="comapany name" placeholder="Company Name" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="Job-title">Job Title</label>
                        <input type="text" name="job-title" id="job-title" placeholder="Job Title" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="job-description">Job description</label>
                        <textarea rows={4}  name="job-description" id="job-description" placeholder="Job description" />
                    </div>
                    <div className="form-div">
                        <FileUploader onFileSelect={handleFileSelect}/>
                         </div>
                         <button className="primary-button" type="submit">
                            Analyze Resume
                         </button>
                    </form>

            )}
            </div>

       </section>
       

       </main>
    )
};

export default Upload;