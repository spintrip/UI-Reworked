import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import SettingsSidebar from "./hostsettingssidebar";
import Aos from "aos";
import DashboardMenu from "../dashboardmenu";
import { all_routes } from "../../router/all_routes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getHostProfile, putHostVerify } from "../../api/Profile";

interface ProfileData {
  dlFile: string[];
  aadharFile: string[];
  profilePic: string[];
}

interface ModalShow {
  dl: boolean;
  aadhaar: boolean;
  profilePic: boolean;
}

const HostSecurity: React.FC = () => {
  const route = all_routes;
  const [profileData, setProfileData] = useState<ProfileData>({
    dlFile: [],
    aadharFile: [],
    profilePic: [],
  });
  const [modalShow, setModalShow] = useState<ModalShow>({
    dl: false,
    aadhaar: false,
    profilePic: false,
  });
  const [selectedDlFile, setSelectedDlFile] = useState<File[]>([]);
  const [selectedAadhaarFile, setSelectedAadhaarFile] = useState<File[]>([]);
  const [selectedProfilePicFile, setSelectedProfilePicFile] = useState<File[]>(
    [],
  );
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const profile = await getHostProfile();
    if (profile) {
      setProfileData({
        dlFile: profile.profile.dlFile
          ? profile.profile.dlFile.slice(0, 1)
          : [],
        aadharFile: profile.profile.aadharFile
          ? profile.profile.aadharFile.slice(0, 1)
          : [],
        profilePic: profile.profile.profilePic
          ? profile.profile.profilePic.slice(0, 1)
          : [],
      });
      setSelectedDlFile(
        profile.profile.dlFile ? profile.profile.dlFile.slice(0, 1) : [],
      );
      setSelectedAadhaarFile(
        profile.profile.aadharFile
          ? profile.profile.aadharFile.slice(0, 1)
          : [],
      );
      setSelectedProfilePicFile(
        profile.profile.profilePic
          ? profile.profile.profilePic.slice(0, 1)
          : [],
      );
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (file) =>
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf",
    );

    if (validFiles.length !== files.length) {
      alert("Only PNG, JPG, and PDF formats are allowed.");
      return;
    }

    setSelectedFile(validFiles.slice(0, 1)); // Ensure only one file is selected
  };

  const handleUpload = async (selectedFile: File[], type: string) => {
    if (selectedFile.length === 0) {
      alert("Please select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    if (type === "dl") {
      formData.append("dlFile", selectedFile[0]);
    } else if (type === "aadhaar") {
      formData.append("aadharFile", selectedFile[0]);
    } else if (type === "profilePic") {
      formData.append("profilePic", selectedFile[0]);
    }

    try {
      await putHostVerify(formData);
      setSuccessMessage("File uploaded successfully");
      fetchProfileData();
      setModalShow((prev) => ({ ...prev, [type]: false }));
      if (type === "dl") {
        setSelectedDlFile([]);
      } else if (type === "aadhaar") {
        setSelectedAadhaarFile([]);
      } else if (type === "profilePic") {
        setSelectedProfilePicFile([]);
      }
    } catch (error) {
      console.error(`Error uploading ${type} file:`, error);
    } finally {
      setUploading(false);
    }
  };

  interface MyVerticallyCenteredModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    onFileChange: (
      event: ChangeEvent<HTMLInputElement>,
      setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>,
    ) => void;
    onUpload: () => void;
    selectedFile: File[];
    setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>;
    successMessage: string;
    uploading: boolean;
  }

  const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({
    show,
    onHide,
    title,
    onFileChange,
    onUpload,
    selectedFile,
    setSelectedFile,
    successMessage,
    uploading,
  }) => (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Upload {title}</h4>
        <p>Please upload your {title.toLowerCase()}.</p>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            multiple
            onChange={(e) => onFileChange(e, setSelectedFile)}
          />
          <label className="custom-file-label" htmlFor="customFile">
            <p>
              {selectedFile.length > 0
                ? selectedFile.map((file) => `${file.name}...`).join(", ")
                : "Choose file"}
            </p>
          </label>
        </div>
        <div
          className="upload-icon"
          onClick={() => document.getElementById("customFile")?.click()}
        >
          <i className="fas fa-upload"></i>{" "}
          {/* Replace with your preferred icon */}
        </div>
        <div className="image-preview d-flex flex-row mx-5 flex-wrap align-items-center justify-content-start">
          {selectedFile.length > 0 &&
            selectedFile.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-20 cursor-pointer hover:opacity-80 h-20 mx-1 object-fit-contain border border-2 rounded-xl"
              />
            ))}
        </div>
        <p className="success-message">{successMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={onUpload} disabled={uploading}>
          {uploading && <div className="loader"></div>}
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Host Security</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={route.hostdashboard}>Host Dashboard</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <DashboardMenu />
      <div className="content settings-profile-content">
        <div className="container">
          <div className="content-header content-settings-header">
            <h4>Settings</h4>
          </div>
          <div className="row">
            <SettingsSidebar />
            <div className="col-lg-9">
              <div className="settings-info">
                <div className="settings-sub-heading">
                  <h4>Security</h4>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="security-grid flex-fill">
                      <div className="security-heading">
                        <h5>DL Verification</h5>
                      </div>
                      <div className="security-content">
                        <p>
                          {profileData.dlFile && profileData.dlFile.length > 0
                            ? `Uploaded File: ${profileData.dlFile[0].substring(0, 15)}`
                            : "Please upload your driving license."}
                        </p>
                      </div>
                      <div className="security-btn">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setModalShow((prev) => ({ ...prev, dl: true }))
                          }
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                    <MyVerticallyCenteredModal
                      show={modalShow.dl}
                      onHide={() =>
                        setModalShow((prev) => ({ ...prev, dl: false }))
                      }
                      title="Driving License"
                      onFileChange={handleFileChange}
                      onUpload={() => handleUpload(selectedDlFile, "dl")}
                      selectedFile={selectedDlFile}
                      setSelectedFile={setSelectedDlFile}
                      successMessage={successMessage}
                      uploading={uploading}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="security-grid flex-fill">
                      <div className="security-heading">
                        <h5>Aadhaar Verification</h5>
                      </div>
                      <div className="security-content">
                        <p>
                          {profileData.aadharFile &&
                          profileData.aadharFile.length > 0
                            ? `Uploaded File: ${profileData.aadharFile[0].substring(0, 15)}`
                            : "Please upload your Aadhaar."}
                        </p>
                      </div>
                      <div className="security-btn">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setModalShow((prev) => ({ ...prev, aadhaar: true }))
                          }
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                    <MyVerticallyCenteredModal
                      show={modalShow.aadhaar}
                      onHide={() =>
                        setModalShow((prev) => ({ ...prev, aadhaar: false }))
                      }
                      title="Aadhaar"
                      onFileChange={handleFileChange}
                      onUpload={() =>
                        handleUpload(selectedAadhaarFile, "aadhaar")
                      }
                      selectedFile={selectedAadhaarFile}
                      setSelectedFile={setSelectedAadhaarFile}
                      successMessage={successMessage}
                      uploading={uploading}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="security-grid flex-fill">
                      <div className="security-heading">
                        <h5>Profile Picture</h5>
                      </div>
                      <div className="security-content">
                        <p>
                          {profileData.profilePic &&
                          profileData.profilePic.length > 0
                            ? `Uploaded File: ${profileData.profilePic[0].substring(0, 15)}`
                            : "Please upload your profile picture."}
                        </p>
                      </div>
                      <div className="security-btn">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setModalShow((prev) => ({
                              ...prev,
                              profilePic: true,
                            }))
                          }
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                    <MyVerticallyCenteredModal
                      show={modalShow.profilePic}
                      onHide={() =>
                        setModalShow((prev) => ({ ...prev, profilePic: false }))
                      }
                      title="Profile Picture"
                      onFileChange={handleFileChange}
                      onUpload={() =>
                        handleUpload(selectedProfilePicFile, "profilePic")
                      }
                      selectedFile={selectedProfilePicFile}
                      setSelectedFile={setSelectedProfilePicFile}
                      successMessage={successMessage}
                      uploading={uploading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSecurity;
