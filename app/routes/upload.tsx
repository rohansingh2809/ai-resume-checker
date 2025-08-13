import React, { useState, type FormEvent } from "react";
import Navbar from "~/components/navbr";
import { useNavigate } from "react-router";
import FileUploader from "~/components/fileUploader";
import { usePuterStore } from "~/lib/putter";
import { convertPdfToImage } from "~/lib/pdf2img";

const Upload = () => {
  const { fs } = usePuterStore();
  const navigate = useNavigate();
  const [IsProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the files...");

    const uploadFile = await fs.upload([file]);
    if (!uploadFile) {
      setStatusText("Error: failed to upload file");
      setIsProcessing(false);
      return;
    }

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      setStatusText("Error: Failed to convert PDF to image");
      setIsProcessing(false);
      return;
    }

    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setStatusText("Error: failed to upload image");
      setIsProcessing(false);
      return;
    }

    setStatusText("Preparing data...");
    // Continue with your logic here...
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formdata = new FormData(form);

    const companyName = formdata.get("company-name") as string;
    const jobTitle = formdata.get("job-title") as string;
    const jobDescription = formdata.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <main className="bg-[url('/image/bg-amber-100')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>

          {IsProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="" alt="scan.gif" className="w-full" />
            </>
          ) : (
            <>
              <h2>Drop your resume for an ATS score and improvement tips.</h2>
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 py-2"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    placeholder="Job Title"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job description</label>
                  <textarea
                    rows={4}
                    name="job-description"
                    id="job-description"
                    placeholder="Job description"
                  />
                </div>
                <div className="form-div">
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
                <button className="primary-button" type="submit">
                  Analyze Resume
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
