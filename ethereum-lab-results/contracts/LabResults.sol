pragma solidity ^0.8.0;

contract LabResults {
    struct LabResult {
        address patient;
        string encryptedData;
    }

    mapping(string => LabResult) public labResults;
    mapping(address => bool) public authorizedDoctors;

    event LabResultAdded(string resultId, address indexed patient, string encryptedData);
    event DoctorAuthorized(address doctor);

    // Modifier to check if the doctor is authorized
    modifier onlyAuthorizedDoctor() {
        require(authorizedDoctors[msg.sender], "You are not authorized");
        _;
    }

    // Function to authorize a doctor
    function authorizeDoctor(address doctor) public {
        authorizedDoctors[doctor] = true;
        emit DoctorAuthorized(doctor);
    }

    // Function to add a lab result (only authorized doctors can add)
    function addLabResult(string memory resultId, address patient, string memory encryptedData) public onlyAuthorizedDoctor {
        labResults[resultId] = LabResult(patient, encryptedData);
        emit LabResultAdded(resultId, patient, encryptedData);
    }

    // Function to get a lab result (publicly accessible)
    function getLabResult(string memory resultId) public view returns (LabResult memory) {
        return labResults[resultId];
    }
}

