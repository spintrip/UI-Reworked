import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SettingsSidebar from "./settingssidebar";
import Aos from "aos";
import DashboardMenu from "../dashboardmenu";
import { all_routes } from "../../router/all_routes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getProfile, putVerify } from "../../api/Profile";
import PropTypes from "prop-types";
import ImageWithBasePath1 from "../../../core/data/img/ImageWithBasePath1";


interface ProfileData {
  dlFile: string;
  aadharFile: string;
  profilePic: string;
}

interface ModalShow {
  dl: boolean;
  aadhaar: boolean;
  profilePic: boolean;
}

const UserSecurity: React.FC = () => {
  const route = all_routes;
  const [notificationMessage,setNotificationMessage] = useState("")

  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    dlFile: "",
    aadharFile: "",
    profilePic: "",
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
    const profile = await getProfile();
    if (profile) {
      setProfileData({
        dlFile: profile.profile.dl ? profile.profile.dl[0] : "",
        aadharFile: profile.profile.aadhar ? profile.profile.aadhar[0] : "",
        profilePic: profile.profile.profilePic ? profile.profile.profilePic[0] : "",
      });

      setSelectedDlFile(profile.profile.dlFile ? [profile.profile.dlFile[0]] : []);
      setSelectedAadhaarFile(profile.aadharFile ? [profile.profile.aadharFile[0]] : []);
      setSelectedProfilePicFile(
        profile.profilePic ? [profile.profilePic[0]] : [],
      );
    }
  };
  
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (file: File) =>
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf",
    );

    if (validFiles.length !== files.length) {
      alert("Only PNG, JPG, and PDF formats are allowed.");
      return;
    }

    setSelectedFile(validFiles);
  };
  const reduceImageSize = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality = 0.6
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const fileType = file.type;
        if (!/image\/(png|jpg|jpeg)/.test(fileType)) {
            resolve(file);
            return;
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
            }

            let { width, height } = img;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height *= maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width *= maxHeight / height));
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], file.name, { type: fileType }));
                } else {
                    reject(new Error("Image compression failed"));
                }
            }, fileType, quality);
        };

        reader.readAsDataURL(file);
    });
};
  const handleUpload = async (selectedFile: File[], type: string) => {
    if (selectedFile.length === 0) {
      alert("Please select a file.");
      return;
    }
    const maxWidth = 1024;
    const maxHeight = 1024;

    // Reduce the image size if necessary
    const resizedFile = await reduceImageSize(selectedFile[0], maxWidth, maxHeight);
    
    setUploading(true);
    const formData = new FormData();
    if (type === "dl") {
      formData.append("dlFile", resizedFile);
    } else if (type === "aadhaar") {
      formData.append("aadharFile", resizedFile);
    } else if (type === "profilePic") {
      formData.append("profilePic", resizedFile);
    }

    try {
      await putVerify(formData, (error: any, data: { message: React.SetStateAction<string>; }) => {
        if (error) {
            console.error('Callback received an error:', error);
            setUploading(false);
            return;
        } else {
            setIsUploadSuccess(true)
            setNotificationMessage(data.message)
            setTimeout(() => {
              setIsUploadSuccess(false);
            }, 5000); 
            console.log('Callback received data:', data);
        }
      });
      setSuccessMessage("File uploaded successfully");
      const fileUrl = URL.createObjectURL(selectedFile[0]);
        setProfileData(prevState => ({
            ...prevState,
            ...(type === "dl" && { dlFile: fileUrl }),
            ...(type === "aadhaar" && { aadharFile: fileUrl }),
            ...(type === "profilePic" && { profilePic: fileUrl }),
        }));
    } catch (error) {
      console.error(`Error uploading ${type} file:`, error);
    } finally {
       setModalShow({ ...modalShow, [type]: false });
       setUploading(false);
       setSuccessMessage("")
    }
  };

  const MyVerticallyCenteredModal: React.FC<{
    show: boolean;
    onHide: () => void;
    title: string;
    onFileChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>,
    ) => void;
    onUpload: () => void;
    selectedFile: File[];
    setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>;
    successMessage: string;
    uploading: boolean;
  }> = ({
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
      <Modal.Body className="py-5 d-flex flex-column align-items-center justify-content-center">
        <h4>Upload {title}</h4>
        <p>Please upload your {title.toLowerCase()}.</p>
        <div className="custom-file" style={{ display: "none" }}>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            multiple
            onChange={(e) => onFileChange(e, setSelectedFile)}
          />
          <label className="custom-file-label" htmlFor="customFile">
            <p>
              {selectedFile && selectedFile.length > 0
                ? selectedFile
                    .map((file: File) => (file.name ? `${file.name}...` : ""))
                    .join(", ")
                : "Choose file"}
            </p>
          </label>
        </div>
        <div
          onClick={() => document?.getElementById("customFile")?.click()}
          className="upload-icon mt-4. px-20"
          style={{ fontSize: "30px" , color : "black" }}
        >
          <i className="fas fa-upload"></i>{" "}
         
        </div>
        <div className="document-image-preview ">
          {selectedFile &&
            selectedFile.length > 0 &&
            selectedFile.map((file: File, index: number) =>
              file ? (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-20 cursor-pointer hover:opacity-80 h-20 mx-1 object-fit-contain border border-2 rounded-xl"
                />
              ) : null,
            )}
        </div>
        <p className="success-message">{successMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onUpload} disabled={uploading}>
          {uploading ?

           <div className="px-3" >
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
           </div>
           
           :<>Upload</>}
          
        </Button>
      </Modal.Footer>
    </Modal>
  );

  MyVerticallyCenteredModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onFileChange: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    selectedFile: PropTypes.array.isRequired,
    setSelectedFile: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired,
    uploading: PropTypes.bool.isRequired,
  };

  return (
    <div className="main-wrapper">
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">User Security</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={route.home}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Security
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Dashboard Menu */}
      <DashboardMenu />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content settings-profile-content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header content-settings-header">
            <h4>Settings</h4>
          </div>
          {/* /Content Header */}
          <div className="row">
            {/* Settings Menu */}
            <SettingsSidebar />
            {/* /Settings Menu */}
            {/* Settings Details */}
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
                      <div className="security-content d-flex flex-column align-items-center justify-content-center">
                      {profileData.dlFile ? (
                        <>
                          <ImageWithBasePath1
                            src={profileData.dlFile}
                            alt="DL Preview"
                            className="document-photo"
                          />
                          <div
                            onClick={() => setModalShow((prev) => ({ ...prev, dl: true }))}
                            className="upload-icon mt-4"
                            style={{ fontSize: "16px" , color : "black" }}
                          >
                            <i className="fas fa-upload"></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Please upload your driving license.</p>
                          <div
                            onClick={() => setModalShow((prev) => ({ ...prev, dl: true }))}
                            className="upload-icon"
                          >
                            <i className="fas fa-upload"></i>
                          </div>
                        </>
                      )}
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
                      <div className="security-content d-flex flex-column align-items-center justify-content-center">
                      {profileData.aadharFile ? (
                        <>
                          <ImageWithBasePath1
                            src={profileData.aadharFile}
                            alt="Aadhaar Preview"
                            className="document-photo"
                          />
                          <div
                            onClick={() => setModalShow((prev) => ({ ...prev, aadhaar: true }))}
                            className="upload-icon mt-4"
                            style={{ fontSize: "16px" , color : "black" }}
                          >
                            <i className="fas fa-upload" ></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Please upload your Aadhaar card.</p>
                          <div
                            onClick={() => setModalShow((prev) => ({ ...prev, aadhaar: true }))}
                            className="upload-icon"
                          >
                            <i className="fas fa-upload"></i>
                          </div>
                        </>
                      )}
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
                      <div className="security-content d-flex flex-column align-items-center justify-content-center">
                        {profileData.profilePic ? (
                          <>
                            <ImageWithBasePath1
                              src={profileData.profilePic}
                              alt="Profile Picture Preview"
                              className="document-photo"
                            />
                            <div
                              onClick={() => setModalShow((prev) => ({ ...prev, profilePic: true }))}
                              className="upload-icon mt-4"
                              style={{ fontSize: "16px" , color : "black" }}
                            >
                              <i className="fas fa-upload"></i>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>Please upload your profile picture.</p>
                            <div
                              onClick={() => setModalShow((prev) => ({ ...prev, profilePic: true }))}
                              className="upload-icon"
                            >
                              <i className="fas fa-upload"></i>
                            </div>
                          </>
                        )}
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

                  {/* Other security settings can go here */}
                </div>
              </div>
             
            </div>
            {/* /Settings Details */}
          </div>
        </div>
      </div>
      {isUploadSuccess && (
        <div className="alert alert-success mt-2" role="alert">
          <div className="p-2 location-alert bg-green-800 text-green-100 alert-content ">
            <span className="bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3 alert-status">
              Success
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              {notificationMessage}
            </span>
          </div>
        </div>
      )}
      {/* /Page Content */}
    </div>
  );
};

export default UserSecurity;
