class Doctor {
    constructor(name, consultationTime) {
      this.name = name;
      /** Average consultation time for this doctor */    
      this.consultationTime = consultationTime; 
    }
  }
  
  function calculateWaitingTime(doctors, patientPosition) {
    /*Calculate the total consultation time for all doctors combined*/
    const totalConsultationTime = doctors.reduce((total, doctor) => total + doctor.consultationTime, 0);
  
    // Calculate the number of patients each doctor can attend to
    const patientsPerDoctor = Math.floor(patientPosition / doctors.length);
  
    // Calculate remaining patients after evenly distributing among doctors
    const remainingPatients = patientPosition % doctors.length;
  
    let waitingTime = 0;
  
    // Calculate waiting time for each doctor
    for (let i = 0; i < doctors.length; i++) {
      // For remaining patients, allocate to the first few doctors
      const patientsForThisDoctor = i < remainingPatients ? patientsPerDoctor + 1 : patientsPerDoctor;
  
      // Calculate time taken by this doctor for their patients
      const doctorTime = patientsForThisDoctor * doctors[i].consultationTime;
  
      // Update waiting time with the maximum time taken among doctors
      waitingTime = Math.max(waitingTime, doctorTime);
    }
  
    // Add total consultation time to waiting time (time for all doctors to see patients ahead)
    waitingTime += totalConsultationTime;
  
    return waitingTime;
  }
  
  // Example usage:
  
  // Creating Doctor objects
  const doctorA = new Doctor('Doctor A', 3);
  const doctorB = new Doctor('Doctor B', 4);
  // Adding more doctors if needed
  // const doctorC = new Doctor('Doctor C', 5);
  
  // Array of Doctor objects
  const doctors = [doctorA, doctorB /* , doctorC */];
  
  // Patient's position in the queue
  const patientPosition = 11; // Example patient position
  
  // Calculate estimated waiting time
  const estimatedWaitingTime = calculateWaitingTime(doctors, patientPosition);
  console.log(`Estimated waiting time for the patient: ${estimatedWaitingTime} minutes`);
  