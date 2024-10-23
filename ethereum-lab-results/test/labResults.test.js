const LabResults = artifacts.require("LabResults");

contract("LabResults", (accounts) => {
  const doctor = accounts[0]; // Use the first account as the doctor
  const patient = accounts[1]; // Use the second account as the patient

  it("should authorize the doctor and log gas usage", async () => {
    const labResultsInstance = await LabResults.deployed();

    // Authorize the doctor and capture the transaction
    const tx = await labResultsInstance.authorizeDoctor(doctor, { from: doctor });

    // Log the gas used
    console.log(`Gas used for authorizing the doctor: ${tx.receipt.gasUsed}`);

    // Check if the doctor is authorized
    const isAuthorized = await labResultsInstance.authorizedDoctors(doctor);
    assert.equal(isAuthorized, true, "Doctor should be authorized");

    console.log(`Doctor Address: ${doctor}`);
  });

  it("should add and retrieve a lab result and log gas usage", async () => {
    const labResultsInstance = await LabResults.deployed();

    // First, authorize the doctor if not already authorized
    await labResultsInstance.authorizeDoctor(doctor, { from: doctor });

    // Add a lab result and capture the transaction
    const tx = await labResultsInstance.addLabResult("result1", patient, "encryptedData1", { from: doctor });

    // Log the gas used
    console.log(`Gas used for adding the lab result: ${tx.receipt.gasUsed}`);

    // Retrieve the lab result
    const result = await labResultsInstance.getLabResult("result1");

    // Print the retrieved lab result details
    console.log("Lab Result Retrieved:");
    console.log("Patient Address:", result.patient);
    console.log("Encrypted Data:", result.encryptedData);

    // Check if the retrieved lab result matches what was added
    assert.equal(result.patient, patient, "The patient address should match");
    assert.equal(result.encryptedData, "encryptedData1", "The encrypted data should match");
  });
});

