import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ReportForm(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    
    const [userName,  setUserName] = useState("");
    const  [contactNo, setContactNo] = useState("");
    const [typeOfLitter, setTypeOfLitter] = useState("");
    const [location, setLocation] = useState("");
    const  [desc, setDesc] = useState("");
    const [status, setStatus] = useState(true);
    const [error, setError] = useState(null);

    const[fileData, setFileData] = useState(null) //for the file object
    const[photo, setPhoto] = useState('') //for the photo name

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
        setPhoto(e.target.files[0].name)
      }
     
    
      const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg']; 

    //* Validations
    // const [comPhone, setComPhone] = useState(false);
    // const [bankAcc, setBankAcc] = useState(false);

    //* Modal Popup
    const [show, setShow] = useState(false);
    const [popupHead, setPopupHead] = useState();
    const [popupMsg, setPopupMsg] = useState("");

    //* Modal handle close
    const handleClose = () => {
        setShow(false)
        console.log("handle close")
    };
    const handleShow = () => setShow(true);


    //* Input alerts
    
    let contactNoAlert = false;



    useEffect(() => {
        setUserName(props.userName);
        setContactNo(props.contactNo);
        setTypeOfLitter(props.typeOfLitter);
        setLocation(props.location);
        setDesc(props.desc);
        setStatus(props.status);
    }, [
        props.userName,
        props.contactNo,
        props.typeOfLitter,
        props.location,
        props.desc,
        props.status
    ]);

    const Report = {
        userName,
        contactNo,  
        typeOfLitter,
        location,
        desc,
        status
    };

    //*Frontend Validation
    //*Validate company phone number
    function checkCompanyPhoneNo() {
        if (isNaN(Number(contactNo))) {
            return true;
        }
        else if (contactNo.length !== 10) {
            return true;
        }
        else {
            return false;

        }

    };

    //*Validate contact person phone number
    
    //*Validate bank account number
    // function checkBankAccNo() {
    //     if (isNaN(Number(bankAccountNo))) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    //* Validation before submit
    const isValid = () => {
        
        contactNoAlert = checkCompanyPhoneNo();
        // bankAccNoAlert = checkBankAccNo();

        setContactNo(contactNoAlert);
        // setBankAcc(bankAccNoAlert);

        if (contactNoAlert) {
            return false;
        }
        else {
            return true;
        }
    }


    //* Add a Report
    const handleAdd = async (e) => {
        e.preventDefault();

        if (isValid()) {
        /**************************Start of Image Handling************************************************************* */

       const data = new FormData()

       data.append('image', fileData)
 
       fetch("http://localhost:5000/single", {
         method: "POST",
         body: data,
       }).then((result) => {
           console.log("File sent successful")
           console.log(fileData)
           setPhoto('')
           setFileData(null)
      
       }).catch((error) => {
         console.log(error.message)
       })
 
       /***************************End of Image Handling***************************************************************** */
            const response = await fetch("/api/Reports", {
                method: "POST",
                body: JSON.stringify(Report),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                setPopupHead("Insertion Failed.");
                setPopupMsg(`Error: ${error} \nDo you want to try again?`);

                handleShow();
            }

            if (response.ok) {
                handleReset();
                setError(null);

                setPopupHead("Successfuly added the report");
                setPopupMsg("Do you want to add more reports?");

                handleShow();
            }
        }
        else {
            return isValid();
        }
    };

    //* Update the Report
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (isValid()) {
            const response = await fetch(`/api/Reports/${id}`, {
                method: "PUT",
                body: JSON.stringify(Report),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);

                setPopupHead("Update Failed.");
                setPopupMsg(`Error: ${error} <p>Do you want to try again ?</p>`);

                handleShow();
            }

            if (response.ok) {
                setUserName(json.userName);
                setContactNo(json.contactNo);
                setTypeOfLitter(json.typeOfLitter);
                setLocation(json.location);
                setDesc(json.desc);
                setStatus(json.status)
                setError(null);

                setPopupHead("Successfuly updated the report");
                setPopupMsg("Do you want to do more changes ?");

                handleShow();

            }
            else {
                return isValid();
            }
        }
    };


    //* Reset the form
    const handleReset = () => {
        setUserName("");
        setContactNo("");
        setTypeOfLitter("");
        setLocation("");
        setDesc("");
    };


    //* Change  toggle switch state
    const handleSwitch = () => {
        if (!status) {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    }

    //! Demo button
    // const fillForm = () => {
    //     setCompanyName("Siripala Fiber Mills");
    //     setCompanyPhoneNo("0113141655");
    //     setRawMaterial("Coir");
    //     setCompanyAddress("Matale");
    //     setContactPersonName("Slade Willson");
    //     setBankName("Samapath Bank");
    //     setBankBranch("Matale");
    //     setBankAccountNo("20033631613");
    // }

    return (
        <section className="section">
            {/* Remove After Demonstration */}
            {/* <button
                type="button"
                className="btn btn-warning"
                style={{ margin: "20px" }}
                onClick={fillForm}
            >
                Fill Form
            </button> */}

            {/* Modal Popup */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{popupHead}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{popupMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={() => {
                        navigate("/Reports");
                    }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ padding: "50px" }}>
                        <div className="card-body">
                            <h1>{props.formName}</h1>
                            <br />
                            <form
                                className="row g-3"
                                onSubmit={
                                    props.buttonName === "Add Report" ? handleAdd : handleUpdate
                                }
                            >

                                {/*//*Toggle Switch/ */}
                                {props.buttonName === "Update " ?
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={status} onClick={handleSwitch} />
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Approve</label>
                                    </div> : null}

                                {/* Raw Material */}
                                

                                {/* Company Details Section starts here */}
                                <div className="col-md-8">
                                    <label htmlFor="companyName" className="form-label">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                        value={userName}
                                        required
                                    />
                                </div>
                                {/* <div className="col-md-8">
                                    <label htmlFor="rawMaterial" className="form-label">
                                    Type of Litter
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        onChange={(e) => {
                                            setTypeOfLitter(e.target.value);
                                        }}
                                        value={typeOfLitter}
                                        required
                                    />
                                </div> */}
                                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Type of Litter</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="kg" value="Dead Animal" onChange={(e) => setTypeOfLitter(e.target.value)} required/>
                      <label className="form-check-label" for="gridRadios1">
                       ded animal
                      </label>
                    </div>
                    <div class="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="sqMtres" value="Marine Litter" onChange={(e) => setTypeOfLitter(e.target.value)} required />
                      <label className="form-check-label" for="gridRadios2">
                        marine litter
                      </label>
                    </div>
                  </div>
                  
                </fieldset> <br />

                <div className="row mb-3">
          <label for="inputEmail3" className="col-sm-2 col-form-label">Upload Image</label>
          <div className="col-sm-3">
            <input className="form-control" type="file" id="imageFile" name="image" accept="image/*"
            onChange={fileChangeHandler} 
             multiple max="4"/>
          </div>
        </div>  
                                <div className="col-4">
                                    <label htmlFor="ComapnyTpNo" className="form-label">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyTpNo"
                                        onChange={(e) => {
                                            setContactNo(e.target.value);
                                        }}
                                        value={contactNo}
                                        required
                                    />
                                    {contactNo ? (
                                        <div class="alert alert-danger" role="alert">
                                            Invalid Contact Number. Enter a valid number
                                        </div>
                                    ) : null}
                                </div>
                                
                                <div className="col-12">
                                    <label htmlFor="CompanyAddress" className="form-label">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="comAddress"
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                        }}
                                        value={location}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="CompanyAddress" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="comAddress"
                                        onChange={(e) => {
                                            setDesc(e.target.value);
                                        }}
                                        value={desc}
                                        required
                                    />
                                </div>
                                {/* Contact Person Details Section starts here */}
                                {/* <div className="col-md-8">
                                    <label htmlFor="ContactPersonName" className="form-label">
                                        Person Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactPersonName"
                                        onChange={(e) => {
                                            setContactPersonName(e.target.value);
                                        }}
                                        value={contactPersonName}
                                        required
                                    />
                                </div> */}
                                
                                {/* Bank Details */}
                                {/* <h2 className="col-md-12">Category Details</h2>
                                <div className="col-md-8">
                                    <label htmlFor="BankName" className="form-label">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankName"
                                        onChange={(e) => {
                                            setBankName(e.target.value);
                                        }}
                                        value={bankName}
                                        required
                                    />
                                </div>
                                <div className="col-md-8">
                                    <label htmlFor="BankBranch" className="form-label">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankBranch"
                                        onChange={(e) => {
                                            setBankBranch(e.target.value);
                                        }}
                                        value={bankBranch}
                                        required
                                    />
                                </div>
                                <div className="col-md-8">
                                    <label htmlFor="BankAccountNo" className="form-label">
                                        Number of Items
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankAccountNo"
                                        onChange={(e) => {
                                            setBankAccountNo(e.target.value);
                                        }}
                                        value={bankAccountNo}
                                        required
                                    />
                                    {bankAcc ? (
                                        <div class="alert alert-danger" role="alert">
                                            Invalid bank account number format. Please Enter a valid value
                                        </div>
                                    ) : null}
                                </div> */}

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ margin: "20px" }}
                                    >
                                        {props.buttonName}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        style={{ margin: "20px" }}
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ReportForm;
